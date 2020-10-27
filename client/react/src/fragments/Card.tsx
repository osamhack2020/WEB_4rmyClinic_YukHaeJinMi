import React from 'react';
import { createFragmentContainer, Environment, graphql } from "react-relay";
import { Card_card } from "./__generated__/Card_card.graphql";
import '../scss/Card.scss';
import { useHistory } from "react-router-dom";
import { ProfileIcon } from "../Components/ProfileIcon";

type CardProps = {
	relay: {
		environment: Environment
	},
	card: Card_card
}
function Card(props: CardProps) {
	const { card } = props;
	const imgUri = card.author.imgUri;
	const history = useHistory();
	return (
		<div className="card" onClick={() => history.push('/post/' + card.id)}>
			<div className="card-title">{card.title}</div>
			<div className="card-body">{card.content}</div>
			<div className="card-profile">
				{/* {url !== ROOT
					? <img src={url} style={{ background: "None" }} className="card-profile-img" alt="profile-img" />
					: <div className="card-profile-img"></div>
				} */}
				<ProfileIcon imgUri={imgUri} size={24} borderRadius={12} />
				<div className="card-profile-id">{card.author.nickname}</div>
			</div>
		</div >
	)
}

export default createFragmentContainer(Card, {
	card: graphql`
		fragment Card_card on PostNode {
			id
			title
			content
			author: user {
				rank
				nickname
				imgUri
			}
		}
	`
})