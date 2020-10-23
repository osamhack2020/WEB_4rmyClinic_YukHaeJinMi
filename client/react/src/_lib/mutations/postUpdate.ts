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
      title
      content
    }
  }
}`;


export function postUpdate(variables: postUpdateMutationVariables) {
  return new Promise<string>((resolve, reject) => {
    commitMutation<postUpdateMutation>(
      environment, {
      mutation,
      variables,
      onCompleted: (res, err) => {
        if (err) {
          reject();
        } else {
          console.log("postUpdated ID : ", res.postUpdate?.post?.id);
          resolve(res.postUpdate?.post?.id);
        }
      },
      onError: (err) => { console.error(err); reject(false) },
    }
    );
  });
}