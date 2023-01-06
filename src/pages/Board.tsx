import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
  Outlet,
  Route,
  Routes,
  useMatch,
  useNavigate,
  useParams,
} from "react-router-dom";
import styled from "styled-components";
import { getAllPosts } from "../APIs/communityBoard";
import { IAllPosts } from "../types/postType";

type TotalProps = {
  children: JSX.Element | JSX.Element[];
};

const Board = () => {
  const navigate = useNavigate();
  const boardMatch = useMatch("/board");
  const [state, setState] = useState([]);

  // const { id } = useParams();

  // console.log(id);
  // const { isLoading, isError, data } = useQuery({
  //   queryKey: ["allPosts"],
  //   queryFn: getAllPosts,
  //   onSuccess: (data) => {
  //     console.log(data);
  //     setState(data);
  //   },
  // });
  const { isLoading, isError, data } = useQuery<IAllPosts[]>(["allPosts"], () =>
    getAllPosts()
  );
  // useEffect(() => {
  //   getAllPosts();
  // }, [data]);
  // console.log(data);
  // console.log(isLoading);

  return (
    <>
      <Navigate>
        <Select
          onChange={(e) => {
            console.log(e.target.value);
            navigate(`/board/${e.target.value}`);
          }}
        >
          <option key="all" value="">
            전체
          </option>
          <option key="free" value="free">
            자유게시판
          </option>
          <option key="partTime" value="partTime">
            알바고민 게시판
          </option>
          <option key="cover" value="cover">
            대타 구해요 게시판
          </option>
        </Select>
      </Navigate>
      <Outlet></Outlet>
      {/* {isLoading ? <div>로딩중</div> : null} */}
      {isError ? <div>애러 뜸</div> : null}
      {boardMatch === null
        ? null
        : data?.map((post) => {
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
      {/* <PostCard>
        <PostCardProfile>
          <img src="https://pbs.twimg.com/profile_images/1374979417915547648/vKspl9Et_400x400.jpg" />
          <PostCardProfileInfo>
            <div>nickname</div>
            <div>01-06</div>
          </PostCardProfileInfo>
        </PostCardProfile>
        <PostCardContent>
          <p>
            주말알바 고민있어요!주말알바 고민있어요!주말알바 고민있어요!주말알바
            고민있어요!
          </p>
          <img src="https://pbs.twimg.com/profile_images/1374979417915547648/vKspl9Et_400x400.jpg" />
          <Heart>❤️ 10</Heart>
        </PostCardContent>
      </PostCard> */}
    </>
  );
};
const Total = styled.div<{ props: TotalProps }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Navigate = styled.div`
  width: 100%;
  height: 60px;
  border: 2px solid black;
  display: flex;
  align-items: center;
  padding-left: 10px;
`;

const Select = styled.select`
  width: 150px;
  height: 30px;
`;
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

const PostCardList = styled.div``;
export default Board;
