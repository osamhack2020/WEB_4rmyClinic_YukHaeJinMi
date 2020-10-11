import React from 'react';
import { RouteComponentProps } from "react-router";
import { Link } from 'react-router-dom';
import { QueryRenderer, graphql } from "react-relay";
import environment from "../_lib/environment";
import { MainQuery } from "./__generated__/MainQuery.graphql";
import CardContainer from "../Components/CardContainer";
import "../scss/Post.scss";

type postParams = {
  id: string,
}

export function Post(props: RouteComponentProps) {
  return (
    <div className="root">
      <h1>커뮤니티</h1>
      <div className="tag">
        <h2>태그</h2>
        <div className="tag-container">
          <a href="#" className="tag-card">#선임</a>
          <a href="#" className="tag-card">#후임</a>
          <a href="#" className="tag-card">#애인</a>
          <a href="#" className="tag-card">#도박</a>
          <a href="#" className="tag-card">#간부</a>
          <a href="#" className="tag-card">#선임</a>
          <a href="#" className="tag-card">#후임</a>
          <a href="#" className="tag-card">#애인</a>
          <a href="#" className="tag-card">#도박</a>
          <a href="#" className="tag-card">#간부</a>
          <a href="#" className="tag-card">#선임</a>
          <a href="#" className="tag-card">#후임</a>
          <a href="#" className="tag-card">#애인</a>
          <a href="#" className="tag-card">#도박</a>
          <a href="#" className="tag-card">#간부</a>
          <a href="#" className="tag-card">#선임</a>
          <a href="#" className="tag-card">#후임</a>
          <a href="#" className="tag-card">#애인</a>
          <a href="#" className="tag-card">#도박</a>
          <a href="#" className="tag-card">#간부</a>
          <a href="#" className="tag-card">#선임</a>
        </div>
      </div>
      <br/><hr />
      <div className="Post">
        <div className="Post-box">
          <h1>최근 고민</h1>
          <Link to="/write">고민작성하기</Link>
        </div>
        <QueryRenderer<MainQuery>
          environment={environment}
          variables={{}}
          query={graphql`
            query PostQuery {
              ...CardContainer_cards
            }
          `}
          render={({ props, error, retry }) => {
            return props && <CardContainer cards={props} />
          }}
        />
      </div>
    </div>
  );
}