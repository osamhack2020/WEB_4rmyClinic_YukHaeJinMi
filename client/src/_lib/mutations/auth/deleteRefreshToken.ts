import { commitMutation, graphql } from "react-relay"
import environment from "../../environment";
import { deleteRefreshTokenMutation } from "./__generated__/deleteRefreshTokenMutation.graphql";

const mutation = graphql`
mutation deleteRefreshTokenMutation {
  deleteRefreshTokenCookie(input: {}) {
    deleted
  }
}`;

export function deleteRefreshToken() {
  return new Promise<boolean>((resolve, reject) => {
    commitMutation<deleteRefreshTokenMutation>(
      environment, {
      mutation,
      variables: {},
      onCompleted: (res, err) => {
        resolve(res.deleteRefreshTokenCookie?.deleted);
      },
      onError: (err) => { console.error(err); reject(false) },
    }
    );
  });
}