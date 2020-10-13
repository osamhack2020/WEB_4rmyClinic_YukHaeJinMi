import React, { useState } from 'react';
import { RouteComponentProps, useHistory } from "react-router";
import { Link } from 'react-router-dom';
import { AuthContext } from "../Components/AuthContextProvider";
// import logo from '../assets/logo2_bgremoved.png';
import '../scss/Sign.scss';

type LoginState = {
  email: string;
  password: string;
}

export function SignIn(props: RouteComponentProps) {

  const [state, set] = useState<LoginState>({
    email: '', password: ''
  });
  const [hasError, setError] = useState<boolean>(false);
  const history = useHistory();

  const handleSubmit = async (loginFn: () => Promise<boolean>) => {
    const success = await loginFn();
    if (success) history.goBack();
    else setError(true);
  }

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { value } = target;
    // console.log(target.name, value);
    set({ ...state, [target.name]: value })
  }

  return (
    <AuthContext.Consumer>
      {({ login }) =>
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
                onClick={() => login && handleSubmit(() => login(state.email, state.password))} />
            </div>
          </div>
          {hasError && <p>사용자 정보가 존재하지 않거나, 이메일 - 비밀번호가 일치하지 않습니다.</p>}

          <p>아직 계정이 없으신가요? <Link to="/signup">회원가입 하기</Link></p>
        </div>
      }
    </AuthContext.Consumer>
  )
} 