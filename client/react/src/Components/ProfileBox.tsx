import React from 'react';
import { AuthContext } from "./AuthContextProvider";
import '../scss/ProfileBox.scss';
import { useHistory } from "react-router";

type ProfileBoxProps = {
  active?: boolean
}

export function ProfileBox(props: ProfileBoxProps) {
  const history = useHistory();
  return (
    <AuthContext.Consumer>
      {({ logout, viewer }) =>
        viewer && <div className={`${props.active ? 'active' : 'inactive'}`}>
          <p onClick={() => { history.push('/mypage/' + viewer.id) }}>내 정보 수정</p>
          <hr />
          <p onClick={() => { history.push('/counsellist') }}>진행중인 상담</p>
          <hr />
          <p onClick={logout}>로그아웃</p>
        </div>
      }
    </AuthContext.Consumer>
  )
}