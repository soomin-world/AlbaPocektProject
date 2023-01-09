import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { changeLikePost } from "../../APIs/communityBoard";
import { deletePost, getPost } from "../../APIs/detailPostApi";

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery(["post", id], () =>
    getPost(id)
  );
  const queryClient = useQueryClient();
  const [likePost, setLikePost] = useState<boolean>(false);
  const [postLikeNum, setPostLikeNum] = useState<number>(0);

  useEffect(() => {
    if (data) {
      setLikePost(data.postLike);
      setPostLikeNum(data.postLikeNum);
    }
  }, [data]);
  const myId = localStorage.getItem("userId");

  const mutatelike = useMutation(changeLikePost, {
    onSuccess: () => {
      queryClient.invalidateQueries(["post"]);
    },
  });
  const mutatedelete = useMutation(deletePost);

  const deleteHandler = () => {
    mutatedelete.mutate(id);
    alert("삭제되었습니다!");
    navigate("/board");
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error!!!!!!</div>;

  const onClickLikeHandler = () => {
    if (likePost) {
      setPostLikeNum(postLikeNum - 1);
    } else {
      setPostLikeNum(postLikeNum + 1);
    }
    setLikePost(!likePost);
    mutatelike.mutate(Number(id));
  };
  return (
    <SContainer className="detailContainer">
      <div className="header">
        <div className="title">
          <h1>{data.title}</h1>
        </div>
        <div className="info">
          <div className="userInfo">
            <img src={data.profileImage} alt="유저프로필사진" />
            <span>{data.nickname}</span>
          </div>
          <div className="timeline">
            <span>{data.createAt.substr(2, 8)}</span>
          </div>
          {data.userId === myId ? (
            <div className="btn">
              <button onClick={() => navigate(`/posting/${id}`)}>수정</button>
              <button onClick={deleteHandler}>삭제</button>
            </div>
          ) : null}
        </div>
      </div>
      <div className="body">
        <div className="imageBox">
          <img src={data.imgUrl} alt="유저업로드 사진입니다" />
        </div>
        <div className="contentArea">
          <div className="contentBody">{data.content}</div>
        </div>
      </div>
      <div className="like">
        <span
          onClick={() => {
            onClickLikeHandler();
          }}
        >
          {data.likePost === true ? "❤️" : "🤍"}
        </span>
        <span>{data.postLikeNum}</span>
      </div>
    </SContainer>
  );
}

const SContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 5%;
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
      font-size: 2rem;
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
      margin-left: 40px;
      .contentBody {
        font-size: 20px;
      }
    }
  }
  .like {
    border: 1px solid grey;
    display: flex;
    justify-content: flex-end;
    padding-right: 10px;
  }
`;

export default PostDetail;
