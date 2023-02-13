import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { createChatRoom } from "../../APIs/chatApi";
import { changeLikePost } from "../../APIs/communityBoardApi";
import { deletePost, getPost } from "../../APIs/detailPostApi";
import { otherNickName } from "../../atoms";
import DropDown from "../dropDown/DropDown";
import Header from "../header/Header";

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery(["post", id], () =>
    getPost(id)
  );
  const queryClient = useQueryClient();
  const [likePost, setLikePost] = useState<boolean>(data?.likePost);
  const [postLikeNum, setPostLikeNum] = useState<number>(data?.postLikeNum);
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState("");
  const createTime = data?.createAt.split("T")[1].split(":");
  const [otherNickname, setOtherNickName] = useRecoilState(otherNickName);

  const categoryToKor = (e: string) => {
    if (e === "free") {
      setCategory("자유게시판");
    } else if (e === "cover") {
      setCategory("대타구해요");
    } else if (e === "partTime") {
      setCategory("알바고민");
    }
    return category;
  };

  useEffect(() => {
    data && categoryToKor(data.category);
  }, [data]);

  const myId = localStorage.getItem("userId");

  const { locationId } = useParams();
  console.log(locationId);

  const { mutateAsync } = useMutation(createChatRoom, {
    onSuccess: () => {
      queryClient.invalidateQueries(["chat"]);
    },
  });
  const mutatelike = useMutation(changeLikePost, {
    onSuccess: () => {
      queryClient.invalidateQueries(["post"]);
      queryClient.invalidateQueries(["categoryPosts"]);
    },
  });

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

  const onChatHandler = (e: string) => {
    mutateAsync(e).then((roomId) =>
      navigate(`/chat/${roomId}`, {
        state: {
          postId: id,
        },
      })
    );
    setOtherNickName(data.nickname);
  };

  return (
    <SContainer className="detailContainer">
      <Header
        title={category}
        padding="5% 0 5% 0"
        marginLeft={
          category === "자유게시판"
            ? "110px"
            : category === "알바고민"
            ? "120px"
            : category === "대타구해요"
            ? "110px"
            : "0px"
        }
        location={locationId}
      />
      <div className="header">
        <img src={data.profileImage} alt="유저프로필사진" className="profile" />

        <div className="info">
          <div className="userInfo">
            <div>
              <div className="userNickname">
                <div>{data.nickname}</div>
                {data.userId !== myId ? (
                  <button onClick={() => onChatHandler(data.nickname)}>
                    1:1채팅
                  </button>
                ) : null}
              </div>
              <div>
                {data.createAt.substr(5, 2)}/{data.createAt.substr(8, 2)}{" "}
                {createTime[0] + ":" + createTime[1]}
              </div>
            </div>
          </div>
          {data.userId === myId ? (
            <div className="dropDown">
              <img
                src="/image/iconMoreDotsGray.svg"
                alt=":"
                className="button"
                onClick={() => setIsOpen(!isOpen)}
              />
              {isOpen ? (
                <DropDown
                  id={data.postId}
                  open={isOpen}
                  setIsOpen={setIsOpen}
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
          <div className="contentBody">
            <pre>{data.content}</pre>
          </div>
        </div>
        <div className="imageBox">
          {data.imgUrl ? (
            <img src={data.imgUrl} alt="유저업로드 사진입니다" />
          ) : null}
        </div>
      </div>
      <div className="like">
        <div onClick={onClickLikeHandler}>
          {data.likePost === true ? (
            <img
              src="/image/iconRedHeart.svg"
              alt="heart"
              style={{ cursor: "pointer" }}
            />
          ) : (
            <img
              src="/image/iconEmptyHeart.svg"
              alt="miniHeart"
              style={{ cursor: "pointer" }}
            />
          )}
        </div>
        <span>좋아요 {data.postLikeNum}</span>

        <div>
          <img src="/image/iconComment.svg" alt="heart" />
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
  padding: 0 5%;
  padding-bottom: 0;
  width: 100%;

  .header {
    display: flex;
    .info {
      width: 100%;
      display: flex;
      justify-content: space-between;
      .dropDown {
        img {
          margin-top: 2px;
          cursor: pointer;
        }
      }
      .userInfo {
        display: flex;
        margin-left: 5px;
        .userNickname {
          display: flex;
          align-items: center;

          div {
            margin-right: 7px;
          }
          button {
            padding-top: 2px;
            padding-left: 5px;
            border: none;
            min-width: 44px;
            height: 15px;
            font-size: 11px;
            color: #03b037;
            background-color: #61cd8144;
            border-radius: 4px;
            cursor: pointer;
          }
        }
        div:first-child {
          font-size: 16px;
          font-weight: 400;
          margin-top: 1px;
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
      min-width: 47px;
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
      .contentBody {
        word-break: break-all;
        font-size: 15px;
        font-weight: 400;
        line-height: 1.5;
        //border: 1px solid black;
        pre {
          //border: 1px solid black;
          white-space: pre-wrap;
        }
      }
    }
    .title {
      word-break: break-all;
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
