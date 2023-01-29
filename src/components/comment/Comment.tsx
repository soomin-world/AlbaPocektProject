import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
  changeLikeComment,
  deleteComment,
  editComment,
} from "../../APIs/detailPostApi";
import { CommentType } from "../../types/postType";
import LayOut from "../layout/LayOut";

const Comment: React.FC<CommentType> = (props) => {
  const myId = localStorage.getItem("userId");
  const [isClicked, setIsClicked] = useState(false);
  const queryClient = useQueryClient();
  const {
    userId,
    commentId,
    comment,
    nickname,
    commentLikeNum,
    likeComment,
    createAt,
    profileImage,
  } = props;
  const [like, setLike] = useState(likeComment);
  const [likeNum, setLikeNum] = useState(commentLikeNum);
  console.log("댓글 좋아요", likeComment, commentLikeNum);

  console.log(typeof createAt);
  const { id } = useParams();
  const [commentClick, setCommentClick] = useState(false);
  const [newComment, setNewComment] = useState(comment);
  const delComment = useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(["comment", id]);
    },
  });
  const putComment = useMutation(editComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(["comment", id]);
    },
  });

  //-----------------
  const commentDelete = (id: number) => {
    delComment.mutate(id);
    alert("삭제되었습니다");
  };
  const commentEdit = (id: number) => {
    const payload = [id, newComment];
    putComment.mutate(payload);
    setIsClicked(false);

    alert("수정되었습니다");
  };
  const mutatelike = useMutation(changeLikeComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(["post"]);
    },
  });

  const onClickLikeHandler = () => {
    if (like) {
      setLikeNum(likeNum - 1);
    } else {
      setLikeNum(likeNum + 1);
    }
    setLike(!like);
    mutatelike.mutateAsync(commentId);
  };

  const onCommentClick = () => {
    setCommentClick(!commentClick);
  };

  console.log(like);
  return (
    <>
      {isClicked === false ? (
        <STContainer>
          <div className="header">
            <div className="info">
              <img src={profileImage} />
              <div className="userInfo">
                <div>{nickname}</div>
                <div>{createAt.substring(5, 10)}</div>
              </div>
            </div>
            <div className="btn">
              {myId === userId ? (
                <>
                  {commentClick ? (
                    <>
                      <button onClick={() => commentDelete(commentId)}>
                        삭제
                      </button>
                      <button onClick={() => setIsClicked(true)}>수정</button>
                    </>
                  ) : (
                    <img
                      src="/image/iconDotsMono.png"
                      alt=":"
                      onClick={onCommentClick}
                    />
                  )}
                </>
              ) : null}
            </div>
          </div>
          <div className="body">
            <div className="comment">{comment}</div>
            <div className="like">
              <span
                onClick={() => {
                  onClickLikeHandler();
                }}
              >
                {like === true ? (
                  <img src="/image/iconRedHeart.png" />
                ) : (
                  <img src="/image/iconMiniHeart.png" />
                )}
              </span>
              <span>{likeNum}</span>
            </div>
          </div>
        </STContainer>
      ) : (
        <STContainer>
          <div className="editbody">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            {myId === userId ? (
              <div className="btn">
                <button onClick={() => commentEdit(commentId)}>수정완료</button>
                <button onClick={() => setIsClicked(false)}>취소</button>
              </div>
            ) : null}
          </div>
        </STContainer>
      )}
    </>
  );
};

const STContainer = styled.div`
  padding: 5%;
  padding-bottom: 2%;
  border-bottom: 1px solid #d9d9d9;
  .editbody {
    display: flex;
    justify-content: space-between;
    input {
      width: 80%;
    }
    button {
      border: none;
      display: flex;
      background-color: transparent;
      font-size: 12px;
      cursor: pointer;
    }
  }
  .header {
    display: flex;
    justify-content: space-between;
    font-size: 15px;

    .info {
      display: flex;
      margin-right: 10px;

      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: gray;
        object-fit: cover;
      }
    }
    .userInfo {
      font-size: 13px;
      font-weight: 400;
      margin-left: 5px;

      div:last-child {
        font-size: 10px;
        color: #aeaeae;
        margin-top: 2px;
      }
    }
    .btn {
      img {
        width: 15px;
        height: 15px;
        padding-top: 2px;
      }
      button {
        border: none;
        background-color: #fbfbfb;
        font-size: 10px;
        cursor: pointer;
      }
    }
  }
  .body {
    padding: 7px 0px 7px 35px;
    font-size: 13px;
    font-weight: 400;
    width: 335px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .comment {
    width: 60%;
  }
  .like {
    width: 44px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #d9d9d9;
    border-radius: 3px;
    background-color: white;
    span {
      width: 13px;
      height: 13px;
      font-size: 13px;
      margin-left: 5px;
      margin-bottom: 3px;
    }
    img {
      width: 13px;
      height: 13px;
      margin-top: 2px;
    }
  }
`;
export default Comment;
