import React, { useState } from 'react';
import { RouteComponentProps, useHistory } from "react-router";
import { Link } from 'react-router-dom';
// import logo from '../assets/logo2_bgremoved.png';
import '../scss/Sign.scss';
import { UserLogin } from "../_lib/mutations/UserLogin";
import { useCookies } from "react-cookie"

type LoginState = {
  email: string;
  password: string;
}

export function SignIn(props: RouteComponentProps) {
  const [cookies, setCookie] = useCookies(["user"]);

  const [state, set] = useState<LoginState>({
    email: '', password: ''
  });
  const [hasError, setError] = useState<boolean>(false);
  const history = useHistory();

  const handleSubmit = async () => {
    const successed = await UserLogin({ ...state }); // TODO : or return token
    if (successed) {
      history.push("/"); // TODO : redirect Main or somewhere
    } else {
      setError(true);
      alert('로그인 도중 에러가 발생했습니다.');
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
        {/* <img src={logo} className="logo" alt="logo" /> */}

        <div className="signin">
          <h1>계정을 입력하세요</h1>

          <div className="box">
            <label htmlFor="email">이메일</label>
            <input className="box-input" type="email" name="email"
            value={state.email} onChange={handleChange} />
          </div>

          <div className="box">
            <label htmlFor="password">비밀번호</label>
            <input className="box-input" type="password" name="password"
            value={state.password} onChange={handleChange} />
          </div>

          <input className="box-btn" type='submit' value='로그인' 
          onClick={handleSubmit}/>
        </div>
      </div>

      <p>아직 계정이 없으신가요? <Link to="/signup">회원가입 하기</Link></p>

    </div>
  )
} 