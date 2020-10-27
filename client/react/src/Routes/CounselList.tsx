import React, { useContext } from 'react';
import { graphql, QueryRenderer } from "react-relay";
import { RouteComponentProps } from "react-router";
import environment from "../_lib/environment";
import { AuthContext } from "../Components/AuthContextProvider";
import { CounselList_counselorQuery } from "./__generated__/CounselList_counselorQuery.graphql";
import { CounselList_clientQuery } from "./__generated__/CounselList_clientQuery.graphql";
import "../scss/CounselList.scss";

type CounselStatusProps = {
  status?: number
}
function CounselStatus(props: CounselStatusProps) {
  const idx = props.status ? props.status : 0;
  const status = [{ color: "rgb(242, 163, 89)", msg: "준비중" }, { color: "rgb(90, 244, 129)", msg: "진행중" }, { color: "rgb(92, 104, 237)", msg: "완료" }];
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
      <div style={{ width: "28px", height: "28px", borderRadius: "14px", backgroundColor: status[idx].color }}></div>
      <p style={{ marginLeft: "12px", }}>{status[idx].msg}</p>
    </div>
  )
}

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
    viewer &&
    (!viewer.isCounselor ? <QueryRenderer<CounselList_clientQuery>
      environment={environment}
      variables={{ id: viewer.id }}
      query={query}
      render={({ props, error, retry }) => {
        return (
          <div className="counsel-container">
            {props?.user?.counselClient?.edges.map((edge) =>
              edge && <div className="counsel-box" key={edge.cursor} onClick={() => pp.history.push(`/counsel/${edge?.node?.id}`)}>
                <p className="counsel-title"><strong>{edge?.node?.counselor.nickname}</strong> 님과의 상담</p>
                <CounselStatus status={edge.node?.status} />
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
            <div className="counsel-container">
              {props?.user?.counselCounselor?.edges.map((edge) =>
                edge && <div className="counsel-box" key={edge.cursor} onClick={() => pp.history.push(`/counsel/${edge?.node?.id}`)}>
                  <p className="counsel-title"><strong>{edge?.node?.client?.nickname}</strong> 님과의 상담</p>
                  <CounselStatus status={edge.node?.status} />
                </div>
              )}
            </div>
          )
        }}
      />
    )
  )
}