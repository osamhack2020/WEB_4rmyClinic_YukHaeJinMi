import { commitMutation, graphql } from "react-relay"
import environment from "../../environment";
import { deleteTokenMutation } from "./__generated__/deleteTokenMutation.graphql";

const mutation = graphql`
mutation deleteTokenMutation {
  deleteTokenCookie(input: {}) {
    deleted
  }
}`;

export function deleteToken() {
  return new Promise<boolean>((resolve, reject) => {
    commitMutation<deleteTokenMutation>(
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