import React from 'react';
import { RouteComponentProps, useParams } from "react-router";
import { Link } from 'react-router-dom';
import bgsvg from '../assets/Main_background.svg';
import bgsvg2 from '../assets/Rectangle.svg';
import counselsvg from '../assets/counsel_img.svg';
import { QueryRenderer, graphql } from "react-relay";
import environment from "../_lib/environment";
import { MainQuery } from "./__generated__/MainQuery.graphql";
import CardContainer from "../Components/CardContainer";
import { useCookies } from "react-cookie"
import "../scss/Main.scss";

type postParams = {
  id: string,
}

export function Post(props: RouteComponentProps) {
  const { id } = useParams<postParams>();
  const [cookies, setCookie] = useCookies(["user"]);
  return (
  	<div className="Post">
    <div>
        <h1>React Cookies</h1>
        {cookies.user && <p>{cookies.user}</p>}
      </div>
    <QueryRenderer<MainQuery>
        environment={environment}
        variables={{}}
        query={graphql`
          query MainQuery {
            ...CardContainer_cards
          }
        `}
        render={({ props, error, retry }) => {
          return props && <CardContainer cards={props} />
        }}
      />
    </div>
  )
}