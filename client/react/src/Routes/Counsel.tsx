import React from 'react';
import { graphql, QueryRenderer } from "react-relay";
import { RouteComponentProps } from "react-router";
import environment from "../_lib/environment";
import { counselStart } from "../_lib/mutations/counselStart";
import { chatSubscribe } from "../_lib/subscriptions/chat";



export class Counsel extends React.Component<RouteComponentProps<{ id: string }>, {}> {

  componentWillMount = async () => {
    const counselorId = this.props.match.params["id"];
    // TODO : check counsel is already started or not
    const counselId = await counselStart({ counselorId });
    chatSubscribe({ counselId });
  }

  render() {
    return (
      <QueryRenderer
        environment={environment}
        variables={{}}
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