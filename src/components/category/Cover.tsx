import { useQuery } from "react-query";
import styled from "styled-components";
import { getPosts } from "../../APIs/communityBoard";
import { IAllPosts } from "../../types/postType";

const Cover = () => {
  const { isLoading, isError, data } = useQuery<IAllPosts[]>(
    ["categoryPosts"],
    () => getPosts("cover")
  );
  console.log(data);
  return (
    <div>
      {data?.map((post) => {
        console.log(post);
        return (
          <PostCard key={post.postId}>
            <PostCardProfile>
              <img src={post.profileImage} />
              <PostCardProfileInfo>
                <div>{post.nickname}</div>
                <div>01-06</div>
              </PostCardProfileInfo>
            </PostCardProfile>
            <PostCardContent>
              <p>{post.content}</p>
              <img src={post.imgUrl} />
              <Heart>❤️ {post.postLikeNum}</Heart>
            </PostCardContent>
          </PostCard>
        );
      })}
    </div>
  );
};

const PostCard = styled.div`
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

export default Cover;
