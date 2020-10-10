import { commitMutation, graphql } from "react-relay"
import environment, { JWTPayLoad } from "../../environment";
import { verifyTokenMutation } from "./__generated__/verifyTokenMutation.graphql";

/* 오류 발생시 schema.graphql 에서 token을 주석처리해주세요.
input VerifyInput {
  # token: String
  clientMutationId: String
}
*/
const mutation = graphql`
mutation verifyTokenMutation {
  verifyToken(input: {}) {
    payload
  }
}`;

export function verifyToken() {
  return new Promise<JWTPayLoad>((resolve, reject) => {
    commitMutation<verifyTokenMutation>(
      environment, {
      mutation,
      variables: {},
      onCompleted: (res, err) => {
        const payload = res.verifyToken?.payload as JWTPayLoad;
        resolve(payload);
      },
      onError: (err) => { console.error(err); reject() },
    }
    );
  });
}