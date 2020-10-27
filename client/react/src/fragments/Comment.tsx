import React from 'react';
import { createFragmentContainer, Environment, graphql } from "react-relay";
import { Comment_comment } from "./__generated__/Comment_comment.graphql";
import { commentDelete } from "../_lib/mutations/commentDelete";
import { ProfileIcon } from "../Components/ProfileIcon";
import "../scss/Comment.scss";

type CommentProps = {
  relay: {
    environment: Environment
  },
  comment: Comment_comment,
}

function Comment(props: CommentProps) {
  const commentId = props.comment?.id;
  const created = props.comment.created as Date;
  return <div className="comment">
    {props.comment?.viewerCanEditComment &&
      <button className="authbutton" onClick={() => {
        commentDelete({ commentId });
      }} style={{ margin: "12px", float: "right" }}>X</button>
    }

    <div className="writer">
      <ProfileIcon imgUri={props.comment.user?.imgUri} size={20} borderRadius={12} />
      <h4>{props.comment?.user?.nickname}</h4>
    </div>
    <p className="content">{props.comment?.content}</p>
    <p className="created">{created}</p> {/*Add Created Time*/}
    <hr />
  </div>
}

export default createFragmentContainer(Comment, {
  comment: graphql`
    fragment Comment_comment on CommentNode {
      viewerCanEditComment
      id
      user {
        nickname
        imgUri
      }
      content
      created
    }
  `
})