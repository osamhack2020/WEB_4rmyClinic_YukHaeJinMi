import { commitMutation, graphql } from "react-relay"
import environment from "../../environment";
import { authUserMutation, authUserMutationVariables } from "./__generated__/authUserMutation.graphql";

const mutation = graphql`
mutation authUserMutation($email: String!, $password: String!) {
  authToken(input: {email: $email, password: $password}) {
    token
    refreshToken
    refreshExpiresIn
    payload
    user {
      id
      nickname
      imgUri
    }
  }
}`;

export type Viewer = {
  id: string,
  nickname: string,
  imgUri: string,
}

export function authUser(variables: authUserMutationVariables) {
  return new Promise<Viewer>((resolve, reject) => {
    commitMutation<authUserMutation>(
      environment, {
      mutation,
      variables,
      onCompleted: (res, err) => {
        if (err) {
          reject();
        } else {
          // console.log("payload : ", res.tokenAuth?.payload);
          const user = res.authToken?.user;
          const viewer = user && { id: user?.id, nickname: user?.nickname, imgUri: user.imgUri };
          // const payload = res.authToken?.payload as JWTPayLoad;
          viewer ? resolve(viewer) : reject();
        }
      },
      onError: (err) => { console.error(err); reject() },
    }
    );
  });
}