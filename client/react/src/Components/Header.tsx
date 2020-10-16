import React from 'react';
import { Link } from "react-router-dom";
import '../scss/header.scss';
import logo from '../assets/logo_col.svg';
import logo_row from '../assets/logo_row.svg';
import { AuthContext } from "./AuthContextProvider";

type HeaderProps = {
  userSignedId?: boolean,
  active?: string,
}

export default function Header(props: HeaderProps) {

  return (
    <AuthContext.Consumer>
      {({ verified, email, logout }) =>
        <header>
          <div className="menu-wrapper">
            <div className="header-logo-d">
              <Link to="/">
                <img src={logo} alt="logo" className="logo" />
              </Link>
            </div>
            <div className="header-logo-m">
              <Link to="/">
                <img src={logo_row} alt="logo" className="logo" />
              </Link>
            </div>
            <div className="menu-holder">
              <nav className="menu-container">
                <ul className="menu-ul">
                  <Link to="/">Home</Link>
                  <Link to="/About">About</Link>
                  <Link to="/Counselors">Counseler</Link>
                  <Link to="/post/:id">Community</Link>
                  <Link to="/profile/:id">Profile</Link>
                </ul>
              </nav>
            </div>
            <div className="header-btn">
              {verified && email ? <div>{email} <p onClick={logout}>로그아웃하기</p></div> : <Link to="/signin">로그인 하기</Link>}
            </div>
          </div>
        </header>
      }
    </AuthContext.Consumer>
  )
}