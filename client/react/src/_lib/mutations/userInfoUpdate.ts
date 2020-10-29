import { commitMutation, graphql } from "react-relay"
import environment from "../environment";
import { userInfoUpdateMutation, userInfoUpdateMutationVariables } from "./__generated__/userInfoUpdateMutation.graphql";

// TODO :  하트 / 엄지 아이콘을 사용할지에 대한 이야기
const mutation = graphql`
mutation userInfoUpdateMutation($nickname: String, $bio: String, $careers: String) {
  userInfoUpdate(input: {nickname: $nickname, bio: $bio, careers: $careers}) {
    user {
      id
      nickname
      bio
      careerSet {
        edges {
          node {
            id
            title
          }
        }
      }
    }
  }
}`;

export function userInfoUpdate(variables: userInfoUpdateMutationVariables) {
  return new Promise<boolean>((resolve, reject) => {
    commitMutation<userInfoUpdateMutation>(
      environment, {
      mutation,
      variables,
      onCompleted: (res, err) => {
        if (err) {
          reject();
        } else {
          console.log('info updated');
          resolve(true);
        }
      },
      onError: (err) => { console.error(err); reject() },
    }
    );
  });
}