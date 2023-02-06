import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { QueryClient } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { addComment } from "../../APIs/detailPostApi";

const CommentPost = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [comment, setComment] = useState("");
  const postCommentHandler = (e: any) => {
    e.preventDefault();
    const payload = [id, comment];
    if (comment) {
      console.log(payload);
      postComment.mutate(payload);
    } else {
      alert("댓글을 입력해주세요!");
    }
    setComment("");
  };

  const postComment = useMutation(addComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(["comment", id]);
    },
  });
  return (
    <>
      <STContainer>
        <form onSubmit={postCommentHandler}>
          <input
            placeholder="댓글을 작성해주세요"
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
      width: 100%;
      height: 30px;
      border: none;
      outline: none;
    }
    button {
      width: 50px;
      height: 30px;
      border: none;
      background-color: white;
      cursor: pointer;
    }
  }
`;

export default CommentPost;
