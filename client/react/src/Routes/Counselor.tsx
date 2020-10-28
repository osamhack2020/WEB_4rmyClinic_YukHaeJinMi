import React from "react";
import { RouteComponentProps, useHistory } from "react-router";
import "../scss/csAbout.scss";
import { graphql, QueryRenderer } from "react-relay";
import environment from "../_lib/environment";
import { CounselorQuery } from "./__generated__/CounselorQuery.graphql";
import { counselStart } from "../_lib/mutations/counselStart";
import { ProfileIcon } from "../Components/ProfileIcon";

type counselorProps = {
  id: string;
};

export function Counselor(props: RouteComponentProps<counselorProps>) {
  const history = useHistory();
  const counselorId = props.match.params.id;
  return (
    <QueryRenderer<CounselorQuery>
      environment={environment}
      variables={{ id: counselorId }}
      query={graphql`
        query CounselorQuery($id: ID!) {
          user(id: $id) {
            nickname
            email
            imgUri
            bio
          }
        }
      `}
      render={({ props, error, retry }) => (
        <div className="csabout-container">
          <div className="csprofile">
            <div className="left">
              <div className="csimg">
                <ProfileIcon imgUri={props?.user?.imgUri} size={100} borderRadius={12} />
                <h2>{props?.user?.nickname}</h2>
                <p>{props?.user?.bio}</p>
              </div>
              <div className="start-button" onClick={async () => {
                const counselId = await counselStart({ counselorId });
                history.push(`/counsel/${counselId}`);
              }}><p style={{ textAlign: 'center' }}>{props?.user?.nickname}님과<br />상담하기</p></div>
            </div>


            {/* TODO : detail 
              상담사에 관한 어떤 자료를 보여주어야 좋을까?
            */}
            <div className="cshistory">
              <div className="career">경력<hr />국내 최초 노벨문학상 수상</div>
            </div>
          </div>
          <div className="introduce">
            <h2>소개</h2><hr />
            <p>안녕하세요 이근대위입니다. 당신의 나약한 정신과 신체를 MUSAT SURVIVE 과정을 통해 단련시켜 드립니다. 안되면 될때까지 악바리로 견디고 버텨내고 나면 한층 더 성장한 자신을 볼 수 있을 겁니다. </p>
          </div>
          <div className="grade">
            <div className="card-container">
              {/* TODO */}
              <div className="card likes"><h2>추천 수</h2><h3>38</h3></div>
              <div className="card ongoing"><h2>상담 진행 중</h2><h3>5</h3></div>
              <div className="card complete"><h2>완료된 상담 수</h2><h3>234</h3></div>
            </div>
          </div>

          {/* TODO : review
              리뷰를 어떻게 작성하게 할 것인지?
            */}
          <div className="review">
            <div><h2>후기</h2></div>
            <div className="review-container">
              <p>지옥과 같았습니다. 상담할려다가 골병 들었네요.   -익명4-</p>
              <p>마음이 힘들어 갔는데 몸도 건강해졌어요   -익명23-</p>
              <p>이분 할머니가 그렇게 빠르답니다.   -익명84-</p>
            </div>
          </div>
        </div>
      )}
    />
  )
}
