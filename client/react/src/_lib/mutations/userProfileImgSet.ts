import { commitMutation, graphql } from "react-relay"
import environment from "../environment";
import { userProfileImgSetMutation, userProfileImgSetMutationVariables } from "./__generated__/userProfileImgSetMutation.graphql";

// TODO :  하트 / 엄지 아이콘을 사용할지에 대한 이야기
const mutation = graphql`
mutation userProfileImgSetMutation($imgUri: String!) {
  userProfileImgSet(input: {imgUri: $imgUri}) {
    user {
      imgUri
    }
  }
}`;

export function userProfileImgSet(variables: userProfileImgSetMutationVariables, userId: string) {
  return new Promise<boolean>((resolve, reject) => {
    commitMutation<userProfileImgSetMutation>(
      environment, {
      mutation,
      variables,
      optimisticUpdater: (updater) => {
        console.log(userId);
        const user = updater.get(userId);
        console.log(user);
        user && user.setValue(variables.imgUri, 'imgUri');
      },
      onCompleted: (res, err) => {
        if (err) {
          reject();
        } else {
          console.log('img changed');
          resolve(true);
        }
      },
      onError: (err) => { console.error(err); reject() },
    }
    );
  });
}