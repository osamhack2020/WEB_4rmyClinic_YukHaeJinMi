import React, { useState } from 'react';
import { RouteComponentProps, useHistory } from "react-router";
// import { Link } from 'react-router-dom';
// import bgsvg from '../assets/Main_background.svg';
// import bgsvg2 from '../assets/Rectangle.svg';
// import counselsvg from '../assets/counsel_img.svg';
// import { QueryRenderer, graphql, commitMutation } from "react-relay";
// import environment from "../_lib/environment";
// import { MainQuery } from "./__generated__/MainQuery.graphql";
// import CardContainer from "../Components/CardContainer";
// import { SignUpMutation } from "./__generated__/SignUpMutation.graphql"
import "../scss/Main.scss";
import { authUser } from "../_lib/mutations/authUser";
import { createUser } from "../_lib/mutations/createUser";
// import logo from '../assets/logo2_bgremoved.png';

type SignUpState = {
  name: string;
  email: string;
  password: string;
  passwordRepeat: string;
  phone: string;
  division: string;
  rank: string;
}


function SignUp(props: RouteComponentProps) {
  const [state, set] = useState<SignUpState>({
    name: '', email: '', password: '', passwordRepeat: '',
    phone: '', division: '', rank: ''
  });
  const [hasError, setError] = useState<boolean>(false);
  const history = useHistory();

  const handleSubmit = async () => {
    if (state.password !== state.passwordRepeat) {
      alert('비밀번호가 일치하지 않습니다.');
    }
    else {
      const successed = await createUser({ ...state });
      if (successed) {
        const { email, password } = state;
        const payload = await authUser({ email, password });
        console.log(payload); // TODO : Context로 전달
        history.push("/"); // TODO : redirect Main or somewhere
      } else {
        setError(true);
        alert('회원가입 도중 에러가 발생했습니다.');
      }

    }
  }
  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { value } = target;
    console.log(target.name, value);
    set({ ...state, [target.name]: value })
  }

  return (
    <div className="root">
      <div className="sign">
        {/* <div className="logo">
            <img src={logo} alt="logo" />
          </div> */}
        <div>
          <h1>아래사항을 기입해주세요</h1>
          <div className="box">
            <label>이름</label>
            <input className="box-input" type="text" name="name"
              value={state.name} onChange={handleChange} />
          </div>
          <div className="box">
            <label>이메일 주소</label>
            <input className="box-input" type="email" name="email"
              value={state.email} onChange={handleChange} />
          </div>
          <div className="box">
            <label>비밀번호</label>
            <input className="box-input" type="password" name="password"
              value={state.password} onChange={handleChange} />
          </div>
          <div className="box">
            <label>비밀번호 재입력</label>
            <input className="box-input" type="password" name="passwordRepeat"
              value={state.passwordRepeat} onChange={handleChange} />
          </div>
          <div className="box">
            <label>전화번호</label>
            <input className="box-input" type="tel" name="phone"
              value={state.phone} onChange={handleChange} />
          </div>
          <div className="box">
            <label htmlFor="division">소속</label>
            <select name="division" value={state.division} onChange={handleChange}>
              <option value="">계급선택</option>
              <option value="roka">육군</option>
              <option value="rokn">해군</option>
              <option value="rokaf">공군</option>
              <option value="mnd">국방부 직할</option>
              <option value="civil">민간인/군무원</option>
            </select>
          </div>
          <div className="box">
            {/* TODO : 추후에 option mapping 코드 짜기 */}
            <label htmlFor="rank">계급</label>
            <select name="rank" value={state.rank} onChange={handleChange}>
              <option value="">계급선택</option>
              <option value="non">민간인/군무원</option>
              <option value="pvt">이병</option>
              <option value="pfc">일병</option>
              <option value="cpl">상병</option>
              <option value="sgt">병장</option>
              <option value="ssg">하사</option>
              <option value="sfc">중사</option>
              <option value="msg">상사</option>
              <option value="sma">원사</option>
              <option value="cwo">준위</option>
              <option value="slt">소위</option>
              <option value="lt">중위</option>
              <option value="cpt">대위</option>
              <option value="maj">소령</option>
              <option value="lcl">중령</option>
              <option value="col">대령</option>
              <option value="bg">준장</option>
              <option value="mg">소장</option>
              <option value="lg">중장</option>
              <option value="gen">대장</option>
              {/* <option value="원수">원수</option>
              <option value="국방부장관">국방부장관</option> */}
            </select>
          </div>
          <input className="box-btn blue" type='submit' value='회원가입하기' onClick={handleSubmit} />

          {hasError && <p>이미 존재하는 이메일이거나, 비밀번호가 일치하지 않습니다.</p>}  {/* TODO : pre-check - if email exists */}
        </div>
      </div>
    </div>
  );
}

export default SignUp;
