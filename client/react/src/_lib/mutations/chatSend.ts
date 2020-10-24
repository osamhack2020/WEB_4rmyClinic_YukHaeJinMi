
import { commitMutation, DeclarativeMutationConfig, graphql } from "react-relay"
import environment from "../environment";
import { chatSendMutation, chatSendMutationResponse, chatSendMutationVariables } from "./__generated__/chatSendMutation.graphql";

const mutation = graphql`
mutation chatSendMutation($counselId: ID!, $content: String!) {
  chatSend(input: {counselId: $counselId, content: $content}) {
    chatEdge {
      cursor
      node {
        id
        writer {
          nickname
        }
        content
      }
    }
  }
}`;


export function chatSend(variables: chatSendMutationVariables) {
  const configs: DeclarativeMutationConfig[] = [{
    type: "RANGE_ADD",
    edgeName: "chatEdge",
    connectionInfo: [{
      key: "Counsel_chatSet",
      // TODO : prepend or append -> different sort method
      rangeBehavior: "append",
    }],
    parentID: variables.counselId
  }]
  return new Promise<chatSendMutationResponse>((resolve, reject) => {
    commitMutation<chatSendMutation>(
      environment, {
      mutation,
      variables,
      configs,
      onCompleted: (res, err) => {
        resolve(res);
      },
      onError: (err) => { console.error(err); reject() },
    }
    );
  });
}