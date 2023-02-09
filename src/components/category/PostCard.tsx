import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { changeLikePost } from "../../APIs/communityBoardApi";
import { IAllPosts } from "../../types/postType";

type postProps = {
  post: IAllPosts; // 부모컴포넌트에서 import 해온 타입을 재사용 해 줍시다.
  padding?: string;
  location?: number;
};

const PostCard = ({ post, padding, location }: postProps) => {
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

  // 연도 제외, 월일만 나오도록!!!
  const createTime = post.createAt.slice(11, 16);

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
      padding={padding}
      width={post.imgUrl ? "236px" : "100%"}
    >
      <div className="wrap">
        <p className="title">{post.title}</p>
        <p className="content">
          {post.content}
          {/* {post?.content?.length >= 19
            ? `${post?.content.slice(0, 19)}...`
            : post?.content} */}
          {/* {post?.content?.slice(0, 20)} */}
        </p>
        <UnderInfo>
          <p>
            {post.createAt.slice(5, 7)}/{post.createAt.slice(8, 10)}{" "}
            {createTime}
          </p>
          <div className="underWrap">
            <div className="detailWrap">
              <img
                className="comment"
                src="/image/iconComment.svg"
                alt="댓글"
              />
              <div>{post.commentCount}</div>
            </div>
            <div className="detailWrap">
              {post.likePost ? (
                <img
                  className="heart"
                  src="/image/iconRedHeart.svg"
                  alt="하트 "
                />
              ) : (
                <img
                  className="heart"
                  src="/image/iconEmptyHeart.svg"
                  alt="하트 "
                />
              )}

              <div>{post.postLikeNum}</div>
            </div>
          </div>
        </UnderInfo>
      </div>
      {post.imgUrl ? (
        <img className="profileImage" alt="이미지" src={post.imgUrl} />
      ) : null}
    </STContainer>
  );
};
const STContainer = styled.div<{
  padding: string | undefined;
  width: string;
}>`
  /* width: 341.24px; */
  width: 100%;
  padding: ${(props) => (props.padding ? props.padding : null)};
  height: 105px;
  border-bottom: 0.5px solid #d9d9d9;
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  padding-bottom: 15px;
  cursor: pointer;

  .wrap {
    // width: 100%;
    // width: 236px;
    width: ${(props) => props.width};
    height: 90;
    .title {
      width: 100%;
      height: 22px;
      font-style: normal;
      font-weight: 500;
      font-size: 15px;
      line-height: 22px;
      margin: 9px 0px 9px 0px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .content {
      width: 100%;
      font-style: normal;
      font-weight: 400;
      font-size: 13px;
      line-height: 18px;
      color: #545456;
      margin: 9px 0px 9px 0px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .profileImage {
    width: 90px;
    height: 90px;
    border-radius: 8px;
    object-fit: cover;
  }
`;

const UnderInfo = styled.div`
  // width: 100%;
  // min-width: 235px;
  height: 21px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 11px;
  margin-top: 15px;
  margin-right: 5px;

  .underWrap {
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
