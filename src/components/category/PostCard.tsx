import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
  const [likePost, setLikePost] = useState(() => post.likePost);
  const [postLikeNum, setPostLikeNum] = useState(() => post.postLikeNum);
  const mutatelike = useMutation(changeLikePost, {
    onSuccess: () => {
      queryClient.invalidateQueries(["post"]);
      queryClient.invalidateQueries(["categoryPosts"]);
    },
  });
  const createTime = post.createAt.substring(0, 10);
  console.log(createTime);
  const time = post.createAt.substring(11, 16);
  console.log(time);
  const onClickHeartHandler = () => {
    if (likePost) {
      setPostLikeNum((postLikeNum) => postLikeNum - 1);
    } else {
      setPostLikeNum((postLikeNum) => postLikeNum + 1);
    }
    setLikePost(!likePost);
    mutatelike.mutate(post.postId);
  };

  return (
    <STContainer
      key={post.postId}
      onClick={() => {
        navigate(`/post/${post.postId}`);
      }}
    >
      <div className="wrap">
        <p className="title">{post.title}</p>
        <p className="content">{post.content}</p>
        <UnderInfo>
          <p>
            {createTime} {time}
          </p>
          <div className="underWrap">
            <div className="detailWrap">
              <img className="comment" src="/image/comment.png" alt="댓글" />
              <div>{post.commentCount}</div>
            </div>
            <div className="detailWrap">
              <img
                className="heart"
                src="/image/iconMiniHeart.png"
                alt="하트 "
              />
              <div>{postLikeNum}</div>
            </div>
          </div>
        </UnderInfo>
      </div>
      <img className="profileImage" alt="이미지" src={post.imgUrl} />
    </STContainer>
  );
};
const STContainer = styled.div`
  width: 341.24px;
  height: 105px;
  padding-bottom: 15px;
  border-bottom: 0.5px solid #d9d9d9;
  display: flex;
  margin-bottom: 15px;
  .wrap {
    width: 236px;
    height: 90;
    .title {
      width: 100%;
      height: 22px;
      font-style: normal;
      font-weight: 500;
      font-size: 15px;
      line-height: 22px;
      margin-bottom: 5px;
    }
    .content {
      width: 235px;
      min-height: 36px;
      font-style: normal;
      font-weight: 400;
      font-size: 13px;
      line-height: 18px;
      display: flex;
      align-items: center;
      color: #545456;
      margin-bottom: 15px;
    }
  }
  .profileImage {
    width: 90px;
    height: 90px;
    border-radius: 8px;
  }
`;

const UnderInfo = styled.div`
  width: 235px;
  height: 21px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 11px;
  .underWrap {
    margin-right: 5px;
    display: flex;
    gap: 5px;
    .detailWrap {
      display: flex;
      gap: 5px;
      line-height: 21px;
      img {
        margin-top: 5.5px;
        width: 11px;
        height: 11px;
      }
    }
  }
`;
export default PostCard;
