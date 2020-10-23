import React, { useState } from 'react';
import { createFragmentContainer, Environment, graphql } from "react-relay";
import { useHistory } from "react-router";
import "../scss/Write.scss";
import { PostForm_post } from "./__generated__/PostForm_post.graphql";


type postFormParams = {
  title?: string,
  content?: string,
  tags?: string,
}

type PostFormFragmentProps = {
  relay?: {
    environment: Environment,
  },
  post?: PostForm_post,
  // TODO: input type 설정..
  onClickSubmit?: (input: any) => Promise<string>,
}

export function PostFormFragment(props: PostFormFragmentProps) {
  // const postId = props.match.params.id;
  const { onClickSubmit } = props;
  const [state, setState] = useState<postFormParams>({
    title: props.post?.title,
    content: props.post?.content,
    tags: props.post?.tagSet.edges.reduce((cur, edge) => { return cur + " #" + edge!.node!.name }, ''),
  });
  const history = useHistory();

  return (
    <div className="root">
      {/* 어디서 고민 작성 버튼을 눌렀든 무조건 이전 페이지로 돌아가기*/}
      <div className="return">
        <a href="##" onClick={() => {
          history.goBack();
        }}>←</a><h3>돌아가기</h3>
      </div>
      <div className="write-container">
        <div className="box write-title">
          <input className="write-input" type="text" name="title" placeholder="고민의 제목을 달아주세요"
            value={state.title}
            onChange={({ target }) => {
              setState({ ...state, title: target.value });
            }}

          />
        </div>
        <div className="box write-text">
          <textarea placeholder="고민 내용을 입력하세용" name="content"
            value={state.content}
            onChange={({ target }) => {
              setState({ ...state, content: target.value });
            }}>
          </textarea>
        </div>
        {/* TODO : tag(#~) 에 대해 정규식 사용하여 parsing */}
        <div className="box write-tags">
          <input className="write-input" type="text" name="tags" placeholder="고민의 태그를 달아보세요 #군대 #가족 #애인"
            value={state.tags}
            onChange={({ target }) => {
              setState({ ...state, tags: target.value });
            }} />
        </div>
        {/* TODO : postCreate 시 form validation*/}
        <input className="write-btn" type="submit" value="고민 게시하기" onClick={() => {
          onClickSubmit && onClickSubmit({ ...state }).then(id => history.push(`/post/${id}`));
        }}
        />
      </div>
    </div>
  );
}

export default createFragmentContainer(PostFormFragment, {
  post: graphql`
    fragment PostForm_post on PostNode {
      title
      content
      tagSet {
        edges {
          node {
            name
          }
        }
      }
    }
  `
});