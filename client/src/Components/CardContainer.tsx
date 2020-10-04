import React from 'react';
import { createPaginationContainer, Environment, graphql } from "react-relay";
import Card from "../fragments/Card";
import "../scss/CardContainer.scss";
import { CardContainer_cards } from "./__generated__/CardContainer_cards.graphql";

type CardContainerProps = {
  relay: {
    environment: Environment
  },
  cards: CardContainer_cards,
}
function CardContainer(props: CardContainerProps) {
  const { cards } = props;
  return (
    <div className="card-container">
      {cards.recentPosts?.edges.map(e => { return e?.card && <Card key={e.cursor} card={e.card} /> })}
    </div>
  )
}

export default createPaginationContainer(CardContainer, {
  cards: graphql`
    fragment CardContainer_cards on Query
    @argumentDefinitions(
      count: {type: "Int", defaultValue: 20},
      cursor: {type: "String",}
    ) {
      recentPosts(first: $count, after: $cursor) @connection(key: "CardContainer_recentPosts") {
        edges {
          cursor
          card: node {
            ...Card_card
          }
        }
      }
    }
  `
}, {
  getVariables: (props, info) => ({ ...info }),
  query: graphql`
    query CardContainerQuery(
      $count: Int!
      $cursor: String
    ) {
      ...CardContainer_cards @arguments(count: $count, cursor: $cursor)
    }
  `
})