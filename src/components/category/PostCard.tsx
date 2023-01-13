import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { changeLikePost } from "../../APIs/communityBoardApi";
import { IAllPosts } from "../../types/postType";

type postProps = {
  post: IAllPosts; // 부모컴포넌트에서 import 해온 타입을 재사용 해 줍시다.
};

const PostCard = ({ post }: postProps) => {
  const navigate = useNavigate();
  const [likePost, setLikePost] = useState(post.likePost);
  const [postLikeNum, setPostLikeNum] = useState(post.postLikeNum);
  const { mutateAsync } = useMutation(changeLikePost);

  const onClickHeartHandler = () => {
    if (likePost) {
      setPostLikeNum(postLikeNum - 1);
    } else {
      setPostLikeNum(postLikeNum + 1);
    }
    setLikePost(!likePost);
    mutateAsync(post.postId);
  };
  return (
    <PostCardBox
      key={post.postId}
      //   onClick={() => {
      //     navigate(`/post/${post.postId}`);
      //   }}
    >
      <PostCardProfile>
        <img src={post.profileImage} alt="프로필사진" />
        <PostCardProfileInfo>
          <div>{post.nickname}</div>
          <div>01-06</div>
        </PostCardProfileInfo>
      </PostCardProfile>
      <PostCardContent>
        <p>{post.content}</p>
        <img
          alt="이미지"
          src={post.imgUrl}
          onClick={() => {
            navigate(`/post/${post.postId}`);
          }}
        />
        <Heart>
          <span
            onClick={() => {
              onClickHeartHandler();
            }}
          >
            {likePost === true ? "❤️" : "🤍"}
          </span>
          <span>{postLikeNum}</span>
        </Heart>
      </PostCardContent>
    </PostCardBox>
  );
};
const PostCardBox = styled.div`
  width: 300px;
  height: 330px;
  border: 2px solid black;
  margin: auto;
  margin-top: 25px;
  border-radius: 10px;
`;

const PostCardProfile = styled.div`
  height: 60px;
  border-bottom: 2px solid black;
  display: flex;
  align-items: center;
  img {
    width: 40px;
    height: 40px;
    object-fit: cover;
    margin: 0px 10px 0px 10px;
    border-radius: 50%;
  }
`;

const PostCardProfileInfo = styled.div``;

const PostCardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    width: 280px;
    margin: 9px 0px 9px 0px;
  }
  img {
    width: 280px;
    height: 170px;
    object-fit: cover;
    border-radius: 10px;
  }
`;

const Heart = styled.div`
  width: 280px;
  margin-top: 10px;
`;
export default PostCard;
