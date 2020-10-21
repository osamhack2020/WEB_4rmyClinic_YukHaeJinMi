import React from 'react';
import { graphql, QueryRenderer } from "react-relay";
import { RouteComponentProps } from "react-router";
import PostForm from "../fragments/PostForm";
import "../scss/Write.scss";
import environment from "../_lib/environment";
import { UpdatePostQuery } from "./__generated__/UpdatePostQuery.graphql";
import { postUpdate } from "../_lib/mutations";

type postParams = {
  id: string,
}


export function UpdatePost(props: RouteComponentProps<postParams>) {
  const id = props.match.params.id;
  return (
    <QueryRenderer<UpdatePostQuery>
      environment={environment}
      query={graphql`
        query UpdatePostQuery($id: ID!) {
          post(id: $id) {
            ...PostForm_post
          }
        }
      `}
      variables={{ id }}
      render={({ props, error, retry }) => props?.post && <PostForm onClickSubmit={(input) => postUpdate({ id, ...input })} post={props.post} />
      }
    />
  )
}