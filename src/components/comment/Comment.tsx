import { QueryClient, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { deleteComment, editComment } from "../../APIs/detailPostApi";
import { CommentType } from "./CommentList";

const Comment: React.FC<CommentType> = (props) => {
  const userNickname = localStorage.getItem("nickname");
  const [isClicked, setIsClicked] = useState(false);
  const queryClient = new QueryClient();
  const {
    commentId,
    comment,
    nickname,
    // commentLikeNum,
    // isLikecomment,
    createAt,
  } = props;
  const [newComment, setNewComment] = useState(comment);
  const delComment = useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(["comment"]);
    },
  });
  const putComment = useMutation(editComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(["comment"]);
    },
  });
  const commentDelete = (id: number) => {
    delComment.mutate(id);
  };
  const commentEdit = (id: number) => {
    const payload = [id, newComment];
    putComment.mutate(payload);
  };

  return (
    <>
      {isClicked === false ? (
        <div className="commentContainer">
          <div className="header">
            <div className="info">
              <div>{nickname}</div>
              <div> {createAt}</div>
            </div>
            <div className="btn">
              {userNickname === nickname ? (
                <>
                  <button onClick={() => commentDelete(commentId)}>삭제</button>
                  <button onClick={() => setIsClicked(true)}>수정</button>
                </>
              ) : null}
            </div>
          </div>
          <div className="body">
            {}
            <div>{comment}</div>
          </div>
        </div>
      ) : (
        <div className="commentContainer">
          <div className="header">
            <div className="info">
              <div>{nickname}</div>
              <div> {createAt}</div>
            </div>
            <div className="btn">
              {userNickname === nickname ? (
                <>
                  <button onClick={() => commentEdit(commentId)}>
                    수정완료
                  </button>
                </>
              ) : null}
            </div>
          </div>
          <div className="body">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Comment;
