import { commitMutation, graphql } from "react-relay"
import environment from "../environment";
import { userCreateMutation, userCreateMutationVariables } from "./__generated__/userCreateMutation.graphql";

const mutation = graphql`
mutation userCreateMutation($email: String!, $password: String!, $passwordRepeat: String!, $division: String!, $rank: String!) {
  userCreate(input: {email: $email, password: $password, passwordRepeat: $passwordRepeat, division: $division, rank: $rank}) {
    ok
  }
}`;

export function userCreate(variables: userCreateMutationVariables) {
  return new Promise<boolean>((resolve, reject) => {
    commitMutation<userCreateMutation>(
      environment, {
      mutation,
      variables,
      onCompleted: (res, err) => {
        if (err) {
          resolve(false);
        } else {
          console.log("ok : ", res.userCreate?.ok);
          resolve(true);
        }
      },
      onError: (err) => { console.error(err); reject(false) },
    }
    );
  });
}