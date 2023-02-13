import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { addPost } from "../../APIs/postApi";
import sweetAlert from "../../util/sweetAlert";

function PostForm() {
  const navigate = useNavigate();
  // const [post, setPost] = useState({
  //   title: "",
  //   category: "",
  //   content: "",
  // });
  const [title, setTitle] = useState({ title: "" });
  const [category, setCategory] = useState({ category: "" });
  const [content, setContent] = useState({ content: "" });
  const [file, setFile] = useState<string | Blob>();
  const [boardModal, setBoardModal] = useState(false);
  const [boardType, setBoardType] = useState("카테고리");
  //const [submitColor, setSubmitColor] = useState("#c5c5c5");
  //preview image 설정 부분
  const [imgFile, setImgFile] = useState<any>("");

  const writePost = useMutation(addPost);

  const getImage = (e: any) => {
    const image = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => {
      setImgFile(reader.result);
      setFile(image);
    };
  };

  const submitHandler = (e: any) => {
    e.preventDefault();
    //setContent({ content: content.content.replace("\n", "<br>") });
    if (title.title === "") {
      sweetAlert(1000, "error", "제목을 입력해주세요!");
      return;
    }
    if (category.category === "") {
      sweetAlert(1000, "error", "카테고리를 선택해주세요!");
      return;
    }
    if (content.content === "") {
      sweetAlert(1000, "error", "내용을 입력해 주세요!");
      return;
    }
    if (file) {
      const formData = new FormData();
      formData.append("title", title.title);
      formData.append("content", content.content);
      formData.append("category", category.category);
      formData.append("file", file);

      writePost
        .mutateAsync(formData)
        .then((res) => {
          sweetAlert(1000, "success", "등록되었습니다!");
          navigate(`/post/${res.postId}/0`);
        })
        .catch((error) => sweetAlert(1000, "error", error.response.data.msg));
    } else {
      const formData = new FormData();
      formData.append("title", title.title);
      formData.append("content", content.content);
      formData.append("category", category.category);

      writePost
        .mutateAsync(formData)
        .then((res) => {
          sweetAlert(1000, "success", "등록되었습니다!");
          navigate(`/post/${res.postId}/0`);
        })
        .catch((error) => sweetAlert(1000, "error", error.response.data.msg));
    }
  };

  return (
    <>
      <STHeader>
        <img
          src="/image/iconX.svg"
          alt="x"
          onClick={() => navigate("/board")}
        />
        <div className="wrap">
          <div>게시글 작성</div>
        </div>
        <button onClick={submitHandler}>
          <div>등록</div>
        </button>
      </STHeader>

      <SBody>
        <Selector
          onClick={() => {
            setBoardModal(!boardModal);
          }}
        >
          {boardType}
          <img src="/image/iconCategory.svg" />
        </Selector>
        {boardModal ? (
          <List>
            <div
              onClick={(e) => {
                setBoardType("자유 게시판");
                setBoardModal(false);
                setCategory({ category: "free" });
              }}
            >
              자유 게시판
            </div>
            <div
              onClick={(e) => {
                setBoardType("알바 고민");
                setBoardModal(false);
                setCategory({ category: "partTime" });
              }}
            >
              알바 고민
            </div>
            <div
              onClick={(e) => {
                setBoardType("대타 구해요");
                setBoardModal(false);
                setCategory({ category: "cover" });
              }}
            >
              대타 구해요
            </div>
          </List>
        ) : null}

        <div className="titleForm">
          <input
            type="text"
            maxLength={50}
            placeholder="제목"
            onChange={(e) => {
              const { value } = e.target;
              setTitle({ title: value });
            }}
          />
        </div>
        <div className="content">
          <textarea
            maxLength={500}
            placeholder="내용을 작성해주세요 (500자 이내)"
            onChange={(e) => {
              const { value } = e.target;
              setContent({ content: value });
            }}
          />
        </div>
      </SBody>

      <STImageUpLoad>
        <div className="preview">
          {imgFile ? (
            <>
              <img
                onClick={() => {
                  setFile(undefined);
                  setImgFile("");
                }}
                src="/image/iconPostX.svg"
                alt=""
              />
              <img src={imgFile} alt="" />
            </>
          ) : null}
        </div>
        <div className="line" />
        <label className="signup-profileImg-label" htmlFor="profileImg">
          <img src="/image/iconCamera.svg" alt="카메라" />
        </label>
        <input
          className="signup-profileImg-input"
          type="file"
          accept=".gif, .jpg, .png, .jpeg, .svg"
          id="profileImg"
          onChange={getImage}
        />
      </STImageUpLoad>
    </>
  );
}

const STHeader = styled.div`
  margin: 12px 0px 19.36px 0px;
  height: 35px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  img {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
  .wrap {
    //margin-left: 85px;
    font-size: 17px;
    font-weight: 500;
    div {
      height: 19px;
    }
  }
  button {
    font-weight: 400;
    font-size: 17px;
    line-height: 25px;
    border: none;
    background-color: transparent;
    color: #5fce80;
    //margin-left: 44px;
    div {
      font-size: 17px;
      height: 19px;
    }
  }
`;

const SBody = styled.div`
  font-family: "Noto Sans KR";
  //border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  /* margin-bottom: 20px; */
  select {
    border: none;
    width: 90px;
    height: 25px;
    font-size: 17px;
    font-weight: 500;
    margin-bottom: 10px;
  }

  .titleForm {
    border-bottom: 0.5px solid rgba(197, 197, 197, 0.7);
    margin-bottom: 10px;

    input {
      width: 100%;
      height: 45px;
      font-weight: 400;
      font-size: 24px;
      line-height: 35px;
      border: none;
      margin-bottom: 10px;
      font-family: "Noto Sans KR";
      outline: none;
    }
  }
  .content {
    textarea {
      font-family: "Noto Sans KR";
      border: none;
      width: 100%;
      height: 250px;
      font-weight: 400;
      font-size: 15px;
      resize: none;
      :focus {
        outline: none;
        //display: none;
      }
    }
  }
`;

const Selector = styled.div`
  font-size: 18px;
  font-weight: 500;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 5px;

  img {
    width: 24px;
    height: 24px;
    margin: 2px 0px 0px 5px;
  }
`;

const List = styled.div`
  width: 90px;
  background-color: white;
  position: absolute;
  top: 35px;
  left: -3px;
  border-radius: 10px;
  animation: modal-bg-show 0.6s;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  div {
    font-size: 15px;
    font-weight: 400;
    padding: 6px 8px 6px 8px;
  }
`;

const STImageUpLoad = styled.div`
  position: absolute;
  bottom: 10px;
  width: 375px;
  //border: 1px solid black;

  @media screen and (max-height: 600px) {
    display: none;
  }

  .preview {
    position: absolute;
    bottom: 50px;
    //border: 1px solid black;
    width: 341px;
    height: 220px;
    img:first-child {
      // border: 1px solid black;
      width: 20px;
      height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: -7px;
      left: -7px;
    }
    img {
      width: 341px;
      height: 220px;
      object-fit: cover;
      border-radius: 10px;
    }
  }
  .line {
    width: 341px;
    height: 0px;
    border: 0.5px solid rgba(197, 197, 197, 0.7);
    margin-bottom: 10px;
    position: absolute;
    bottom: 30px;
  }
  input {
    display: none;
    .img {
      position: absolute;
      bottom: 5px;
      width: 24px;
      height: 24px;
    }
  }
`;

export default PostForm;
