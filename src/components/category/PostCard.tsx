import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { changeLikePost } from "../../APIs/communityBoardApi";
import { getComments } from "../../APIs/detailPostApi";
import { IAllPosts } from "../../types/postType";

type postProps = {
  post: IAllPosts; // 부모컴포넌트에서 import 해온 타입을 재사용 해 줍시다.
};

const PostCard = ({ post }: postProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [likePost, setLikePost] = useState(() => post.likePost);
  const [postLikeNum, setPostLikeNum] = useState(() => post.postLikeNum);
  const { data } = useQuery(["comment", post.postId], () =>
    getComments(post.postId)
  );
  console.log(data);
  const mutatelike = useMutation(changeLikePost, {
    onSuccess: () => {
      queryClient.invalidateQueries(["post"]);
      queryClient.invalidateQueries(["categoryPosts"]);
    },
  });
  const createTime = post.createAt.substring(0, 10);
  console.log(createTime);
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
        <p>{post.title}</p>
        <p>{post.content}</p>

        {/* <p style={{ marginTop: "28px" }}>{createTime}</p> */}

        <Heart>
          <img className="comment" src="/image/comment.png" alt="댓글" />
          <div>{data?.length}</div>

          {post.likePost ? (
            <img className="heart" src="/image/iconRedHeart.png" alt="하트 " />
          ) : (
            <img className="heart" src="/image/iconMiniHeart.png" alt="하트 " />
          )}

          <div>{post.postLikeNum}</div>


          <Heart>
            <div className="commentWrap">
              <img className="comment" src="/image/comment.png" alt="댓글" />
              <div>{data?.length}</div>
            </div>
            <div className="heartWRap">
              <img
                className="heart"
                src="/image/iconMiniHeart.png"
                alt="하트 "
                onClick={() => {
                  onClickHeartHandler();
                }}
              />
              <div>{postLikeNum}</div>
            </div>
            {/* <img src="/image/iconChatBubble.png" />
          <span>{postLikeNum}</span> */}
          </Heart>
        </div>
      </div>

      <img alt="이미지" src={post.imgUrl} />
    </STContainer>
  );
};
const STContainer = styled.div`
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
  .image {
    width: 90px;
    height: 90px;
    object-fit: cover;
    border-radius: 10px;
    position: absolute;
    right: 15px;
  }
`;

const Heart = styled.div`
  width: 50px;
  height: 15px;
  /* position: absolute;
  bottom: 15px;
  right: 120px; */
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  gap: 5px;
  margin-right: 5px;
  font-size: 13px;
  img {
    width: 13px;
    height: 13px;
  }
  /* .heart {
    width: 13px;
    height: 13px;
    margin-right: -2px;
  }
  .comment {
    width: 13px;
    height: 13px;
    margin-right: 100px;
  }
  div {
    font-size: 13px;
  } */
`;
export default PostCard;
