import React from 'react';
import { graphql, QueryRenderer } from "react-relay";
import { RouteComponentProps } from "react-router";
import environment from "../_lib/environment";
// import { counselStart } from "../_lib/mutations/counselStart";
import { CounselQuery } from './__generated__/CounselQuery.graphql';
import { chatSubscribe } from "../_lib/subscriptions/chat";
import { chatSend } from "../_lib/mutations/chatSend";


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
  onChangeText = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ content: target.value });
  }
  onSendText = () => {
    chatSend({ ...this.state });
  }
  componentDidMount = async () => {
    const { counselId } = this.state;
    chatSubscribe({ counselId });
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
                    }
                    content
                  }
                }
              }
            }
          }
        `}
        render={({ props, error, retry }) => {
          return <div>
            {props?.counsel?.chatSet.edges.map((edge) => <div key={edge?.cursor}><p>{edge?.node?.writer?.nickname}</p><p>{edge?.node?.content}</p></div>)}
            <input value={this.state.content} onChange={this.onChangeText} />
            <button type="submit" onClick={this.onSendText}>보내기</button>
          </div>
        }}
      />
    )
  }
}