import React from 'react';
import { createFragmentContainer, Environment, graphql } from "react-relay";
import { Card_card } from "./__generated__/Card_card.graphql";
import '../scss/Card.scss';

type CardProps = {
	relay: {
		environment: Environment
	},
	card: Card_card
}
function Card(props: CardProps) {
	const { card } = props;
	return (
		<div className="card">
			<div className="card-title">{card.title}</div>
			<div className="card-body">{card.content}</div>
			<div className="card-profile">
				<div className="card-profile-img"></div> {/* TODO */}
				<div className="card-profile-id">{card.author.email}</div> {/* TODO - email as id : nickname*/}
			</div>
		</div>
	)
}

export default createFragmentContainer(Card, {
	card: graphql`
		fragment Card_card on PostNode {
			id
			title
			content
			author: user {
				rank # nickname 임시사용
				email
				# img
			}
		}
	`
})