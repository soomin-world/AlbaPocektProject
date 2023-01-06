import { useMutation, useQuery } from "react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getPost, putPost } from "../../APIs/detailPostApi";

function PostEditForm() {
  const [editPost, setEditPost] = useState({
    title: "",
    category: "",
    content: "",
  });
  const [file, setFile] = useState<string | Blob>();
  const { id } = useParams();

  const { data, isError, isLoading, isSuccess } = useQuery(["post", id], () =>
    getPost(id)
  );

  useEffect(() => {
    if (isSuccess) {
      setEditPost({
        title: data.data.title,
        category: data.data.category,
        content: data.data.content,
      });
    }
  }, [isSuccess]);

  const getImage = (e: any) => {
    setFile(e.target.files[0]);
  };

  const submitHandler = (e: any) => {
    e.preventDefault();
    //onst formData = new FormData();
    const payload = [id, editPost];
    mutatePost.mutate(payload);
    // if (file) {
    //   formData.append(
    //     "data",
    //     new Blob([JSON.stringify(editPost)], { type: "application/json" })
    //   );
    //   formData.append("file", file);
    //   console.log("서버전송payload:", payload);
    //   mutatePost.mutate(payload);
    // } else {
    //   formData.append(
    //     "data",
    //     new Blob([JSON.stringify(editPost)], { type: "application/json" })
    //   );
    //   mutatePost.mutate(payload);
    // }
  };

  const mutatePost = useMutation(putPost);

  if (isError) return <div>Error!!!!!!</div>;
  if (isLoading) return <div>Loading~~~</div>;
  return (
    <SContianer>
      <SForm>
        <div className="titleForm">
          <label className="title">제목</label>
          <input
            type="text"
            value={editPost.title}
            placeholder="제목을 입력해주세요"
            onChange={(e) => {
              const { value } = e.target;
              setEditPost({ ...editPost, title: value });
            }}
          />
        </div>
        <div className="category">
          <label>카테고리</label>
          <select
            value={editPost.category}
            onChange={(e) => {
              const { value } = e.target;
              setEditPost({ ...editPost, category: value });
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
            value={editPost.content}
            onChange={(e) => {
              const { value } = e.target;
              setEditPost({ ...editPost, content: value });
            }}
          />
        </div>
        <button onClick={submitHandler}>등록</button>
      </SForm>
    </SContianer>
  );
}
const SContianer = styled.div`
  display: flex;
  justify-content: center;
`;
const SForm = styled.div`
  margin-top: 20%;
  div {
    margin-bottom: 20px;
    label {
      margin-right: 20px;
    }
  }
  .content {
    input {
      width: 100%;
      height: 300px;
    }
  }
`;

export default PostEditForm;
