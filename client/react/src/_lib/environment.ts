import {
  Environment,
  FetchFunction,
  GraphQLResponse,
  Network,
  RecordSource,
  Store,
  Observable,
} from 'relay-runtime';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { GRAPHQL_ENDPOINT, SUBSCRIPTION_ENDPOINT } from "./endpoint";

const fetchQuery: FetchFunction = async (operation, variables): Promise<GraphQLResponse> => {
  try {
    console.log(`operationKind : ${operation.operationKind}\n${operation.text}`);
    const body = JSON.stringify({
      operationName: operation.name,
      query: operation.text,
      variables,
    });
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body
    });
    const json = await response.json();
    console.log("fetch res : ", json);
    return json;
  } catch (e) {
    return { errors: [new Error('네트워크 요청이 실패했습니다. ' + e.message)], data: undefined };
  }
}

const subscriptionClient = new SubscriptionClient(SUBSCRIPTION_ENDPOINT, {
  reconnect: true,
});

const subscribe: any = (request: any, variables: any) => {
  const subscribeObservable = subscriptionClient.request({
    query: request.text!,
    operationName: request.name,
    variables,
  });
  // Important: Convert subscriptions-transport-ws observable type to Relay's
  return Observable.from(subscribeObservable as any);
};


const environment = new Environment({
  network: Network.create(fetchQuery, subscribe),
  store: new Store(new RecordSource()),
});

export default environment;

export type JWTPayLoad = {
  email: string,
  exp: number,
  origIat: number,
  user: {
    id: string,
  }
}