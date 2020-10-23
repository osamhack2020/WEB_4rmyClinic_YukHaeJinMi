import React from 'react';
import { graphql, QueryRenderer } from "react-relay";
import { RouteComponentProps } from "react-router";
import environment from "../_lib/environment";
// import { counselStart } from "../_lib/mutations/counselStart";
import { chatSubscribe } from "../_lib/subscriptions/chat";


type CounselProps = RouteComponentProps<{ id: string }>
type CounselState = {
  counselId: string,
}
export class Counsel extends React.Component<CounselProps, CounselState> {
  constructor(props: CounselProps) {
    super(props);
    this.state = {
      counselId: props.match.params.id
    }
  }
  componentDidMount = async () => {
    const { counselId } = this.state;
    // TODO : check counsel is already started or not
    // const counselId = await counselStart({ counselorId });
    chatSubscribe({ counselId });
  }

  render() {
    return (
      <QueryRenderer
        environment={environment}
        variables={{ id: this.state.counselId }}
        query={graphql`
          query CounselQuery($id: ID!) {
            counsel(id: $id) {
              chatSet {
                edges {
                  node {
                    writer {
                      id
                      nickname
                    }
                  }
                }
              }
            }
          }
        `}
        render={({ props, error, retry }) => {
          return <></>
        }}
      />
    )
  }
}