import React, { useState } from 'react';
import { RouteComponentProps, useHistory } from "react-router";
import { QueryRenderer, graphql } from "react-relay";
import environment from "../_lib/environment";
import { Link } from 'react-router-dom';
import { AuthContext } from "../Components/AuthContextProvider";
import { PostQuery } from "./__generated__/PostQuery.graphql";
import "../scss/Post.scss";
import { likeToggle } from "../_lib/mutations";
import CommentsContainer from "../Components/CommentsContainer";
import { commentCreate } from "../_lib/mutations";
import { postDelete } from "../_lib/mutations";

type postParams = {
  id: string,
}

type commentParams = {
  content: string,
}

export function Post(props: RouteComponentProps<postParams>) {
  const postId = props.match.params.id;
  const history = useHistory();

  const [state, setState] = useState<commentParams>({
    content: '',
  });
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
                    likes
                    viewerAlreadyLiked
                    viewerCanEditPost
                    id
                    author: user {
                      email
                    }
                    
                    ...CommentsContainer_comments

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
            const viewerCanEditPost = props?.post?.viewerCanEditPost;
            return (
              <div className="Post-root">
                <div className="return-btn">
                  <Link to="/posts">←</Link><h3>돌아가기</h3>
                </div>

                {viewerCanEditPost && <div className="return-btn">
                  <Link to={`/updatepost/${postId}`}>!</Link><h3>수정하기</h3>
                  {/* </div>}
                <div className="return-btn"> */}
                  <button onClick={() => {
                    postDelete({ postId });
                    history.push('/posts');
                  }}>X</button>
                </div>
                }
                <div className="Post-content">
                  <div className="body">
                    <h1>{props?.post?.title}</h1>
                    <p className="body-text">내용 : {props?.post?.content}</p>
                  </div>
                  <p className="writer">{props?.post?.author.email}</p>
                </div>
                {/* TODO : 태그 container */}
                <div className="Post-underbox">
                  <div className="side-box">
                    {tags && tags.map((e) =>
                      <div className="tags" key={e?.cursor}>
                        #{e?.tag?.name}
                      </div>
                    )}
                    <div className="indicator">좋아요 {props?.post?.likes}</div>
                    {viewer && <div className="return-btn">
                      <button onClick={() => { viewer && likeToggle({ postId }); }}>쪼아요</button>
                    </div>}
                  </div>
                  <hr />

                  <div className="comment-container"> {/*pagination*/}
                    {viewer &&
                      <div className="input">
                        <textarea className="comment-input" value={state.content}
                          onChange={({ target }) => {
                            setState({ content: target.value })
                          }}
                        />
                        <button onClick={() => {
                          commentCreate({ postId, ...state });
                        }}>댓글쓰기</button>
                      </div>
                    }
                    <hr />
                    {props?.post && <CommentsContainer comments={props.post} />}
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