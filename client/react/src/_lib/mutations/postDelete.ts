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
  type: 'NODE_DELETE',
  deletedIDFieldName: "id",
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
          reject();
        } else {
          console.log("postDeleted");
          resolve(true);
        }
      },
      onError: (err) => { console.error(err); reject() },
    }
    );
  });
}