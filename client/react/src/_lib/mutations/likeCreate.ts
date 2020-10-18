import { commitMutation, graphql } from "react-relay"
import environment from "../environment";
import { likeCreateMutation, likeCreateMutationVariables } from "./__generated__/likeCreateMutation.graphql";

const mutation = graphql`
mutation likeCreateMutation($userId: String!, $postId: String!) {
  likeCreate(input: {userId: $userId, postId: $postId}) {
    likeEdge {
      node {
        id
      }
    }
  }
}`;

export function likeCreate(variables: likeCreateMutationVariables) {
  return new Promise<boolean>((resolve, reject) => {
    commitMutation<likeCreateMutation>(
      environment, {
      mutation,
      variables,
      onCompleted: (res, err) => {
        if (err) {
          resolve(false);
          alert("이미 좋아요를 눌리셨습니다.");
        } else {
          console.log("likeCreated ID : ", res.likeCreate?.likeEdge?.node?.id); 
          resolve(true);
        }
      },
      onError: (err) => { console.error(err); reject(false) },
    }
    );
  });
}