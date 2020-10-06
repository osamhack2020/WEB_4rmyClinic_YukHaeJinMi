import { commitMutation, graphql } from "react-relay"
import environment from "../environment";
import { LoginMutation } from "./__generated__/LoginMutation.graphql";

const mutation = graphql`
mutation LoginMutation($email: String!, $password: String!) {
  login(input: {email: $email, password: $password}) {
    token
    refreshToken
  }
}`;

type LoginInput = {
  email: string;
  password: string;
}
type Tokens = {
  token?: string | null;
  refreshToken?: string | null;
}

export function Login(input: LoginInput) {
  const variables = { ...input };
  return new Promise<Tokens>((resolve, reject) => {
    commitMutation<LoginMutation>(
      environment, {
      mutation,
      variables,
      onCompleted: (res, err) => {
        if (err) {
          reject();
        } else {
          // console.log("token : ", res.login?.token, res.login?.refreshToken); // TODO : token save
          resolve({ ...res.login });
        }
      },
      onError: (err) => { console.error(err); reject() },
    }
    );
  });
}
