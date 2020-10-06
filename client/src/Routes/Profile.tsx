import React from 'react';
import { RouteComponentProps } from "react-router";
// import { Link } from 'react-router-dom';
// import bgsvg from '../assets/Main_background.svg';
// import bgsvg2 from '../assets/Rectangle.svg';
// import counselsvg from '../assets/counsel_img.svg';
import { QueryRenderer, graphql } from "react-relay";
import environment from "../_lib/environment";
import { ProfileQuery } from "./__generated__/ProfileQuery.graphql";

import { useCookies } from "react-cookie"

// import CardContainer from "../Components/CardContainer";
import "../scss/Main.scss";

export function Profile(props: RouteComponentProps) {
	const [cookies, setCookie] = useCookies(["user"]);
	function handleCookie() {
		setCookie("user", "CapitolCity", {
			path: "/"
		});
	}
	return (
		<QueryRenderer<ProfileQuery>
			environment={environment}
			variables={{}}
			query={graphql`
  			query ProfileQuery {
  				allUsers {
  					edges {
							cursor
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
				return (
					<div>
						<div>
							<h1>React Cookies</h1>
							{cookies.user && <p>{cookies.user}</p>}
							<button onClick = {handleCookie}>Set Cookie</button>
						</div>
						<table>
							<thead>
								<tr>
									<th>이메일</th>
									<th>소속</th>
									<th>계급</th>
								</tr>
							</thead>
							<tbody>
								{users?.map((e) =>
									<tr key={e?.cursor}>
										<td>{e?.user?.email}</td>
										<td>{e?.user?.division}</td>
										<td>{e?.user?.rank}</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				)
			}}
		/>
	)
}