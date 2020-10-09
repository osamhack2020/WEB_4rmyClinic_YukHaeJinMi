import React from 'react';
import { Link } from "react-router-dom";
import '../scss/header.scss';
import logo from '../assets/logo2_bgremoved.png';
import { AuthContext } from "./AuthContextProvider";

type HeaderProps = {
  userSignedId?: boolean,
  active?: string,
}

export default function Header(props: HeaderProps) {

  return (
    <AuthContext.Consumer>
      {({ email, logout }) =>
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
                  <Link to="/Counselors">Counseler</Link>
                  <Link to="/post/:id">Community</Link>
                  <Link to="/profile/:id">Profile</Link>
                </ul>
              </nav>
            </div>
            <div className="header-btn">
              {/* TODO : 현재 fake email -> 진짜 user email로 */}
              {email ? <div>{email} <p onClick={logout}>로그아웃하기</p></div> : <Link to="/signin">로그인 하기</Link>}
            </div>
          </div>
        </header>
      }
    </AuthContext.Consumer>
  )
}