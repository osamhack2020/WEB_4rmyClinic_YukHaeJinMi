import React from 'react';
import { RouteComponentProps } from "react-router";
import { PostFormFragment } from "../fragments/PostForm";
import "../scss/Write.scss";
import { postCreate } from "../_lib/mutations";

type createParams = {
    title: string,
    content: string,
    tags: string,
}

export function NewPost(props: RouteComponentProps) {
    return (
        <PostFormFragment onClickSubmit={postCreate} relay={undefined} post={undefined} />
    );
}