import { commitMutation, graphql } from "react-relay"
import environment from "../../environment";
import { verifyTokenMutation } from "./__generated__/verifyTokenMutation.graphql";

const mutation = graphql`
mutation verifyTokenMutation($token: String!) {
  verifyToken(input: {token: $token}) {
    payload
  }
}`;

type verifyTokenInput = {
  token: string
}
export function verifyToken(input: verifyTokenInput) {
  const variables = { ...input };
  return new Promise((resolve, reject) => {
    commitMutation<verifyTokenMutation>(
      environment, {
      mutation,
      variables,
      onCompleted: (res, err) => {
        console.log("verifyTokenMutation : ", res.verifyToken?.payload);
        resolve(res.verifyToken?.payload);
      },
      onError: (err) => { console.error(err); reject() },
    }
    );
  });
}