import React from 'react';
import { fetchQuery, graphql } from "react-relay";
import environment from "../_lib/environment";
import { userInfoUpdate } from "../_lib/mutations/userInfoUpdate";
import { InfoUpdateQuery } from "./__generated__/InfoUpdateQuery.graphql";

type InfoUpdateProps = {
  viewerId: string;
  isCounselor?: boolean;
  afterUpdate?: () => void;
}
type InfoUpdateState = {
  bio?: string;
  nickname?: string;
  rank?: string;
  division?: string;
  careers?: string;
}
export class InfoUpdate extends React.Component<InfoUpdateProps, InfoUpdateState> {
  constructor(props: InfoUpdateProps) {
    super(props);
    this.state = {};
  }
  componentDidMount = async () => {
    const q = await fetchQuery<InfoUpdateQuery>(environment, graphql`
    query InfoUpdateQuery($id: ID!) {
      user(id: $id) {
        id
        bio
        nickname
        rank
        division
      }
    }
    `, { id: this.props.viewerId });
    this.setState({ ...q.user });
  }
  handleClickUpdate = async () => {
    const ok = await userInfoUpdate({ ...this.state });
    if (ok) {
      this.props.afterUpdate && this.props.afterUpdate();
    }
  }
  render() {
    return (
      <div>
        <div className="box">
          <label htmlFor="nickname">닉네임</label>
          {this.state.nickname && <input name="nickname" value={this.state.nickname} onChange={({ target }) => this.setState({ nickname: target.value })} />}
        </div>
        <div className="box">
          <label htmlFor="bio">BIO</label>
          {this.state.bio && <input name="bio" value={this.state.bio} onChange={({ target }) => this.setState({ bio: target.value })} />}
        </div>
        {this.props.isCounselor &&
          <div className="box">
            <label htmlFor="careers">경력</label>
            <textarea name="careers" value={this.state.careers} onChange={({ target }) => this.setState({ careers: target.value })} placeholder={"경력 1개당 ;로 마무리를 지어주세요."}></textarea>
          </div>}
        <div className="box">
          <label htmlFor="division">소속</label>
          {this.state.division && <select name="division" value={this.state.division.toLowerCase()} onChange={({ target }) => this.setState({ division: target.value })}>
            <option value="">계급선택</option>
            <option value="roka">육군</option>
            <option value="rokn">해군</option>
            <option value="rokaf">공군</option>
            <option value="mnd">국방부 직할</option>
            <option value="civil">민간인/군무원</option>
          </select>}
        </div>
        <div className="box">
          {/* TODO : 추후에 option mapping 코드 짜기 */}
          <label htmlFor="rank">계급</label>
          {this.state.rank && <select name="rank" value={this.state.rank.toLowerCase()} onChange={({ target }) => this.setState({ rank: target.value })}>
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
          </select>
          }
        </div>
        <div className="box submit" onClick={this.handleClickUpdate}>
          수정하기
        </div>
      </div>
    )
  }
}