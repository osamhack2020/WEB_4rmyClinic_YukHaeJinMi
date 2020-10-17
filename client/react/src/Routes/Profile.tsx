import React from 'react';
import { RouteComponentProps } from "react-router";
import { QueryRenderer, graphql } from "react-relay";
import environment from "../_lib/environment";
import { ProfileQuery } from "./__generated__/ProfileQuery.graphql";

import "../scss/Main.scss";

export function Profile(props: RouteComponentProps) {
	return (
		<QueryRenderer<ProfileQuery>
			environment={environment}
			variables={{}}
			query={graphql`
  			query ProfileQuery {
  				posts {
  					edges {
							cursor
  						post: node {
  							title
  							content
  							commentSet {
  								edges {
  									comment: node {
  										content
  									}
  								}
  							}
  						}
  					}
  				}
  			}
  			` }
			render={({ props, error, retry }) => {
				const posts = props?.posts?.edges;
				return (
					<div>
						<div>
							<h1>댓글 테스트</h1>
						</div>
						<div>
							{posts?.map((e) =>
								<div>
									<p>-------------------</p>
									<p>{e?.post?.title}</p>
									<p>{e?.post?.content}</p>
									{e?.post?.commentSet?.edges &&
										e?.post?.commentSet?.edges.map((t) =>
											<p>댓글: {t?.comment?.content}</p>
										)}
								</div>
							)}
						</div>
					</div>
				)
			}}
		/>
	)
}