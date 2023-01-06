import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getPost } from "../../APIs/detailPostApi";
import CommentList from "../comment/CommentList";
import CommentPost from "../comment/CommentPost";

function PostDetail() {
  const { id } = useParams();
  const { data, isError, isLoading } = useQuery(["post", id], () =>
    getPost(id)
  );
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error!!!!!!</div>;
  console.log(data.data);
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
  width: 80%;
  margin-left: 10%;
  .header {
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    .info {
      display: flex;
      justify-content: space-between;
    }
    .title {
      margin-right: 70px;
      width: 100%;
      font-size: 60px;
    }
    img {
      margin-right: 5px;
      width: 15px;
      height: 15px;
      border-radius: 100px;
    }
    span {
      font-size: 15px;
    }
  }
  .body {
    border: 1px solid black;
    padding: 20px;
    margin-bottom: 40px;
    .imageBox {
      width: 100%;
      display: flex;
      justify-content: center;
      margin: 30px 0px 50px 0px;
      img {
        width: 50%;
      }
    }
    .contentArea {
      width: 100%;
      margin-bottom: 50px;
      margin-left: 40px;
      .contentBody {
        font-size: 20px;
      }
    }
  }
`;

export default PostDetail;
