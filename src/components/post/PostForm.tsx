import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import styled from "styled-components";
import { addPost } from "../../APIs/postApi";

function PostForm() {
  const [post, setPost] = useState({
    title: "",
    category: "",
    content: "",
  });

  const [file, setFile] = useState<string | Blob>();
  const getImage = (e: any) => {
    setFile(e.target.files[0]);
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
    <SContianer>
      <SForm onSubmit={submitHandler}>
        <div className="titleForm">
          <label className="title">제목</label>
          <input
            type="text"
            placeholder="제목을 입력해주세요"
            onChange={(e) => {
              const { value } = e.target;
              setPost({ ...post, title: value });
            }}
          />
        </div>
        <div className="category">
          <label>카테고리</label>
          <select
            onChange={(e) => {
              const { value } = e.target;
              setPost({ ...post, category: value });
            }}
          >
            <option defaultValue="">카테고리를 선택하세요</option>
            <option value="free">자유게시판</option>
            <option value="partTime">알바고민게시판</option>
            <option value="cover">대타구해요</option>
          </select>
        </div>
        <div className="imageUpload">
          <label>이미지 첨부하기</label>
          <input
            type="file"
            accept="image/jpg,impge/png,image/jpeg,image/gif"
            onChange={getImage}
            multiple
          />
        </div>
        <div className="content">
          <input
            type="text"
            onChange={(e) => {
              const { value } = e.target;
              setPost({ ...post, content: value });
            }}
          />
        </div>
        <button>등록</button>
      </SForm>
    </SContianer>
  );
}
const SContianer = styled.div`
  display: flex;
  justify-content: center;
`;
const SForm = styled.form`
  margin-top: 20%;
  div {
    margin-bottom: 20px;
    label {
      margin-right: 20px;
    }
  }
  .content {
    input {
      width: 90%;
      height: 300px;
    }
  }
`;

export default PostForm;
