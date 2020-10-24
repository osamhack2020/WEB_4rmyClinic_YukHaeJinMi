import React, { useContext } from 'react';
import { graphql, QueryRenderer } from "react-relay";
import { RouteComponentProps } from "react-router";
import environment from "../_lib/environment";
import { AuthContext } from "../Components/AuthContextProvider";
import { CounselList_counselorQuery } from "./__generated__/CounselList_counselorQuery.graphql";
import { CounselList_clientQuery } from "./__generated__/CounselList_clientQuery.graphql";

export function CounselList(pp: RouteComponentProps) {
  const { viewer } = useContext(AuthContext);
  const query = viewer && (!viewer.isCounselor
    ?
    graphql`
      query CounselList_clientQuery($id: ID!) {
          user(id: $id) {
            counselClient {
              edges {
                cursor
                node { 
                  id
                  status
                  counselor {
                    nickname
                  }
                }
              }
            }
          }

        }
    `
    :
    graphql`
    query CounselList_counselorQuery($id: ID!) {
          user(id: $id) {
            counselCounselor {
              edges {
                cursor
                node { 
                  id
                  status
                  client {
                    nickname
                  }
                }
              }
            }
          }

        }`
  );
  return (
    viewer && (!viewer.isCounselor ? <QueryRenderer<CounselList_clientQuery>
      environment={environment}
      variables={{ id: viewer.id }}
      query={query}
      render={({ props, error, retry }) => {
        return (
          <div>
            {props?.user?.counselClient?.edges.map((edge) =>
              edge && <div key={edge.cursor} onClick={() => pp.history.push(`/counsel/${edge?.node?.id}`)}>
                <h3>{edge?.node?.counselor.nickname}님과의 상담</h3>
                <p>진행상태 : {edge?.node?.status}</p>
              </div>
            )}
          </div>
        )
      }}
    />
      : <QueryRenderer<CounselList_counselorQuery>
        environment={environment}
        variables={{ id: viewer.id }}
        query={query}
        render={({ props, error, retry }) => {
          return (
            <div>
              {props?.user?.counselCounselor?.edges.map((edge) =>
                edge && <div key={edge.cursor} onClick={() => pp.history.push(`/counsel/${edge?.node?.id}`)}>
                  <h3>{edge?.node?.client?.nickname}님과의 상담</h3>
                  <p>진행상태 : {edge?.node?.status}</p>
                </div>
              )}
            </div>
          )
        }}
      />
    )
  )
}