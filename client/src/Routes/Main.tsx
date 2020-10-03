import React from 'react';
import { RouteComponentProps } from "react-router";
import { Link } from 'react-router-dom';
import bgsvg from '../assets/Main_background.svg';
import bgsvg2 from '../assets/Rectangle.svg';
import counselsvg from '../assets/counsel_img.svg';
import { QueryRenderer, graphql } from "react-relay";
import environment from "../_lib/environment";
import { MainQuery } from "./__generated__/MainQuery.graphql";
import CardContainer from "../Components/CardContainer";
import "../scss/Main.scss";

export function Main(props: RouteComponentProps) {
  return (
    <div className="Main">
      <div className="background1">
        <img src={bgsvg} alt="backgorund_vector1" />
      </div>
      <div className="background2">
        <img src={bgsvg2} alt="backgorund_vector2" />
      </div>
      <div className="container">
        <div className="main-container">
          <div className="row">
            <div className="col-txt">
              <h1>당신의 고민에 적절한 맞춤형 상담 플랫폼을 만나보세요</h1>
              <p>사람들은 저마다의 고민을 가지고 있습니다. 누군가는 위로나 응원이 필요합니다. 그런 위로는 같은 군생활을 하는 동료들이 해주었을 때 큰 효과를 볼 수 있습니다. 힘든 시기를 겪는 전우는 전문적인 상담이 절실합니다. 두군두군 상담소에서는 고민을 다른 장병들과 함께 이야기하며 의논할 수도 있고, 전문적인 상담가와 상담받을 수 있습니다.</p>
              <Link to="/About">더 알아보기</Link>
            </div>
            <div className="col-img">
              <img src={counselsvg} alt="main-img" />
            </div>
          </div>
        </div>
      </div>
      <QueryRenderer<MainQuery>
        environment={environment}
        variables={{}}
        query={graphql`
          query MainQuery {
            ...CardContainer_cards
          }
        `}
        render={({ props, error, retry }) => {
          return props && <CardContainer cards={props} />
        }}
      />
    </div>
  )
}