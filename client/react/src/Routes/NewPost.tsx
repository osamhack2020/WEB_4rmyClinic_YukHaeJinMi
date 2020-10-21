import React, { useState } from 'react';
import { RouteComponentProps } from "react-router";
import "../scss/Write.scss";
import { postCreate } from "../_lib/mutations";
import { postCreateMutationVariables } from "../_lib/mutations/__generated__/postCreateMutation.graphql";

type postParams = {
  id: string,
}

type createParams = {
    title: string,
    content: string,
    tags: string,
}

export function NewPost(props: RouteComponentProps<postParams>) {
    const postId = props.match.params.id;
    const [state, setState] = useState<createParams>({
        title: '',
        content: '',
        tags: '',
    });

    return (
        <div className="root">
            {/* 어디서 고민 작성 버튼을 눌렀든 무조건 이전 페이지로 돌아가기*/}
            <div className="return">
                <a href="##" onClick={() => {
                    props.history.goBack();
                }}>←</a><h3>돌아가기</h3>
            </div>
            <div className="write-container">
                <div className="box write-title">
                    <input className="write-input" type="text" name="title" placeholder="고민의 제목을 달아주세요"
                        value={state.title}
                        onChange={({ target }) => {
                            setState({ tags: state.tags, content: state.content, title: target.value });
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
                    postCreate({ postId, ...state });
                    props.history.push("/posts"); // TODO : push "/posts" ?
                    window.location.reload()
                }}
                />
            </div>
        </div>
    );
}