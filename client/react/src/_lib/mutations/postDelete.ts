import { commitMutation, DeclarativeMutationConfig, graphql } from "react-relay"
import environment from "../environment";
import { postDeleteMutation, postDeleteMutationVariables } from "./__generated__/postDeleteMutation.graphql";

// TODO : tags: String (not required || 기본 태그)
const mutation = graphql`
mutation postDeleteMutation($postId: String!) {
  postDelete(input: {postId: $postId}) {
    ok
    id
  }
}`;

const configs: DeclarativeMutationConfig[] = [{
  type: 'RANGE_DELETE',
  deletedIDFieldName: "id",
  parentID: "client:root",
  connectionKeys: [{
    key: "CardContainer_posts",
  }],
  pathToConnection: ["edges", "posts"],
}];

export function postDelete(variables: postDeleteMutationVariables) {
  return new Promise<boolean>((resolve, reject) => {
    commitMutation<postDeleteMutation>(
      environment, {
      mutation,
      variables,
      configs,
      onCompleted: (res, err) => {
        if (err) {
          resolve(false);
        } else {
          console.log("postDeleted");
          resolve(true);
        }
      },
      onError: (err) => { console.error(err); reject(false) },
    }
    );
  });
}