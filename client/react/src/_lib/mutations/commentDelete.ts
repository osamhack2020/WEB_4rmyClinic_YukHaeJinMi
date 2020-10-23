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

const configs: DeclarativeMutationConfig[] = [{
  type: 'RANGE_DELETE',
  deletedIDFieldName: "id",
  parentID: "client:root",
  connectionKeys: [{
    key: "CommentsContaine_comments",
  }],
  pathToConnection: ["edges", "posts"],
}];

export function commentDelete(variables: commentDeleteMutationVariables) {
  return new Promise<boolean>((resolve, reject) => {
    commitMutation<commentDeleteMutation>(
      environment, {
      mutation,
      variables,
      configs,
      onCompleted: (res, err) => {
        if (err) {
          resolve(false);
        } else {
          console.log("commentDeleted");
          window.location.reload(false);
          resolve(true);
        }
      },
      onError: (err) => { console.error(err); reject(false) },
    }
    );
  });
}