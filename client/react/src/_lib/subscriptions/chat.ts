import {
  requestSubscription,
  graphql,
} from 'react-relay';
import environment from "../environment";
import { chatSubscriptionVariables } from "./__generated__/chatSubscription.graphql";

// TODO : counselID -> counselId, senderID -> senderId
// TODO : server should return message edge
const subscription = graphql`
  subscription chatSubscription($counselId: ID!) {
    messageSent(counselID: $counselId) {
      senderID
      content
    }
  }
`;

// https://relay.dev/docs/en/subscriptions#docsNav 참고할 것
export function chatSubscribe(variables: chatSubscriptionVariables) {
  requestSubscription(environment, {
    subscription,
    variables,
    updater: (store) => {

    },
    onCompleted: () => { /* when server closed connection */ },
    onError: error => console.error(error),
  });
}