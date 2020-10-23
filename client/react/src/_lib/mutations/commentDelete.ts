import { commitMutation, DeclarativeMutationConfig, graphql } from "react-relay"
import environment from "../environment";
import { commentDeleteMutation, commentDeleteMutationVariables } from "./__generated__/commentDeleteMutation.graphql";

// TODO : tags: String (not required || 기본 태그)
const mutation = graphql`
mutation commentDeleteMutation($commentId: String!) {
  commentDelete(input: {commentId: $commentId}) {
    ok
    id
  }
}`;


export function commentDelete(variables: commentDeleteMutationVariables) {
  const configs: DeclarativeMutationConfig[] = [{
    type: 'NODE_DELETE',
    deletedIDFieldName: "id",
  }];

  return new Promise<boolean>((resolve, reject) => {
    commitMutation<commentDeleteMutation>(
      environment, {
      mutation,
      variables,
      configs,
      onCompleted: (res, err) => {
        if (err) {
          reject();
        } else {
          console.log("commentDeleted");
          resolve(true);
        }
      },
      onError: (err) => { console.error(err); reject() },
    }
    );
  });
}