import { commitMutation, graphql } from "react-relay"
import environment from "../environment";
import { counselStartMutation, counselStartMutationVariables } from "./__generated__/counselStartMutation.graphql";

const mutation = graphql`
mutation counselStartMutation($counselorId: ID!) {
  counselStart(input: {counselorId: $counselorId}) {
    counsel {
      id
    }
  }
}`;

export function counselStart(variables: counselStartMutationVariables) {
  return new Promise<string>((resolve, reject) => {
    commitMutation<counselStartMutation>(
      environment, {
      mutation,
      variables,
      onCompleted: (res, err) => {
        const id = res.counselStart?.counsel?.id;
        id ? resolve(id) : reject();
      },
      onError: (err) => { console.error(err); reject() },
    }
    );
  });
}