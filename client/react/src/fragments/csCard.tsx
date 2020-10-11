import React from "react";
import "../scss/CounselerCard.scss";
//import { csCard } from "./__generated__/csCard.graphql";

function csCard(props: any) {
  return (
    <div className="card">
      <div className="csimg"></div>
      <div className="info">
        <div className="name">{props.name}</div>
        <div className="intro">{props.intro}</div>
        <div className="likes">{props.likes}</div>
      </div>
    </div>
  );
}
/*
export default createFragmentContainer(csCard, {
	cscard: graphql`
		fragment csCard on PostNode {
			
		}
	`
})
*/
