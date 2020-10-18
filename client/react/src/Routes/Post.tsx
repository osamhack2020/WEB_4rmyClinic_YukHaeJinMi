import React, { useState } from 'react';
import { RouteComponentProps } from "react-router";
import { QueryRenderer, graphql } from "react-relay";
import environment from "../_lib/environment";
import { Link } from 'react-router-dom';
import { AuthContext } from "../Components/AuthContextProvider";
import { PostQuery } from "./__generated__/PostQuery.graphql";
import "../scss/Post.scss";
import { likeCreate } from "../_lib/mutations";
import { likeCreateMutationVariables } from "../_lib/mutations/__generated__/likeCreateMutation.graphql";

type postParams = {
  id: string,
}

export function Post(props: RouteComponentProps<postParams>) {
  const postId = props.match.params.id;

  const [state, setState] = useState<likeCreateMutationVariables>({
        userId: '',
        postId: '',
    });
	{/* TODO
	  * 로그인되어 있는 유저의 id 값을 받아 올 것.
	*/}
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
                    like
                    id
                    author: user {
                      email
                    }
                    commentSet {
                    	edges {
                    		comment: node {
                    			content
                    			created
                    			user {
                    				nickname
                    			}
                    		}
                    	}
                    }
                    tagSet(first: 5) {
                      edges {
                        cursor
                        tag: node {
                          name
                        }
                      }
                    }
                  }
                }
                `}
          render={({ props, error, retry }) => {
          	const tags = props?.post?.tagSet?.edges;
          	const comments = props?.post?.commentSet?.edges;
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
                    {tags && tags.map((e)=>
                    	<div className="tags">
                    		#{e?.tag?.name}
                    	</div>
                    )}
                    <div className="indicator">좋아요 : {props?.post?.like}개</div>
                    <div className="return-btn">
                  <button /*onClick={ () => {
                  	setState({ userId: props?.post?.author?.id!, postId: props?.post?.id! });
                  	likeCreate({...state});
                   }}*/>쪼아요</button>
                </div>
                  </div>
                  <hr />
                  <div className="comment-container"> {/*pagination*/}
                  {comments && comments.map((e) =>
                  	<div className="comment">
                      <h4>{e?.comment?.user?.nickname}</h4>
                      <p>{e?.comment?.content}</p>
                      {/*<p>{e?.comment?.created}</p>*/} {/*Add Created Time*/}
                    </div>
                  )}
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