import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { changeLikePost } from "../../APIs/communityBoardApi";
import { IAllPosts } from "../../types/postType";

type postProps = {
  post: IAllPosts; // 부모컴포넌트에서 import 해온 타입을 재사용 해 줍시다.
};

const PostCard = ({ post }: postProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [likePost, setLikePost] = useState(post.likePost);
  const [postLikeNum, setPostLikeNum] = useState(post.postLikeNum);
  const mutatelike = useMutation(changeLikePost, {
    onSuccess: () => {
      queryClient.invalidateQueries(["post"]);
      queryClient.invalidateQueries(["categoryPosts"]);
    },
  });

  const onClickHeartHandler = () => {
    if (likePost) {
      setPostLikeNum(postLikeNum - 1);
    } else {
      setPostLikeNum(postLikeNum + 1);
    }
    setLikePost(!likePost);
    mutatelike.mutate(post.postId);
  };
  return (
    <PostCardBox
      key={post.postId}
      onClick={() => {
        navigate(`/post/${post.postId}`);
      }}
    >
      {/* <PostCardProfile>
        <img src={post.profileImage} alt="프로필사진" />
        <PostCardProfileInfo>
          <div>{post.nickname}</div>
          <div>01-06</div>
        </PostCardProfileInfo>
      </PostCardProfile> */}

      <div>
        <p>{post.title}</p>
        <p>{post.content}</p>

        <Heart>
          <div>
            <img
              src="/image/iconMiniHeart.png"
              onClick={() => {
                onClickHeartHandler();
              }}
            />
          </div>
          <div>{postLikeNum}</div>

          {/* <img src="/image/iconChatBubble.png" />
          <span>{postLikeNum}</span> */}
        </Heart>
      </div>

      <img alt="이미지" src={post.imgUrl} />
    </PostCardBox>
  );
};
const PostCardBox = styled.div`
  height: 120px;
  border-bottom: 1px solid #d9d9d9;
  margin: auto;
  padding: 15px;
  display: flex;
  position: relative;

  p {
    width: 235px;
    font-size: 13px;
    margin: 9px 0px 9px 0px;
  }
  p:first-child {
    font-size: 15px;
    font-weight: 500;
  }

  img {
    width: 90px;
    height: 90px;
    object-fit: cover;
    border-radius: 10px;
    position: absolute;
    right: 15px;
  }
`;

const Heart = styled.div`
  width: 100px;
  height: 13px;
  position: absolute;
  bottom: 15px;
  right: 120px;
  margin-top: 10px;

  display: flex;
  justify-content: space-between;

  img {
    width: 13px;
    height: 13px;
    margin-right: -2px;
  }
  div {
    font-size: 13px;
  }
`;

export default PostCard;
