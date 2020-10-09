import { commitMutation, graphql } from "react-relay"
import environment from "../environment";
import { userCreateMutation } from "./__generated__/userCreateMutation.graphql";

const mutation = graphql`
mutation userCreateMutation($email: String!, $password: String!, $passwordRepeat: String!, $division: String!, $rank: String!) {
  userCreate(input: {email: $email, password: $password, passwordRepeat: $passwordRepeat, division: $division, rank: $rank}) {
    ok
  }
}`;

type userCreateInput = {
  email: string;
  password: string;
  passwordRepeat: string;
  division: string;
  rank: string;
}
export function userCreate(input: userCreateInput) {
  const variables = { ...input };
  return new Promise<boolean>((resolve, reject) => {
    commitMutation<userCreateMutation>(
      environment, {
      mutation,
      variables,
      onCompleted: (res, err) => {
        if (err) {
          resolve(false);
        } else {
          console.log("ok : ", res.userCreate?.ok); // TODO : token save
          resolve(true);
        }
      },
      onError: (err) => { console.error(err); reject(false) },
    }
    );
  });
}