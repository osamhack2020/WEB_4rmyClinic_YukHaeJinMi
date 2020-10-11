import { commitMutation, graphql } from "react-relay"
import environment from "../environment";
import { postCreateMutation, postCreateMutationVariables } from "./__generated__/postCreateMutation.graphql";

const mutation = graphql`
mutation postCreateMutation($title: String!, $content: String!) {
  postCreate(input: {title: $title, content: $content}) {
    postEdge {
      node {
        id
      }
    }
  }
}`;

export function postCreate(variables: postCreateMutationVariables) {
  return new Promise<boolean>((resolve, reject) => {
    commitMutation<postCreateMutation>(
      environment, {
      mutation,
      variables,
      onCompleted: (res, err) => {
        if (err) {
          resolve(false);
        } else {
          console.log("postCreated ID : ", res.postCreate?.postEdge?.node?.id); // TODO : token save
          resolve(true);
        }
      },
      onError: (err) => { console.error(err); reject(false) },
    }
    );
  });
}