import React, { useState } from 'react';
import { RouteComponentProps } from "react-router";
import { Link } from 'react-router-dom';
import { QueryRenderer, graphql } from "react-relay";
import environment from "../_lib/environment";
import CardContainerOnTag from "../Components/CardContainerOnTag";
import { AuthContext } from "../Components/AuthContextProvider";
import { PostsQuery } from "./__generated__/PostsQuery.graphql";
import "../scss/Posts.scss";

export function Posts(props: RouteComponentProps) {
  const [tag, setTag] = useState<string>("");

  return (
    <AuthContext.Consumer>
      {({ viewer, }) =>
        <QueryRenderer<PostsQuery>
          environment={environment}

          variables={{ name: tag }}
          query={graphql`
                query PostsQuery($name: String) {
                  tags(name_Icontains: $name) {
                    edges {
                      cursor
                      tag: node {
                        id
                        name
                        ...CardContainerOnTag_cards
                      }
                    }
                  }
                  
                }
                `}
          render={({ props, error, retry }) => {
            const tags = props?.tags?.edges;
            return (
              <div className="Posts-root">
                <h1>커뮤니티</h1>
                <div className="tag">
                  <h2>태그</h2>
                  <div className="tag-container">
                    <p className="tag-card" onClick={() => setTag("")}>#전체</p>

                    {/* TODO : allTags reduce -> 태그 중복 제거 */}
                    {tags && tags.map((edge) =>
                      edge && <p className="tag-card" onClick={() => { edge?.tag && setTag(edge.tag.name) }}>#{edge.tag?.name}</p>
                    )}
                  </div>
                </div>
                <br /><br />
                <div className="Posts">
                  <div className="Posts-box">
                    <h1>최근 고민</h1>
                    <Link to={viewer ? "/newpost" : "/signin"}>고민작성하기</Link>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', }}>
                    {tags && tags.map((edge) => {
                      return edge && edge.tag && <CardContainerOnTag cards={edge.tag} />
                    })}
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
