import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { changeLikePost } from "../../APIs/communityBoardApi";
import { deletePost, getPost } from "../../APIs/detailPostApi";

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery(["post", id], () =>
    getPost(id)
  );
  console.log(data);
  const queryClient = useQueryClient();
  const [likePost, setLikePost] = useState<boolean>(data?.likePost);
  const [postLikeNum, setPostLikeNum] = useState<number>(data?.postLikeNum);

  // console.log(likePost, postLikeNum);

  // useEffect(() => {
  //   if (data) {
  //     setLikePost(data.postLike);
  //     setPostLikeNum(data.postLikeNum);
  //   }
  // }, [data]);

  const myId = localStorage.getItem("userId");

  const mutatelike = useMutation(changeLikePost, {
    onSuccess: () => {
      queryClient.invalidateQueries(["post"]);
      queryClient.invalidateQueries(["categoryPosts"]);
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
        <img src={data.profileImage} alt="유저프로필사진" />
        <div className="info">
          <div className="userInfo">
            <div>{data.nickname}</div>
            <div>{data.createAt.substr(5, 5)}</div>
          </div>

          {data.userId === myId ? (
            <div>
              <img src="/image/iconDotsMono.png" className="btn" />
              {/* <button onClick={() => navigate(`/posting/${id}`)}>수정</button>
              <button onClick={deleteHandler}>삭제</button> */}
            </div>
          ) : null}
        </div>
      </div>
      <div className="body">
        <div className="title">
          <h1>{data.title}</h1>
        </div>
        <div className="contentArea">
          <div className="contentBody">{data.content}</div>
        </div>
        <div className="imageBox">
          <img src={data.imgUrl} alt="유저업로드 사진입니다" />
        </div>
      </div>
      <div className="like">
        <span onClick={onClickLikeHandler}>
          {data.likePost === true ? (
            <img src="/image/iconRedHeart.png" />
          ) : (
            <img src="/image/iconMiniHeart.png" />
          )}
        </span>
        <span>좋아요 {data.postLikeNum}</span>
      </div>
    </SContainer>
  );
}

const SContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 5%;
  padding-bottom: 0;
  width: 100%;

  .header {
    display: flex;
    .info {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
    img {
      width: 47px;
      height: 47px;
      border-radius: 50%;
      object-fit: cover;
      margin-right: 5px;
    }
    .userInfo {
      margin-left: 5px;
      div:first-child {
        font-size: 16px;
        font-weight: 400;
        margin-top: 8px;
        margin-bottom: 3px;
      }
      div:nth-child(2) {
        font-size: 13px;
        font-weight: 400;
        color: #aeaeae;
      }
    }
    .btn {
      width: 20px;
      height: 20px;
      margin-top: 8px;
    }
  }
  .body {
    padding-top: 15px;
    .imageBox {
      width: 100%;
      display: flex;
      justify-content: center;
      margin-top: 10px;
      img {
        width: 100%;
        border-radius: 10px;
      }
    }
    .contentArea {
      width: 100%;
      .contentBody {
        font-size: 15px;
        font-weight: 400;
      }
    }
    .title {
      width: 100%;
      font-size: 24px;
      font-weight: 400;
      margin-bottom: 10px;
    }
  }
  .like {
    display: flex;
    align-items: center;
    padding: 10px 0px 10px 0px;
    img {
      width: 17px;
      height: 17px;
      margin-right: 2px;
    }
    span {
      font-size: 15px;
      font-weight: 400;
    }
  }
`;

export default PostDetail;
