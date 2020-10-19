import { commitMutation, graphql } from "react-relay"
import environment from "../environment";
import { counselStatusUpdateMutation, counselStatusUpdateMutationVariables } from "./__generated__/counselStatusUpdateMutation.graphql";

const mutation = graphql`
mutation counselStatusUpdateMutation($counselId: ID!, $status: Int!) {
  counselStatusUpdate(input: {counselId: $counselId, status: $status}) {
    counsel {
      status
    }
  }
}`;

export function counselStatusUpdate(variables: counselStatusUpdateMutationVariables) {
  return new Promise<number>((resolve, reject) => {
    commitMutation<counselStatusUpdateMutation>(
      environment, {
      mutation,
      variables,
      onCompleted: (res, err) => {
        const status = res.counselStatusUpdate?.counsel?.status;
        status ? resolve(status) : reject();
      },
      onError: (err) => { console.error(err); reject() },
    }
    );
  });
}