import React from 'react';
import { RouteComponentProps } from "react-router";
import { Link } from 'react-router-dom';
// import logo from '../assets/logo2_bgremoved.png';
import '../scss/Sign.scss';

export function SignIn(props: RouteComponentProps) {
  return (
    <div className="root">
      <div className="sign">
        {/* <img src={logo} className="logo" alt="logo" /> */}

        <form className="sign-form" name="signin" method="post">
          <h1>계정을 입력하세요</h1>

          <div className="box">
            <label htmlFor="email">이메일</label>
            <input className="box-input" type="email" name="email" />
          </div>

          <div className="box">
            <label htmlFor="password">비밀번호</label>
            <input className="box-input" type="password" name="password" />
          </div>

          <input className="box-btn" type='submit' value='로그인' />
        </form>
      </div>

      <p>아직 계정이 없으신가요? <Link to="/signup">회원가입 하기</Link></p>

    </div>
  )
} 