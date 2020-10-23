import { commitMutation, DeclarativeMutationConfig, graphql } from "react-relay"
import environment from "../environment";
import { postCreateMutation, postCreateMutationVariables } from "./__generated__/postCreateMutation.graphql";

// TODO : tags: String (not required || 기본 태그)
const mutation = graphql`
mutation postCreateMutation($title: String!, $content: String!, $tags: String!) {
  postCreate(input: {title: $title, content: $content, tags: $tags}) {
    postEdge {
      node {
        id
      }
    }
  }
}`;

const configs: DeclarativeMutationConfig[] = [{
  type: 'RANGE_ADD',
  edgeName: 'postEdge',
  parentID: 'client:root',
  connectionInfo: [{
    key: 'CardContainer_posts',
    rangeBehavior: 'prepend'
  }]
}];

export function postCreate(variables: postCreateMutationVariables) {
  return new Promise<string>((resolve, reject) => {
    commitMutation<postCreateMutation>(
      environment, {
      mutation,
      variables,
      configs,
      onCompleted: (res, err) => {
        if (err) {
          reject();
        } else {
          console.log("postCreated ID : ", res.postCreate?.postEdge?.node?.id);
          resolve(res.postCreate?.postEdge?.node?.id);
        }
      },
      onError: (err) => { console.error(err); reject() },
    }
    );
  });
}