import React from 'react';
import { RouteComponentProps } from "react-router";
import { QueryRenderer, graphql } from "react-relay";
import environment from "../_lib/environment";
import { Link } from 'react-router-dom';
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
                <div className="return-btn">
                  <Link to="/Posts">←</Link><h3>돌아가기</h3>
                </div>
                <div className="Post-content">
                  <div className="body">
                    <h1>{props?.post?.title}</h1>
                    <p className="body-text">내용 : {props?.post?.content}</p>
                    {/* TODO : 태그 / 좋아요 / 댓글 */}
                  </div>
                  <p className="writer">{props?.post?.author.email}</p>
                </div>
                <div className="Post-underbox">
                  <div className="side-box">
                    <div className="tags">#고민 #상담</div>
                    <div className="indicator">좋아요 : 10개</div>
                  </div>
                  <hr />
                  <div className="comment-container"> {/*pagenation*/}
                    <div className="comment">
                      <h4>익명용사348</h4>
                      <p>이게 댓글이구만유</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
          }
        />
      }
    </AuthContext.Consumer>
  );
}