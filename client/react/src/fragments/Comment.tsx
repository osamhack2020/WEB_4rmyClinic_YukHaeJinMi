import React from 'react';
import { createFragmentContainer, Environment, graphql } from "react-relay";
import { Comment_comment } from "./__generated__/Comment_comment.graphql";

type CommentProps = {
  relay: {
    environment: Environment
  },
  comment: Comment_comment
}

function Comment(props: CommentProps) {

  return <div className="comment">
    <h4>{props.comment?.user?.nickname}</h4>
    <p>{props.comment?.content}</p>
    {/*<p>{e?.comment?.created}</p>*/} {/*Add Created Time*/}
  </div>
}

export default createFragmentContainer(Comment, {
  comment: graphql`
    fragment Comment_comment on CommentNode {
      viewerCanEditComment
      user {
        nickname
      }
      content
    }
  `
})