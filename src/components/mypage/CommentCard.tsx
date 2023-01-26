import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { allMyCommentAtom, myCommentDeleteAtom } from "../../atoms";
import { CommentType } from "../../types/postType";

interface IComment {
  comment: CommentType;
}

const CommentCard = ({ comment }: IComment) => {
  const navigate = useNavigate();
  const [onClick, setOnClick] = useState(false);
  // const [onClickAll, setOnClickAll] = useRecoilState(allMyCommentAtom);
  const [deleteList, setDeleteList] = useRecoilState(myCommentDeleteAtom);

  useEffect(() => {
    console.log(deleteList);
    for (const commentId of deleteList) {
      if (commentId === comment.commentId) {
        setOnClick(true);
      }
    }
  }, [deleteList]);

  // console.log(comment);
  return (
    <Comment>
      {onClick ? (
        <img
          src="/image/iconFullCheck.png"
          onClick={() => {
            setOnClick(false);
            const copy = deleteList.filter((commentId) => {
              return commentId !== comment.commentId;
            });
            setDeleteList([...copy]);
            // console.log(deleteList);
          }}
        />
      ) : (
        <img
          src="/image/iconEmptyCheck.png"
          onClick={() => {
            setOnClick(true);
            setDeleteList([...deleteList, comment.commentId]);
            // console.log(deleteList);
          }}
        />
      )}

      <CommentText
        onClick={() => {
          navigate(`/post/${comment.postId}`);
        }}
      >
        <div className="first">
          {comment.comment}
          {/* 제 일도 아닌데 너무 억울하네요.제 일도 아닌데 너무 억울하네요.제 일도
          아닌데 너무 억울하네요. */}
        </div>

        <CommentInfo>
          <div>
            {comment.createAt.slice(5, 10)} {comment.createAt.slice(11, 16)}
          </div>
          {comment.likeComment ? (
            <img src="/image/iconRedHeart.png" />
          ) : (
            <img src="/image/iconMiniHeart.png" />
          )}
          {/* <img src="/image/iconRedHeart.png" /> */}
          <div>1</div>
        </CommentInfo>

        <div>{comment.title}</div>
      </CommentText>
    </Comment>
  );
};

const Comment = styled.div`
  width: 100%;
  height: 94px;
  border-bottom: 1px solid #d9d9d9;
  display: flex;
  padding: 0px 15px 15px 15px;
  margin-bottom: 15px;

  img {
    width: 15px;
    height: 15px;
    margin-right: 15px;
  }
`;

const CommentText = styled.div`
  width: 315px;
  font-size: 13px;
  font-weight: 400;

  .first {
    height: 39px;
    line-height: 150%;
    margin-top: -3px;
  }
  div:nth-child(2) {
    margin: 5px 0px 5px 0px;
  }
  div:last-child {
    color: #aeaeae;
  }
`;

const CommentInfo = styled.div`
  display: flex;
  align-items: center;
  color: #aeaeae;

  div {
    margin-right: 10px;
  }
  img {
    width: 13px;
    height: 13px;
    margin-right: 3px;
  }
`;

export default CommentCard;
