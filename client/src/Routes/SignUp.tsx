import React from 'react';
import { RouteComponentProps } from "react-router";
// import logo from '../assets/logo2_bgremoved.png';
import '../scss/Sign.scss';

<<<<<<< HEAD
class SignUp extends React.Component<{}, { name: string, email: string, password: string, password_repeat: string, 
                                           phone: string, division: string, rank: string }> {
  constructor(props:any){
    super(props);
    this.state = {name: '',
                  email: '',
                  password: '',
                  password_repeat: '',
                  phone: '',
                  division: '',
                  rank: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e:any){
    if (this.state.password != this.state.password_repeat){
      alert('비밀번호가 일치하지 않습니다.');
    }
    else{
      alert('이름: ' + this.state.name + 
            '\n이메일: ' + this.state.email +
            '\n전화번호: ' + this.state.phone +
            '\n소속: ' + this.state.division + 
            '\n계급 : ' + this.state.rank);
    }
    e.preventDefault();
  }
  handleChange(e:any){
    this.setState({name: e.target.name});
    this.setState({email: e.target.email});
    this.setState({password: e.target.password});
    this.setState({password_repeat: e.target.password_repeat});
    this.setState({phone: e.target.phone});
    this.setState({division: e.target.division});
    this.setState({rank: e.target.rank});
  }
  render() {
    return (
      <div className="root">
        <div className="sign">
         {/* <div className="logo">
            <img src={logo} alt="logo" />
          </div> */}
          <form name="profile" method="post" onSubmit={this.handleSubmit}>
            <h1>아래사항을 기입해주세요</h1>
            <div className="box">
              <label>이름</label>
              <input className="box-input" type="text" name="name" 
                     value={this.state.name} onChange={this.handleChange}/>
            </div>
            <div className="box">
              <label>이메일 주소</label>
              <input className="box-input" type="email" name="email" 
                     value={this.state.email} onChange={this.handleChange}/>
            </div>
            <div className="box">
              <label>비밀번호</label>
              <input className="box-input" type="password" name="password"
                     value={this.state.password} onChange={this.handleChange}/>
            </div>
            <div className="box">
              <label>비밀번호</label>
              <input className="box-input" type="password" name="password_repeat"
                     value={this.state.password_repeat} onChange={this.handleChange}/>
            </div>
            <div className="box">
              <label>전화번호</label>
              <input className="box-input" type="tel" name="phone-number"
                     value={this.state.phone} onChange={this.handleChange}/>
            </div>
             <div className="box">
              <label htmlFor="class">소속</label>
              <select name="class" value={this.state.division} onChange={this.handleChange}>
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
              <label htmlFor="class">계급</label>
              <select name="class" value={this.state.rank} onChange={this.handleChange}>
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
            </div>
            <input className="box-btn blue" type='submit' value='회원가입하기' />
          </form>
        </div>
      </div>
    );
  }
}

export default SignUp;
=======
export function SignUp(props: RouteComponentProps) {
  return (
  	<div>
    <h1>로그인하기...가 아닌 회원가입 테스트 페이지다 이말이야</h1>
    <h1>사실 SignUp이 회원가입이고 SignIn이 로그인임</h1>
    </div>
  )
}
>>>>>>> 368af2ca6dc4869152c2cce240d30d269de007ce
