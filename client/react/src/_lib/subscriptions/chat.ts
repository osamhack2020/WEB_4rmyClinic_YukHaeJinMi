import {
  requestSubscription,
  graphql, DeclarativeMutationConfig
} from 'react-relay';
import environment from "../environment";
import { chatSubscriptionVariables } from "./__generated__/chatSubscription.graphql";

// TODO : counselID -> counselId, senderID -> senderId
// TODO : server should return message edge
const subscription = graphql`
  subscription chatSubscription($counselId: ID!) {
    messageSent(counselId: $counselId) {
      chatEdge {
        cursor
        node {
          id
          content
          writer {
            id
            nickname
          }
        }
      }
    }
  }
`;


// https://relay.dev/docs/en/subscriptions#docsNav 참고할 것
export function chatSubscribe(variables: chatSubscriptionVariables) {
  const configs: DeclarativeMutationConfig[] = [{
    type: "RANGE_ADD",
    edgeName: "chatEdge",
    parentID: variables.counselId,
    connectionInfo: [{
      key: 'Counsel_chatSet',
      rangeBehavior: 'append',
    }]
  }];

  requestSubscription(environment, {
    subscription,
    variables,
    configs,
    // updater: (store) => {

    // },
    onCompleted: () => { /* when server closed connection */ },
    onError: error => console.error(error),
  });
}