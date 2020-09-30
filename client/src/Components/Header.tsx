import React from 'react';
import { Link } from "react-router-dom";

import logo from '../assets/logo2.png';

type HeaderProps = {
  userSignedId?: boolean,
  active?: string,
}

export default function Header(props: HeaderProps) {

  return (
    <header>
      <div className="menu-wrapper">
        <div className="header-logo">
          <Link to="/">
            <img src={logo} alt="logo" className="logo" />
          </Link>
        </div>
        <div className="menu-holder">
          <nav className="menu-container">
            <ul className="menu-ul">
              <Link to="/">Home</Link>
              <Link to="/About">About</Link>
              <Link to="/">Counseler</Link>
              <Link to="/post/:id">Community</Link>
              <Link to="/profile/:id">Profile</Link>
            </ul>
          </nav>
        </div>
        <div className="header-btn">
          <Link to="/signup">로그인 하기</Link>
        </div>
      </div>
    </header>
  )
}