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
            placeholder="댓글을 작성하세요"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button>댓글 작성</button>
        </form>
      </STContainer>
    </>
  );
};

const STContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0% 10% 5% 10%;
  width: 90%;
  margin-left: 10%;
  form {
    display: flex;
    justify-content: space-between;
    input {
      width: 85%;
      height: 30px;
    }
    button {
    }
  }
`;

export default CommentPost;
