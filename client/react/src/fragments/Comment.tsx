import React from 'react';
import { createFragmentContainer, Environment, graphql } from "react-relay";
import { Comment_comment } from "./__generated__/Comment_comment.graphql";
import { commentDelete } from "../_lib/mutations";

type CommentProps = {
  relay: {
    environment: Environment
  },
  comment: Comment_comment,
}

function Comment(props: CommentProps) {
  const commentId = props.comment?.id;

  return <div className="comment">
    <h4>{props.comment?.user?.nickname}</h4>
    <p>{props.comment?.content}</p>
    {/*<p>{e?.comment?.created}</p>*/} {/*Add Created Time*/}
    {props.comment?.viewerCanEditComment &&
      <button onClick={() => {
        commentDelete({ commentId });
      }}>X</button>
    }

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
      }
      content
    }
  `
})