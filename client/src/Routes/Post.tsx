import React from 'react';
import { RouteComponentProps, useParams } from "react-router";

type postParams = {
  id: string,
}

export function Post(props: RouteComponentProps) {
  const { id } = useParams<postParams>();
  return (
    <div>
      <h1>Post</h1>
      <p>{id}</p>
    </div>
  )
}