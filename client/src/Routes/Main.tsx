import React from 'react';
import { RouteComponentProps } from "react-router";

export function Main(props: RouteComponentProps) {
  return (
    <div>
      <h1>Main</h1>
      <p>path : {props.location.pathname}</p>
    </div>
  )
}