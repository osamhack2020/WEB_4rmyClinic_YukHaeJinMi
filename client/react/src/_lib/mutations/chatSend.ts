
import { commitMutation, graphql } from "react-relay"
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

export function counselStart(variables: chatSendMutationVariables) {
  return new Promise<chatSendMutationResponse>((resolve, reject) => {
    commitMutation<chatSendMutation>(
      environment, {
      mutation,
      variables,
      onCompleted: (res, err) => {
        resolve(res);
      },
      onError: (err) => { console.error(err); reject() },
    }
    );
  });
}