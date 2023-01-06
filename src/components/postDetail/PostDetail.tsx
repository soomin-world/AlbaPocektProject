import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getPost } from "../../api/detailPostApi";
import CommentList from "../comment/CommentList";
import CommentPost from "../comment/CommentPost";

function PostDetail() {
  const { id } = useParams();
  const { data, isError, isLoading } = useQuery(["post", id], () =>
    getPost(id)
  );
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error!!!!!!</div>;

  return (
    <SContainer className="detailContainer">
      <div className="header">
        <div className="title">
          <h1>{data.data.title}</h1>
        </div>
        <div className="info">
          <div className="userInfo">
            <img
              src="https://velog.velcdn.com/images/ojudge/post/124c9204-dd77-44dd-96c6-b63b7e6db60c/image.PNG"
              alt="유저프로필사진"
            />
            <span>{data.data.nickname}</span>
          </div>
          <div className="timeline">
            <span>{data.data.createAt}</span>
          </div>
        </div>
      </div>
      <div className="body">
        <div className="imageBox">
          <img src={data.data.imgUrl} alt="유저업로드 사진입니다" />
        </div>
        <div className="contentArea">
          <div className="contentBody">{data.data.content}</div>
        </div>
      </div>
      <CommentPost />
      <CommentList />
    </SContainer>
  );
}

const SContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 10%;
`;

export default PostDetail;
