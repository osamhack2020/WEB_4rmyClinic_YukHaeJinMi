import React from 'react';
import { RouteComponentProps } from "react-router";
import logo from '../assets/logo2_bgremoved.png';
import '../scss/SignUp.scss';

export function SignUp(props: RouteComponentProps) {
  return (
    <div>
      <div className="signup">
        <div className="logo">
          <img src={logo} alt="logo"/>
        </div>
        <div className="blank"></div>
        <div className="form-container">
          <form name="profile" method="post">
            <h1>아래사항을 기입해주세요</h1>
            <p>
              <h3>이름</h3>
              <input type="text" name="name" />
            </p>
            <p>
              <h3>이메일 주소</h3>
              <input type="email" name="e-mail" />
            </p>
            <p>
              <h3>비밀번호</h3>
              <input type="password" name="password" />
            </p>
            <p>
              <h3>전화번호</h3>
              <input type="tel" name="phone-number" />
            </p>
            <p>
              <h3>종류</h3>
              <input type="radio" name="chk_info" value="HTML" />육군
              <input type="radio" name="chk_info" value="HTML" />해군
              <input type="radio" name="chk_info" value="HTML" />공군
              <input type="radio" name="chk_info" value="HTML" />국방부 직할
              <input type="radio" name="chk_info" value="HTML" />민간인/군무원
            </p>
            <p>
              <h3>계급</h3>
              <select name="class">
                <option value="">계급선택</option>
                <option value="민간인">민간인</option>
                <option value="군무원">군무원</option>
                <option value="훈련병">훈련병</option>
                <option value="이등병">이등병</option>
                <option value="일등병">일등병</option>
                <option value="상등병">상등병</option>
                <option value="병장">병장</option>
                <option value="하사">하사</option>
                <option value="중사">중사</option>
                <option value="상사">상사</option>
                <option value="원사">원사</option>
                <option value="준위">준위</option>
                <option value="소위">소위</option>
                <option value="중위">중위</option>
                <option value="대위">대위</option>
                <option value="소령">소령</option>
                <option value="중령">중령</option>
                <option value="대령">대령</option>
                <option value="준장">준장</option>
                <option value="소장">소장</option>
                <option value="중장">중장</option>
                <option value="대장">대장</option>
                <option value="원수">원수</option>
                <option value="국방부장관">국방부장관</option>
              </select>
            </p>
            <hr /><hr />
            <input type='submit' value='회원가입 하기' />
          </form>
        </div>  
      </div>
    </div>
  )
}