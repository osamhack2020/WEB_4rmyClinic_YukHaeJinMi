import { commitMutation, graphql } from "react-relay"
import environment, { JWTPayLoad } from "../../environment";
import { refreshTokenMutation } from "./__generated__/refreshTokenMutation.graphql";

/* 오류 발생시 schema.graphql 에서 refreshToken을 주석처리해주세요.
input RefreshInput {
  # refreshToken: String
  clientMutationId: String
}
*/
const mutation = graphql`
mutation refreshTokenMutation {
  refreshToken(input: {}) {
    token
    payload
    refreshToken
    refreshExpiresIn
  }
}`;

// type refreshTokenInput
export function refreshToken() {
  return new Promise<JWTPayLoad>((resolve, reject) => {
    commitMutation<refreshTokenMutation>(
      environment, {
      mutation,
      variables: {},
      onCompleted: (res, err) => {
        const payload = res.refreshToken?.payload as JWTPayLoad;
        resolve(payload);
      },
      onError: (err) => { console.error(err); reject() },
    }
    );
  });
}