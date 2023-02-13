import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { QueryClient } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { addComment } from "../../APIs/detailPostApi";
import sweetAlert from "../../util/sweetAlert";

const CommentPost = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [comment, setComment] = useState("");

  const postComment = useMutation(addComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(["comment", id]);
    },
  });

  const postCommentHandler = (e: any) => {
    e.preventDefault();
    const payload = [id, comment];
    if (comment) {
      postComment.mutateAsync(payload).then((res) => {
        sweetAlert(1000, "success", "댓글이 등록되었습니다!");
      });
    } else {
      sweetAlert(1000, "error", "댓글을 입력해주세요!");
    }
    setComment("");
  };

  return (
    <>
      <STContainer>
        <form onSubmit={postCommentHandler}>
          <input
            maxLength={100}
            placeholder="댓글을 작성해주세요. (100자 이내)"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button>등록</button>
        </form>
      </STContainer>
    </>
  );
};

const STContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 5px 5% 5px 5%;
  width: 100%;
  border-top: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;

  form {
    display: flex;
    justify-content: space-between;
    input {
      font-family: "Noto Sans KR";
      width: 100%;
      height: 30px;
      border: none;
      outline: none;
    }
    button {
      font-family: "Noto Sans KR";
      width: 50px;
      height: 30px;
      border: none;
      background-color: white;
      cursor: pointer;
      // color: #5fce80;
    }
  }
`;

export default CommentPost;
