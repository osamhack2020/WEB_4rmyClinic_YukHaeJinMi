import React from 'react';
import { RouteComponentProps } from "react-router";
import { Link } from 'react-router-dom';
import { QueryRenderer, graphql } from "react-relay";
import environment from "../_lib/environment";
import CardContainer from "../Components/CardContainer";
import { AuthContext } from "../Components/AuthContextProvider";
import { PostsQuery } from "./__generated__/PostsQuery.graphql";
import "../scss/Post.scss";

type postParams = {
  id: string,
}

export function Posts(props: RouteComponentProps) {
  return (
    <AuthContext.Consumer>
      {({ verified, }) =>
        <QueryRenderer<PostsQuery>
          environment={environment}
          variables={{}}
          query={graphql`
                query PostsQuery {
                  allTags {
                    edges {
                        cursor
                      tag: node {
                        name
                      }
                    }
                  }
                  ...CardContainer_cards
                }
                `}
          render={({ props, error, retry }) => {
            const tags = props?.allTags?.edges;
            return (
              <div className="Post-root">
                <h1>커뮤니티</h1>
                <div className="tag">
                  <h2>태그</h2>
                  <div className="tag-container">
                    {tags?.map((e) =>
                      <a href="##" className="tag-card">#{e?.tag?.name}</a>
                    )}
                  </div>
                </div>
                <br /><br />
                <div className="Post">
                  <div className="Post-box">
                    <h1>최근 고민</h1>
                    <Link to={verified ? "/newpost" : "/signin"}>고민작성하기</Link>
                  </div>
                  {props && <CardContainer cards={props} />}
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