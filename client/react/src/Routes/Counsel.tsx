import React from 'react';
import { graphql, QueryRenderer } from "react-relay";
import { RouteComponentProps } from "react-router";
import environment from "../_lib/environment";
// import { counselStart } from "../_lib/mutations/counselStart";
import { CounselQuery } from './__generated__/CounselQuery.graphql';
import { chatSubscribe } from "../_lib/subscriptions/chat";
import { chatSend } from "../_lib/mutations/chatSend";
import { AuthContext } from "../Components/AuthContextProvider";
import "../scss/Counsel.scss";
import { ProfileIcon } from "../Components/ProfileIcon";

type CounselProps = RouteComponentProps<{ id: string }>
type CounselState = {
  counselId: string,
  content: string,
}
export class Counsel extends React.Component<CounselProps, CounselState> {
  constructor(props: CounselProps) {
    super(props);
    this.state = {
      counselId: props.match.params.id,
      content: '',
    }
  }
  onChangeText = ({ target }: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({ content: target.value });
  }
  onSendText = async () => {
    if (this.state.content.length > 0) {
      await chatSend({ ...this.state });
      this.setState({ content: "" });
    }
  }
  componentDidMount = async () => {
    const { counselId } = this.state;
    chatSubscribe({ counselId });
  }
  onPressEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      this.onSendText();
    }
  }
  render() {
    return (
      <QueryRenderer<CounselQuery>
        environment={environment}
        variables={{ id: this.state.counselId }}
        query={graphql`
          query CounselQuery($id: ID!) {
            counsel(id: $id) {
              chatSet(first: 100) @connection(key: "Counsel_chatSet") {
                edges {
                  cursor
                  node {
                    writer {
                      id
                      nickname
                      imgUri
                    }
                    content
                  }
                }
              }
            }
          }
        `}
        render={({ props, error, retry }) => {
          return <AuthContext.Consumer>
            {({ viewer }) =>
              <div className="chat-container">
                <div className="chat-box">
                  {props?.counsel?.chatSet.edges.map((edge) => {
                    const id = edge?.node?.writer.id;
                    const className = "chat-" + (id === viewer?.id ? "mine" : "others");
                    return <div key={edge?.cursor} className={className}>
                      <div className="chat-info">
                        <ProfileIcon imgUri={edge?.node?.writer.imgUri} size={20} />
                        <p className="content">{edge?.node?.content}</p>
                      </div>
                    </div>
                  })}
                </div>
                <div className="chat-input">
                  <textarea cols={32} rows={5} value={this.state.content} onChange={this.onChangeText} onKeyDown={this.onPressEnter}></textarea>
                  <button type="submit" onClick={this.onSendText}>보내기</button>
                </div>
              </div>
            }
          </AuthContext.Consumer>
        }}
      />
    )
  }
}