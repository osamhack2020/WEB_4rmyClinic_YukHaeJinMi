import React from 'react';
import { RouteComponentProps } from "react-router";
import { Link } from 'react-router-dom';
import bgsvg from '../assets/Main_background.svg';
import bgsvg2 from '../assets/Rectangle.svg';
import counselsvg from '../assets/counsel_img.svg';
import { QueryRenderer, graphql } from "react-relay";
import environment from "../_lib/environment";
import { ProfileQuery } from "./__generated__/ProfileQuery.graphql";
import CardContainer from "../Components/CardContainer";
import "../scss/Main.scss";

export function Profile(props: RouteComponentProps) {
	return (
		<QueryRenderer<ProfileQuery>
			environment={environment}
			variables={{}}
			query={graphql`
  			query ProfileQuery {
  				allUsers {
  					edges {
  						user: node {
  							email
  							division
  							rank
  						}
  					}
  				}
  			}
  			` }
			render={({ props, error, retry }) => {
				const users = props?.allUsers?.edges;
				return users?.map((e) =>
					<div>
						<table>
							<th>이메일</th>
							<th>소속</th>
							<th>계급</th>
							<tr>
								<td>{e?.user?.email}</td>
								<td>{e?.user?.division}</td>
								<td>{e?.user?.rank}</td>
							</tr>
						</table>
					</div>
				)
			}}
		/>
	)
}