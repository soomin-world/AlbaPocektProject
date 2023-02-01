import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getPost, putPost } from "../../APIs/detailPostApi";

function PostEditForm() {
  const navigate = useNavigate();
  const [title, setTitle] = useState({ title: "" });
  const [category, setCategory] = useState({ category: "" });
  const [content, setContent] = useState({ content: "" });
  const [file, setFile] = useState<string | Blob>();
  const { id } = useParams();
  const [imgFile, setImgFile] = useState<any>("");

  const getImage = (e: any) => {
    const image = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => {
      setImgFile(reader.result);
      setFile(image);
    };
  };

  const { data, isError, isLoading, isSuccess } = useQuery(["post", id], () =>
    getPost(id)
  );
  console.log(data);

  const mutatePost = useMutation(putPost, {
    onSuccess: () => {
      queryClient.invalidateQueries(["post", id]);
    },
  });

  useEffect(() => {
    if (data) {
      setTitle({ title: data.title });
      setCategory({ category: data.category });
      setContent({ content: data.content });
      setImgFile(data.imgUrl);
    }
  }, [data]);
  const queryClient = useQueryClient();

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
      const payload = [id, formData];
      mutatePost.mutate(payload);
      alert("수정되었습니다!");
    } else {
      const formData = new FormData();
      formData.append("title", title.title);
      formData.append("content", content.content);
      formData.append("category", category.category);
      const payload = [id, formData];
      mutatePost.mutate(payload);
      alert("수정되었습니다!");
    }
  };

  const locationNow = useLocation();
  console.log(window.location.pathname.slice(0, 8));

  if (isError) return <div>Error!!!!!!</div>;
  if (isLoading) return <div>Loading~~~</div>;
  return (
    <>
      <STHeader>
        <img
          src="/image/iconX.svg"
          alt="x"
          onClick={() => navigate("/board")}
        />
        <div className="wrap">
          <div>게시글 수정</div>
        </div>
        <button onClick={submitHandler}>
          <div>등록</div>
        </button>
      </STHeader>

      <SContianer>
        <select
          value={category.category}
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
            value={title.title}
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
            value={content.content}
            onChange={(e) => {
              const { value } = e.target;
              setContent({ content: value });
            }}
          />
        </div>
        {/* <div className="preview">
          <img
            src={imgFile ? imgFile : "/image/cash 1.png"}
            alt="임시기본이미지"
          />
        </div> */}

        <STImageUpLoad>
          <div className="preview">
            {imgFile ? <img src={imgFile} /> : null}
          </div>
          <div className="line" />
          <label className="signup-profileImg-label" htmlFor="profileImg">
            <img src="/image/iconCamera.svg" alt="카메라" />
          </label>
          <input
            className="signup-profileImg-input"
            type="file"
            accept="image/*"
            id="profileImg"
            onChange={getImage}
            multiple
          />
        </STImageUpLoad>
      </SContianer>
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
    // margin-left: 85px;
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
    // margin-left: 44px;
    div {
      font-size: 17px;
      height: 19px;
    }
  }
`;
const SContianer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  select {
    border: none;
    width: 83px;
    height: 25px;
    font-size: 17px;
    font-weight: 500;
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
const STImageUpLoad = styled.div`
  position: absolute;
  bottom: 10px;
  width: 375px;
  .preview {
    position: absolute;
    bottom: 50px;
    // border: 1px solid black;
    width: 341px;
    height: 220px;
    img {
      width: 341px;
      height: 220px;
      object-fit: cover;
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

export default PostEditForm;
