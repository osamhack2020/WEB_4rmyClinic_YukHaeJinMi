import { commitMutation, graphql } from "react-relay"
import environment from "../environment";
import { commentCreateMutation, commentCreateMutationVariables } from "./__generated__/commentCreateMutation.graphql";

const mutation = graphql`
mutation commentCreateMutation($postId: String!, $content: String!) {
  commentCreate(input: {postId: $postId, content: $content}) {
    commentEdge {
      node {
        id
      }
    }
  }
}`;

export function commentCreate(variables: commentCreateMutationVariables) {
  return new Promise<boolean>((resolve, reject) => {
    commitMutation<commentCreateMutation>(
      environment, {
      mutation,
      variables,
      onCompleted: (res, err) => {
        if (err) {
          resolve(false);
        } else {
          console.log("commentCreated ID : ", res.commentCreate?.commentEdge?.node?.id); // TODO : token save
          resolve(true);
        }
      },
      onError: (err) => { console.error(err); reject(false) },
    }
    );
  });
}