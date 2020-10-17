import {
  Environment,
  FetchFunction,
  GraphQLResponse,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime';
import { GRAPHQL_ENDPOINT } from "./endpoint";

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

const environment = new Environment({
  network: Network.create(fetchQuery),
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