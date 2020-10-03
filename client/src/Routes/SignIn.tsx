import React from 'react';
import { RouteComponentProps } from "react-router";
import { Link } from 'react-router-dom';
import logo from '../assets/logo2_bgremoved.png';
import '../scss/SignIn.scss';

export function SignIn(props: RouteComponentProps) {
  return (
    <div>
      <div className="signin">
        <div className="logo">
          <img src={logo} alt="logo"/>
        </div>
        <div className="blank"></div>
        <div className="form-container">
          <form name="signin" method="post">
            <h1>계정을 입력하세요</h1>
            <p>
              <h3>이메일</h3>
              <input type="email" name="email" />
            </p>
            <p>
              <h3>비밀번호</h3>
              <input type="password" name="password" />
            </p>

            <hr /><hr />
            <input type='submit' value='로그인' />
          </form>
          <div className="blank"></div>
          <p>아직 계정이 없으신가요? <Link to="/signup">회원가입 하기</Link></p>
        </div>  
      </div>
    </div>
  )
} 