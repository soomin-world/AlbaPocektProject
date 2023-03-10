import { FrownOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Modal } from "antd";
import { useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { createChatRoom } from "../../APIs/chatApi";
import {
  changeLikeComment,
  deleteComment,
  editComment,
} from "../../APIs/detailPostApi";
import { otherNickName } from "../../atoms";
import { CommentType } from "../../types/postType";
import sweetAlert from "../../util/sweetAlert";
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
  const [otherNickname, setOtherNickName] = useRecoilState(otherNickName);
  const { id } = useParams();
  const navigate = useNavigate();
  const [commentClick, setCommentClick] = useState(false);
  const [newComment, setNewComment] = useState(comment);

  const delComment = useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(["comment", id]);
    },
  });

  const putComment = useMutation(editComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(["comment"]);
    },
  });
  const { confirm } = Modal;
  const showConfirm = (id: number) => {
    confirm({
      title: "댓글삭제",
      icon: <FrownOutlined />,
      content: "정말 삭제하시겠습니까?",
      onOk() {
        commentDelete(id);
      },
      onCancel() {},
      okText: "네",
      cancelText: "아니요!",
      centered: true,
      okButtonProps: { danger: true, type: "text" },
      cancelButtonProps: { type: "text" },
    });
  };
  //-----------------
  const commentDelete = (id: number) => {
    delComment.mutate(id);
  };

  const commentEdit = (id: number) => {
    const payload = [id, newComment];
    putComment.mutate(payload);
    setIsClicked(false);
    sweetAlert(1000, "success", "수정되었습니다");
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
    mutatelike
      .mutateAsync(commentId)
      .then((res) => queryClient.invalidateQueries(["comment", id]));
  };

  const { mutateAsync } = useMutation(createChatRoom, {
    onSuccess: () => {
      queryClient.invalidateQueries(["chat"]);
    },
  });

  const onCommentClick = () => {
    setCommentClick(!commentClick);
  };

  const onChatHandler = (e: string) => {
    mutateAsync(e).then((roomId) => navigate(`/chat/${roomId}`));
    setOtherNickName(nickname);
  };

  return (
    <>
      {isClicked === false ? (
        <STContainer>
          <div className="header">
            <div className="info">
              <img src={profileImage} alt="프로필이미지" />
              <div className="userInfo">
                <div>
                  <div className="nickname">{nickname}</div>
                  <div className="time">
                    {createAt.slice(5, 7)}/{createAt.slice(8, 10)}{" "}
                    {createAt.slice(11, 16)}
                  </div>
                </div>
                {myId !== userId ? (
                  <button onClick={() => onChatHandler(nickname)}>
                    1:1채팅
                  </button>
                ) : null}
              </div>
            </div>
            <div className="btn">
              {myId === userId ? (
                <>
                  {commentClick ? (
                    <>
                      <button onClick={() => showConfirm(commentId)}>
                        삭제
                      </button>
                      <button onClick={() => setIsClicked(true)}>수정</button>
                    </>
                  ) : (
                    <img
                      src="/image/iconMoreDotsGray.svg"
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
            <div
              className="like"
              onClick={() => {
                onClickLikeHandler();
              }}
            >
              <span
              // onClick={() => {
              //   onClickLikeHandler();
              // }}
              >
                {like === true ? (
                  <img src="/image/iconRedHeart.svg" />
                ) : (
                  <img src="/image/iconEmptyHeart.svg" />
                )}
              </span>
              <span>{likeNum}</span>
            </div>
          </div>
        </STContainer>
      ) : (
        <STContainer>
          <div className="editbody">
            <div className="header">
              <div className="info">
                <img src={profileImage} alt="프로필 사진" />
                <div className="userInfo">
                  <div>
                    <div className="nickname">{nickname}</div>
                    <div className="time">
                      {createAt.slice(5, 7)}/{createAt.slice(8, 10)}{" "}
                      {createAt.slice(11, 16)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="editInput">
              <textarea
                placeholder="댓글을 작성해주세요."
                maxLength={100}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              {myId === userId ? (
                <div className="btn">
                  <button onClick={() => setIsClicked(false)}>취소</button>
                  <button
                    onClick={() => {
                      commentEdit(commentId);
                      setCommentClick(false);
                    }}
                  >
                    등록
                  </button>
                </div>
              ) : null}
            </div>
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
    flex-direction: column;
    .editInput {
      margin-left: 35px;
      width: 90%;
      padding: 5px;
      display: flex;
      border: 1px solid #5fce80;
      border-radius: 8px;
      justify-content: space-between;
      .btn {
        display: flex;
        gap: 4px;
        button:first-child {
          margin-top: 5px;
          background-color: #f2f3f5;
          border: none;
          color: #aeaeae;
          border-radius: 6px;
          width: 44px;
          height: 30px;
          font-size: 13px;
        }
        button:nth-child(2) {
          margin-top: 5px;
          background-color: #5fce80;
          color: white;
          border: none;
          border-radius: 6px;
          width: 44px;
          height: 30px;
          font-size: 13px;
        }
      }
      textarea {
        font-family: "Noto Sans KR";
        min-width: 68%;
        max-width: 68%;
        height: 40px;
        border: none;
        resize: none;
        outline: none;
      }
    }
  }
  .header {
    display: flex;
    justify-content: space-between;
    font-size: 15px;
    margin-bottom: 5px;
    .info {
      display: flex;
      margin-right: 10px;
      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        object-fit: cover;
      }
    }
    .userInfo {
      font-size: 13px;
      font-weight: 400;
      margin-left: 5px;
      display: flex;
      .nickname {
        margin-top: -2px;
      }
      .time {
        font-size: 10px;
        color: #aeaeae;
        margin-top: 2px;
      }
      button {
        margin-left: 5px;
        padding-top: 2px;
        border: none;
        min-width: 44px;
        height: 15px;
        font-size: 11px;
        color: #03b037;
        background-color: #61cd8144;
        border-radius: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .btn {
      margin-top: -2px;
      cursor: pointer;
      img {
        width: 15px;
        height: 15px;
        padding-top: 2px;
      }
      button {
        border: none;
        background-color: #d9d9d972;
        border-radius: 2px;
        font-size: 13px;
        margin-left: 5px;
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
    width: 80%;
    word-break: break-all;
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
    cursor: pointer;

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
