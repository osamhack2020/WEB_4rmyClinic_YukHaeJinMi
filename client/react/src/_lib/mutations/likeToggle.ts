import { commitMutation, graphql } from "react-relay"
import environment from "../environment";
import { likeToggleMutation, likeToggleMutationVariables } from "./__generated__/likeToggleMutation.graphql";

// TODO :  하트 / 엄지 아이콘을 사용할지에 대한 이야기
const mutation = graphql`
mutation likeToggleMutation($postId: String!) {
  likeToggle(input: {postId: $postId}) {
    post {
      id
      likes
      viewerAlreadyLiked
    }
  }
}`;

export function likeToggle(variables: likeToggleMutationVariables) {
  return new Promise<boolean>((resolve, reject) => {
    commitMutation<likeToggleMutation>(
      environment, {
      mutation,
      variables,
      optimisticUpdater: (updater) => {
        const post = updater.get(variables.postId);
        const likes = post && post.getValue('likes') as number;
        const viewerAlreadyLiked = post && post.getValue('viewerAlreadyLiked') as boolean;

        post && likes && (viewerAlreadyLiked === false ? post.setValue(likes + 1, 'likes') : likes && post.setValue(likes - 1, 'likes'));
        post && post.setValue(!viewerAlreadyLiked, 'viewerAlreadyLiked');
      },
      onCompleted: (res, err) => {
        if (err) {
          reject();
        } else {
          console.log('liked toggled!');
          resolve(true);
        }
      },
      onError: (err) => { console.error(err); reject(false) },
    }
    );
  });
}