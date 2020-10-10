import React from "react";
import { RouteComponentProps } from "react-router";
//import { Link } from "react-router-dom";
//import CardContainer from "../Components/CardContainer";
import "../scss/Counselors.scss";
import csimg from '../assets/csprofile_ex.png';

export function Counselors(props: RouteComponentProps) {
  return (
    <div className="container">
      <div className="filter"></div>
      <div className="card-container">
        <div className="cscard">
          <img src={csimg} alt="" />

          <div className="info">
            <div className="p name">Caption Lee</div>
            <div className="p intro">Explore your mind with physical training</div>
            <div className="p likes">14 soldier likes</div>
          </div>
        </div>
      </div>
    </div>
  );
}
