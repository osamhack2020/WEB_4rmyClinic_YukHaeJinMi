import React from 'react';
import { Link } from "react-router-dom";
import '../scss/header.scss';
// import logo from '../assets/logo_col.svg';
// import logo_row from '../assets/logo_row.svg';
import logo from '../assets/consideringlogo.png';
import { AuthContext } from "./AuthContextProvider";

type HeaderProps = {
  isMain?: boolean,
}

export default function Header(props: HeaderProps) {

  return (
    <AuthContext.Consumer>
      {({ viewer, logout }) =>
        <header>
          <div className="main">
            <div className="menu-wrapper">
              <div className="logo-d">
                <Link to="/">
                  <img src={logo} alt="logo" className="logo" />
                </Link>
              </div>
              <div className="logo-m">
                <Link to="/">
                  <img src={logo} alt="logo" className="logo" />
                </Link>
              </div>
              <div className="menu-holder">
                <nav className="menu-container">
                  <ul className="menu-ul">
                    <Link to="/about">서비스 소개</Link>
                    <Link to="/counselors">전문 상담사</Link>
                    <Link to="/posts">커뮤니티</Link>
                  </ul>
                </nav>
              </div>
              <div className="login">
                {viewer
                  ?
                  <div className="login-ed">{viewer.nickname}</div>
                  // {/* <p onClick={logout}>로그아웃하기</p>< */}
                  :
                  <Link to="/signin" className="login-required">로그인</Link>
                }

              </div>
            </div>
          </div>
        </header>
      }
    </AuthContext.Consumer>
  )
}