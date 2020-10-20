import React from 'react';
import { createPaginationContainer, Environment, graphql } from "react-relay";
import Comment from "../fragments/Comment";
import { CommentsContainer_comments } from "./__generated__/CommentsContainer_comments.graphql";

type CommentsContainerProps = {
  relay: {
    environment: Environment
  },
  comments: CommentsContainer_comments,
}

function Comments(props: CommentsContainerProps) {
  const { comments } = props;
  return (
    <div className="comments-container">
      {comments.commentSet.edges.map((edge) => edge?.comment && <Comment key={edge.cursor} comment={edge.comment} />)}
    </div>
  )
}

export default createPaginationContainer(Comments, {
  comments: graphql`
    fragment CommentsContainer_comments on PostNode
    @argumentDefinitions(
      count: {type: "Int", defaultValue: 20},
      cursor: {type: "String",},
      id: {type: "ID"}
    ) {
      commentSet(first: $count, after: $cursor) @connection(key: "CommentsContainer_commentSet") {
        edges {
          cursor
          comment: node {
            ...Comment_comment
          }
        }
      }
    }
  `
}, {
  getVariables: (props, info) => ({ ...info }),
  query: graphql`
    query CommentsContainerQuery
    (
      $id: ID!
      $count: Int!
      $cursor: String
    ) {
        post(id: $id) {
          ...CommentsContainer_comments @arguments(count: $count, cursor: $cursor)
        }
    }
    
  `
})