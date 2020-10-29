import React from 'react';
import { createPaginationContainer, graphql, RelayPaginationProp } from "react-relay";
import Card from "../fragments/Card";
import { MyPosts_posts } from "./__generated__/MyPosts_posts.graphql";

type MyPostsProps = {
  relay: RelayPaginationProp,
  posts: MyPosts_posts,
  viewerId: string,
}
function MyPosts(props: MyPostsProps) {
  return (
    <div className="posts">
      {props.posts?.postSet.edges.map(edge => edge?.node && <Card key={edge.cursor} card={edge.node} />)}
    </div>
  );
}

export default createPaginationContainer(MyPosts, {
  posts: graphql`
  fragment MyPosts_posts on UserNode
  @argumentDefinitions(
    count: {type: "Int", defaultValue: 10},
    cursor: {type: "String"},
    viewerId: {type: "ID"}
  ) {
      postSet(first: $count, after: $cursor) @connection(key: "MyPosts_postSet") {
        edges {
          cursor
          node {
            ...Card_card
          }
        }
      }
    }
  `
}, {
  getVariables: (props, info) => ({ ...info, viewerId: props.viewerId }),
  query: graphql`
    query MyPostsQuery(
      $count: Int!,
      $cursor: String,
      $viewerId: ID!
    ) {
      user(id: $viewerId) {
        ...MyPosts_posts @arguments(count: $count, cursor: $cursor, viewerId: $viewerId)
      }
    }
  `
  ,
})