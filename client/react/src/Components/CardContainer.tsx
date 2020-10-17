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
export function Cards(props: CardContainerProps) {
  const { cards } = props;
  return (
    <div className="card-container">
      {cards.posts?.edges.map(e => { return e?.card && <Card key={e.cursor} card={e.card} /> })}
    </div>
  )
}

export default createPaginationContainer(Cards, {
  cards: graphql`
    fragment CardContainer_cards on TagNode
    @argumentDefinitions(
      count: {type: "Int", defaultValue: 6},
      cursor: {type: "String",},
      tagname: {type: "String", defaultValue: ""}
    ) {
      posts(first: $count, after: $cursor) @connection(key: "CardContainer_posts") {
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
      $tagname: String
    ) {
      tags(name_Icontains: $tagname) {
        edges {
          node {
            ...CardContainer_cards @arguments(count: $count, cursor: $cursor)
          }
        }
      }
    }
  `
})