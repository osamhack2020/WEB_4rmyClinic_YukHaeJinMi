import React from 'react';
import { RouteComponentProps } from "react-router";
import { Link } from 'react-router-dom';
import "../scss/Write.scss";

export function NewPost(props: RouteComponentProps) {
    return (
        <div className="root">
            <div className="return">
                <Link to="/post/:id">←</Link><h3>돌아가기</h3>
            </div>
            <div className="write-container">
                <div className="box write-title">
                    <input className="write-input" type="text" name="title" placeholder="고민의 제목을 달아주세요" />
                </div>
                <div className="box write-text">
                    <textarea placeholder="고민 내용을 입력하세용" ></textarea>
                </div>
                <div className="box write-tags">
                    <input className="write-input" type="text" name="title" placeholder="고민의 태그를 달아보세요 #군대 #가족 #애인" />
                </div>
                <input className="write-btn" type="submit" name="submit" value="고민 게시하기" />
            </div>
        </div>
    );
}