import { commitMutation, graphql } from "react-relay"
import environment from "../environment";
import { UserLoginMutation } from "./__generated__/UserLoginMutation.graphql";
import { withCookies, Cookies } from "react-cookie"

const mutation = graphql`
mutation UserLoginMutation($email: String!, $password: String!) {
  userLogin(input: {email: $email, password: $password}) {
    token
    userEdge{
      node{
        email
        division
        rank
      }
    }
  }
}`;

type UserLoginInput = {
  email: string;
  password: string;
}

export function UserLogin(input: UserLoginInput) {
  const variables = { ...input };
  return new Promise<boolean>((resolve, reject) => {
    commitMutation<UserLoginMutation>(
      environment, {
      mutation,
      variables,
      onCompleted: (res, err) => {
        if (err) {
          resolve(false);
        } else {
          console.log("token : ", res.userLogin?.token); // TODO : token save
          
          resolve(true);
        }
      },
      onError: (err) => { console.error(err); reject(false) },
    }
    );
  });
}
