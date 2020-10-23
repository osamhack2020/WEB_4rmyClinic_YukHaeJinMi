import React from 'react';
import { RouteComponentProps } from "react-router";
import { AuthContext } from "../Components/AuthContextProvider";
import { UploadImg } from "../_lib/imageclient";
import '../scss/Mypage.scss';
// import { userProfileImgSet } from "../_lib/mutations/userProfileImgSet";

type MyPageState = {
  img?: File;
  imgPreviewUri?: string,
}
export class MyPage extends React.Component<RouteComponentProps, MyPageState> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {};
  }
  handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files && e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        img: file as File,
        imgPreviewUri: reader.result as string
      })
    }
    reader.readAsDataURL(file as File);
  }

  onSubmit = async (id: string) => {
    const uploaded = this.state.img && await UploadImg(this.state.img)
    if (uploaded) {
      this.props.history.goBack();
    }
  }

  render() {
    return (
      <AuthContext.Consumer>
        {({ viewer }) =>
          viewer && <div>
            <div>
              {/* <form onSubmit={(e) => this.onSubmit(e, email)} > */}
              <input type="file" onChange={this.handleChangeImg} />
              <input type="submit" value="submit" onClick={() => this.onSubmit(viewer.id!)} />
              {/* </form> */}
              {this.state.imgPreviewUri && <img className="preview" src={this.state.imgPreviewUri} alt="preview" />}
            </div>
            <div className="mypage-root">
              <div className="profile-container">
                <div className="imgbox"></div>
                <div className="myinfo">
                  <div className="label">육군</div>
                  <div className="class">병장 김아무개</div>
                </div>
              </div>
              <div className="mypage-container">
                <div className="sidebar">
                  <div className="history">상담내역</div>
                  <div className="community">커뮤니티</div>
                  <div className="profile-info">회원정보</div>
                </div>
                <div className="showbox"></div>
              </div>
            </div>
          </div>
        }
      </AuthContext.Consumer>
    )
  }
}