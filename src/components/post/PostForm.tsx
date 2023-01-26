import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { addPost } from "../../APIs/postApi";

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
  //const [submitColor, setSubmitColor] = useState("#c5c5c5");
  //preview image 설정 부분
  const [imgFile, setImgFile] = useState<any>("");
  const getImage = (e: any) => {
    const image = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => {
      setImgFile(reader.result);
      setFile(image);
      console.log(title, category, content, file);
    };
  };

  const submitHandler = (e: any) => {
    e.preventDefault();
    if (title.title === "") {
      alert("제목을 입력해주세요!");
      return;
    }
    if (category.category === "") {
      alert("카테고리를 선택해주세요");
      return;
    }
    if (content.content === "") {
      alert("내용을 입력해 주세요");
      return;
    }
    if (file) {
      const formData = new FormData();
      formData.append("title", title.title);
      formData.append("content", content.content);
      formData.append("category", category.category);
      formData.append("file", file);
      console.log("formData 값:", formData);
      writePost.mutate(formData);
    } else {
      const formData = new FormData();
      formData.append(
        "title",
        new Blob([JSON.stringify(title)], { type: "application/json" })
      );
      formData.append(
        "content",
        new Blob([JSON.stringify(content)], { type: "application/json" })
      );
      formData.append(
        "category",
        new Blob([JSON.stringify(category)], { type: "application/json" })
      );
      writePost.mutate(formData);
    }
  };
  const writePost = useMutation(addPost);
  return (
    <>
      <STHeader>
        <img src="/image/x.png" alt="x" onClick={() => navigate("/board")} />
        <div className="wrap">
          <span>게시글 작성</span>
        </div>
        <button onClick={submitHandler}>등록</button>
      </STHeader>
      <SBody>
        <select
          onChange={(e) => {
            const { value } = e.target;
            setCategory({ category: value });
          }}
        >
          <option defaultValue="">카테고리</option>
          <option value="free">자유</option>
          <option value="partTime">알바고민</option>
          <option value="cover">대타</option>
        </select>
        <div className="titleForm">
          <input
            type="text"
            placeholder="제목"
            onChange={(e) => {
              const { value } = e.target;
              setTitle({ title: value });
            }}
          />
        </div>
        <div className="content">
          <textarea
            placeholder="내용을 작성해주세요"
            onChange={(e) => {
              const { value } = e.target;
              setContent({ content: value });
            }}
          />
        </div>
        <div className="preview">
          {imgFile ? (
            <img src={imgFile} />
          ) : (
            <div style={{ width: "345px", height: "258px", border: "none" }} />
          )}
        </div>
      </SBody>
      <STImageUpLoad>
        <div className="line" />
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
      </STImageUpLoad>
    </>
  );
}

const STHeader = styled.div`
  display: flex;
  margin: 12px 0px 19.36px 0px;
  height: 35px;
  justify-content: space-between;
  img {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
  .wrap {
    //margin-left: 85px;
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
    color: #5fce80;
    //margin-left: 44px;
  }
`;
const SBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 20px;
  select {
    border: none;
    width: 83px;
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
    }
  }
  .content {
    textarea {
      border: none;
      width: 100%;
      min-height: 200px;
      max-height: 200px;
      font-weight: 400;
      font-size: 15px;
      resize: none;
      :focus {
        outline: none;
        //display: none;
      }
    }
  }
  .preview {
    border: 1px solid black;
    img {
      width: 345px;
      height: 258px;
      min-width: 345px;
      min-height: 258px;
      max-height: 258px;
      object-fit: cover;
    }
  }
`;

const STImageUpLoad = styled.div`
  position: absolute;
  bottom: 10px;
  width: 375px;
  .line {
    width: 90%;
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
