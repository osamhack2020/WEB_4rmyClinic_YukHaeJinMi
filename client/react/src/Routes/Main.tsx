import React from 'react';
import { RouteComponentProps } from "react-router";
import { Link } from 'react-router-dom';
// import bgsvg2 from '../assets/Rectangle.svg';
// import counselsvg from '../assets/counsel_img.svg';
import { QueryRenderer, graphql } from "react-relay";
import environment from "../_lib/environment";
import { MainQuery } from "./__generated__/MainQuery.graphql";
import "../scss/Main.scss";
import CardContainer from "../Components/CardContainer";

export function Main(props: RouteComponentProps) {
  return (
    <div className="main-container">
      <div className="row">
        <div className="txt">
          <p className="txt-headline">당신의 고민에 적절한<br />맞춤형 상담 플랫폼을<br />만나보세요</p>
          <p className="txt-sub">
            사람들은 저마다의 고민을 가지고 있습니다. 누군가는 위로나 응원이 필요합니다.<br />
            그런 위로는 같은 군생활을 하는 동료들이 해주었을 때 큰 효과를 볼 수 있습니다.<br />
                힘든 시기를 겪는 전우는 전문적인 상담이 절실합니다.<br />
                두군두군 상담소에서는 고민을 다른 장병들과 함께 이야기하며 의논할 수도 있고,<br />
                전문 상담가에게 상담을 받을 수 있습니다.
              </p>
          <div className="btns">
            <Link to="/counselors" className="btn counsel">상담 받아보기</Link>
            <Link to="/about" className="btn moreinfo">더 알아보기</Link>
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
          // TODO : MainQuery에서의 pagination query 랑 Posts에서의 pagination query는 다르다.
          // (1) posts에 대한 connection - main / posts에서 전체 태그 선택시
          // (2) /posts에서 태그 선택시 태그에 대한 커넥션
          return props && <CardContainer cards={props} />
        }}
      />
    </div>
  )
}