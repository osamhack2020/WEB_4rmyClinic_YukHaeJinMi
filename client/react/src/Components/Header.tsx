import React, { useState } from 'react';
import { Link } from "react-router-dom";
import '../scss/header.scss';
// import logo from '../assets/logo_col.svg';
// import logo_row from '../assets/logo_row.svg';
import logo from '../assets/consideringlogo.png';
import { AuthContext } from "./AuthContextProvider";
import { ProfileBox } from "./ProfileBox";
import { ProfileIcon } from "./ProfileIcon";

type HeaderProps = {
  isMain?: boolean,
}

export default function Header(props: HeaderProps) {
  const [active, setActive] = useState<boolean>(false);

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
                  <div className="login-ed" onClick={() => setActive(!active)}>
                    <ProfileIcon imgUri={viewer.imgUri} size={20} borderRadius={12} />
                    <p style={{ marginLeft: "10px" }}>{viewer.nickname}</p>
                    <ProfileBox active={active} />
                  </div>
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