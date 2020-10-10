import React from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import "../scss/csAbout.scss";
import csimg from '../assets/csprofile_ex.png';

export function CsAbout(props: RouteComponentProps) {
  return (
    <div className="csabout-container">
      <div className="csprofile">
        <div className="left">
          <div className="csimg">
            <img src={csimg} alt="csimg" />
            <h2>Captain Lee</h2>
            <p>Blow up your mind with physical training</p>
          </div>
          <Link to="/">go counsel</Link>
        </div>
        <div className="cshistory">
          <div className="academic">학력<hr/>카이스트 박사</div>
          <div className="career">경력<hr/>국내 최초 노벨문학상 수상</div>
        </div>
      </div>
      <div className="introduce">
        <h2>소개</h2><hr/>
        <p>안녕하세요 이근대위입니다. 당신의 나약한 정신과 신체를 MUSAT SURVIVE 과정을 통해 단련시켜 드립니다. 안되면 될때까지 악바리로 견디고 버텨내고 나면 한층 더 성장한 자신을 볼 수 있을 겁니다. </p>
      </div>
      <div className="grade">
        <div className="card-container">
          <div className="card likes"><h2>추천 수</h2><h3>38</h3></div>
          <div className="card ongoing"><h2>상담 진행 중</h2><h3>5</h3></div>
          <div className="card complete"><h2>완료된 상담 수</h2><h3>234</h3></div>
        </div>
      </div>
      <div className="review">
        <div><h2>후기</h2></div>
        <div className="review-container">
          <p>지옥과 같았습니다. 상담할려다가 골병 들었네요.   -익명4-</p>
          <p>마음이 힘들어 갔는데 몸도 건강해졌어요   -익명23-</p>
          <p>이분 할머니가 그렇게 빠르답니다.   -익명84-</p>
        </div>
      </div>
    </div>
  )
}
