import React from 'react';
import { createPaginationContainer, Environment, graphql } from "react-relay";
import Card from "../fragments/Card";
import "../scss/CardContainer.scss";
import { CardContainerOnTag_cards } from "./__generated__/CardContainerOnTag_cards.graphql";

type CardContainerOnTag_Props = {
  relay: {
    environment: Environment
  },
  cards: CardContainerOnTag_cards,
}
function CardsOnTag(props: CardContainerOnTag_Props) {
  const { cards } = props;
  return (
    <div className="card-container">
      {cards.posts?.edges.map(e => { return e?.card && <Card key={e.cursor} card={e.card} /> })}
    </div>
  )
}

export default createPaginationContainer(CardsOnTag, {
  cards: graphql`
    fragment CardContainerOnTag_cards on TagNode
    @argumentDefinitions(
      count: {type: "Int", defaultValue: 6},
      cursor: {type: "String",},
      tagname: {type: "String", defaultValue: ""}
    ) {
      posts(first: $count, after: $cursor) @connection(key: "CardContainerOnTag_posts") {
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
    query CardContainerOnTagQuery(
      $count: Int!
      $cursor: String
      $tagname: String
    ) {
      tags(name_Icontains: $tagname) {
        edges {
          node {
            ...CardContainerOnTag_cards @arguments(count: $count, cursor: $cursor)
          }
        }
      }
    }
  `
});
