import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { changeLikePost } from "../../APIs/communityBoardApi";
import { deletePost, getPost } from "../../APIs/detailPostApi";
import DropDown from "../dropDown/DropDown";

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
  const [isOpen, setIsOpen] = useState(false);
  const createTime = data?.createAt.substr(14, 5);
  console.log(createTime);
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

  const dropDownHandler = () => {
    setIsOpen(!isOpen);
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
        <img src={data.profileImage} alt="유저프로필사진" className="profile" />
        <div className="info">
          <div className="userInfo">
            <div>{data.nickname}</div>
            <div>
              {data.createAt.substr(5, 5)} -{createTime}
            </div>
          </div>
          {data.userId === myId ? (
            <div className="dropDown">
              <img
                src="/image/iconDotsMono.png"
                alt=":"
                className="button"
                onClick={() => setIsOpen(!isOpen)}
              />
              {isOpen ? (
                <DropDown
                  id={data.postId}
                  open={isOpen}
                  close={dropDownHandler}
                  address={`/posting/${data.postId}`}
                  deleteValue={"post"}
                />
              ) : null}
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
        <div onClick={onClickLikeHandler}>
          {data.likePost === true ? (
            <img src="/image/iconRedHeart.png" alt="heart" />
          ) : (
            <img src="/image/iconMiniHeart.png" alt="miniHeart" />
          )}
        </div>
        <span>좋아요 {data.postLikeNum}</span>

        <div>
          <img src="/image/iconChatBubble.png" alt="heart" />
        </div>
        <span>댓글 {data.commentCount}</span>
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
      .dropDown {
        .button {
          width: 24px;
          height: 24px;
        }
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
    }
    .profile {
      width: 47px;
      height: 47px;
      border-radius: 50%;
      object-fit: cover;
      margin-right: 5px;
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

    div {
      width: 17px;
      height: 17px;
      margin-right: 3px;
    }
    img {
      width: 17px;
      height: 17px;
      margin-right: 2px;
    }
    span {
      font-size: 15px;
      font-weight: 400;
      margin-right: 14px;
    }
  }
`;

export default PostDetail;
