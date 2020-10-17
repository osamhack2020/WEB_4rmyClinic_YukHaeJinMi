import React from 'react';
import { RouteComponentProps } from "react-router";
import { QueryRenderer, graphql } from "react-relay";
import environment from "../_lib/environment";
import { AuthContext } from "../Components/AuthContextProvider";
import { PostQuery } from "./__generated__/PostQuery.graphql";
import "../scss/Post.scss";

type postParams = {
  id: string,
}

export function Post(props: RouteComponentProps<postParams>) {
  const postId = props.match.params.id;

  return (
    <AuthContext.Consumer>
      {({ viewer, }) =>
        <QueryRenderer<PostQuery>
          environment={environment}
          variables={{ id: postId }}
          query={graphql`
                query PostQuery($id: ID!) {
                  post(id: $id) {
                    title
                    content
                    author: user {
                      email
                    }
                    tagSet(first: 5) {
                      edges {
                        cursor
                        node {
                          name
                        }
                      }
                    }
                  }
                }
                `}
          render={({ props, error, retry }) => {

            return (
              <div className="Post-root">
                <p>제목 : {props?.post?.title}</p>
                <p>내용 : {props?.post?.content}</p>
                <p>작성자 : {props?.post?.author.email}</p>
                {/* TODO : 태그 / 좋아요 / 댓글 */}
              </div>
            );
          }
          }
        />
      }
    </AuthContext.Consumer>
  );
}