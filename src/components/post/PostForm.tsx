import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { addPost } from "../../APIs/postApi";

function PostForm() {
  const [post, setPost] = useState({
    title: "",
    category: "",
    content: "",
  });
  const navigate = useNavigate();
  const [imgFile, setImgFile] = useState<any>("");
  const [file, setFile] = useState<string | Blob>();
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
    if (post.title === "") {
      alert("제목을 입력해주세요!");
      return;
    }
    if (post.category === "") {
      alert("카테고리를 선택해주세요");
      return;
    }
    if (post.content === "") {
      alert("내용을 입력해 주세요");
      return;
    }
    if (file) {
      const formData = new FormData();
      formData.append(
        "data",
        new Blob([JSON.stringify(post)], { type: "application/json" })
      );
      formData.append("file", file);
      console.log("formData 값:", formData);
      writePost.mutate(formData);
      alert("작성되었습니다");
      //addPost(formData);
    } else {
      const formData = new FormData();
      formData.append(
        "data",
        new Blob([JSON.stringify(post)], { type: "application/json" })
      );
      writePost.mutate(formData);
      alert("작성되었습니다");
    }
  };
  const writePost = useMutation(addPost);
  return (
    <>
      <STHeader>
        <img src="/image/x.png" alt="x" onClick={() => navigate("/board")} />
        <div className="wrap">
          <span>게시판 ·</span>
          <select
            onChange={(e) => {
              const { value } = e.target;
              setPost({ ...post, category: value });
            }}
          >
            <option defaultValue="">카테고리</option>
            <option value="free">자유</option>
            <option value="partTime">알바고민</option>
            <option value="cover">대타</option>
          </select>
        </div>
        <button onClick={submitHandler}>등록</button>
      </STHeader>
      <SContianer>
        <div className="titleForm">
          <input
            type="text"
            placeholder="제목"
            onChange={(e) => {
              const { value } = e.target;
              setPost({ ...post, title: value });
            }}
          />
        </div>
        <div className="content">
          <textarea
            placeholder="내용을 작성해주세요"
            onChange={(e) => {
              const { value } = e.target;
              setPost({ ...post, content: value });
            }}
          />
        </div>
        <div className="preview">
          <img
            src={imgFile ? imgFile : `/images/pencil.png`}
            alt="임시기본이미지"
          />
        </div>
        <Line />
        <div className="imageUpload">
          <label className="signup-profileImg-label" htmlFor="profileImg">
            <img src="/image/camera-mono.png" alt="카메라" />
          </label>
          <input
            className="signup-profileImg-input"
            type="file"
            accept="image/*"
            id="profileImg"
            onChange={getImage}
          />
        </div>
      </SContianer>
    </>
  );
}

const STHeader = styled.div`
  display: flex;
  margin: 12px 0px 19.36px 0px;
  height: 35px;
  img {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
  .wrap {
    margin-left: 85px;
    font-size: 17px;
    font-weight: 500;
    select {
      border: none;
      width: 83px;
      height: 25px;
      font-size: 17px;
      font-weight: 500;
    }
  }
  button {
    font-weight: 400;
    font-size: 17px;
    line-height: 25px;
    border: none;
    background-color: transparent;
    color: #c5c5c5;
    margin-left: 44px;
  }
`;
const SContianer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
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
    }
  }
  .content {
    input {
      border: none;
      width: 100%;
      height: 240px;
      font-weight: 400;
      font-size: 15px;
      line-height: 22px;
      :focus {
        outline: none;
        display: none;
      }
    }
  }
  .preview {
    img {
      min-width: 345px;
      min-height: 258px;
      border: 1px solid black;
      margin-bottom: 47px;
    }
  }
  .imageUpload {
    input {
      display: none;
      .img {
        width: 24px;
        height: 24px;
      }
    }
  }
`;

const Line = styled.div`
  width: 100%;
  height: 0px;
  border: 0.5px solid rgba(197, 197, 197, 0.7);
  margin-bottom: 10px;
`;

export default PostForm;
