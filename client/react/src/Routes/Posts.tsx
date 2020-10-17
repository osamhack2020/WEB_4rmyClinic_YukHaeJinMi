import React from 'react';
import { RouteComponentProps } from "react-router";
import { Link } from 'react-router-dom';
import { QueryRenderer, graphql } from "react-relay";
import environment from "../_lib/environment";
import CardContainer from "../Components/CardContainer";
import { AuthContext } from "../Components/AuthContextProvider";
import { PostsQuery } from "./__generated__/PostsQuery.graphql";
import "../scss/Post.scss";
import Card from "../fragments/Card";

type tagParams = {
  id: string,
}

export function Posts(props: RouteComponentProps<tagParams>) {
  const tagId = props.match.params.id ? props.match.params.id : '0';
  return (
    <AuthContext.Consumer>
      {({ verified, }) =>
        <QueryRenderer<PostsQuery>
          environment={environment}
          variables={{ id: tagId }}
          query={graphql`
                query PostsQuery($id: ID!) {
                  allTags {
                    edges {
                        cursor
                      tag: node {
                        id
                        name
                      }
                    }
                  }
                  tag(id: $id) {
                    name
                    posts {
                      edges {
                        post: node {
                          title
                          content
                          author: user {
                            email
                          }
                        }
                      }
                    }
                  }
                  ...CardContainer_cards
                }
                `}
          render={({ props, error, retry }) => {
            const tagList = props?.allTags?.edges;
            const tag = props?.tag;
            return (
              <div className="Post-root">
                <h1>커뮤니티</h1>
                <div className="tag">
                  <h2>태그</h2>
                  <div className="tag-container">
                    {tagList?.map((e) =>
                      <a href={"/posts/" + e?.tag?.id} className="tag-card">#{e?.tag?.name}</a>
                    )}
                  </div>
                </div>
                <br /><br />
                <div className="Post">
                  <div className="Post-box">
                    {tagId === '0' && <h1>최근 고민</h1>}
                    {tagId !== '0' && 
                      <h1>{tag?.name}<a href={"/posts/"}>전체 게시물 보기</a></h1>
                    }
                    <Link to={verified ? "/newpost" : "/signin"}>고민작성하기</Link>
                  </div>
                  {props && tagId === '0' && <CardContainer cards={props} />}
                  {props && tagId !== '0' &&
                    tag?.posts?.edges?.map((e) =>
                      <div>
                        <p>-------------</p>
                        <p>제목 : {e?.post?.title}</p>
                        <p>내용 : {e?.post?.content}</p>
                        <p>작성자 : {e?.post?.author.email}</p> 
                        <p>-------------</p>
                      </div>
                    )
                  }
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