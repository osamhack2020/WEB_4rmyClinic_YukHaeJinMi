import { commitMutation, graphql } from "react-relay"
import environment from "../../environment";
import { removeTokenMutation } from "./__generated__/removeTokenMutation.graphql";

const mutation = graphql`
mutation removeTokenMutation {
  deleteTokenCookie(input: {}) {
    deleted
  }
}`;

export function removeToken() {
  return new Promise<boolean>((resolve, reject) => {
    commitMutation<removeTokenMutation>(
      environment, {
      mutation,
      variables: {},
      onCompleted: (res, err) => {
        resolve(res.deleteTokenCookie?.deleted);
      },
      onError: (err) => { console.error(err); reject(false) },
    }
    );
  });
}