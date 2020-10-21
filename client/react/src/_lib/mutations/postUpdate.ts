import { commitMutation, graphql } from "react-relay"
import environment from "../environment";
import { postUpdateMutation, postUpdateMutationVariables } from "./__generated__/postUpdateMutation.graphql";

// TODO : tags: String (not required || 기본 태그)
const mutation = graphql`
mutation postUpdateMutation($id: ID!, $title: String!, $content: String!, $tags: String!) {
  postUpdate(input: {id: $id, title: $title, content: $content, tags: $tags}) {
    ok
    post {
      id
    }
  }
}`;


export function postUpdate(variables: postUpdateMutationVariables) {
  return new Promise<boolean>((resolve, reject) => {
    commitMutation<postUpdateMutation>(
      environment, {
      mutation,
      variables,
      onCompleted: (res, err) => {
        if (err) {
          resolve(false);
        } else {
          console.log("postUpdated ID : ", res.postUpdate?.post?.id);
          resolve(true);
        }
      },
      onError: (err) => { console.error(err); reject(false) },
    }
    );
  });
}