import React from 'react';
import { RouteComponentProps } from "react-router";
import { QueryRenderer, graphql } from "react-relay";
import environment from "../_lib/environment";
import { MainQuery } from "./__generated__/MainQuery.graphql";
import CardContainer from "../Components/CardContainer";
import "../scss/Main.scss";

type postParams = {
  id: string,
}

export function Post(props: RouteComponentProps) {
  return (
    <div className="Post">
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
  )
}