import React from 'react';
import { RouteComponentProps } from "react-router";
import { AuthContext } from "../Components/AuthContextProvider";
import { UploadImg } from "../_lib/imageclient";
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

  onSubmit = async (email: string) => {
    const uploaded = this.state.img && await UploadImg(this.state.img)
    if (uploaded) {
      this.props.history.goBack();
    }
  }

  render() {
    return (
      <AuthContext.Consumer>
        {({ email }) =>
          email && <div>
            {/* <form onSubmit={(e) => this.onSubmit(e, email)} > */}
            <input type="file" onChange={this.handleChangeImg} />
            <input type="submit" value="submit" onClick={() => this.onSubmit(email)} />
            {/* </form> */}
            {this.state.imgPreviewUri && <img className="preview" src={this.state.imgPreviewUri} alt="preview" />}
          </div>
        }
      </AuthContext.Consumer>
    )
  }
}