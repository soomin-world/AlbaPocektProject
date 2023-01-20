import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { editMyPage, getMyPage } from "../APIs/myPageApi";
import LayOut from "../components/layout/LayOut";
import { IMyPage } from "../types/myPageType";

const MyPageEdit = () => {
  const queryClient = useQueryClient();

  const { isLoading, isError, data } = useQuery<IMyPage>(["myPage"], () =>
    getMyPage()
  );

  const { mutate } = useMutation(editMyPage, {
    onSuccess: () => {
      queryClient.invalidateQueries(["myPage"]);
    },
  });

  const [nickname, setNickname] = useState(data?.nickname);
  const [file, setFile] = useState<File | undefined>();

  useEffect(() => {
    setNickname(data?.nickname);
  }, [data]);

  const getImage = (e: any) => {
    setFile(e.target.files[0]);
  };

  const onSubmitHandler = (e: any) => {
    e.preventDefault();
    console.log("submit!!!");

    if (file) {
      // console.log(nickname);
      const formData = new FormData();

      if (nickname !== undefined) {
        formData.append("nickname", nickname);
      }

      formData.append("file", file);

      mutate(formData);
    } else {
      // console.log(nickname);
      const formData = new FormData();

      if (nickname !== undefined) {
        formData.append("nickname", nickname);
      }

      mutate(formData);
    }
  };
  return (
    <>
      <LayOut padding="0">
        <EditBar>커뮤니티 프로필</EditBar>
        <MyPageProfile>
          <div>
            <img src={data?.profileImage} />
            <span>{data?.nickname}</span>
          </div>
        </MyPageProfile>

        <UserProfileForm onSubmit={onSubmitHandler}>
          <EditNickname>
            <span>닉네임</span>
            <input
              // value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
              }}
            ></input>
          </EditNickname>

          <div>
            <span>프로필 이미지</span>
            <input
              type="file"
              accept="image/jpg,image/png,image/jpeg,image/gif"
              onChange={getImage}
              multiple
            ></input>
          </div>

          <button>확인</button>
        </UserProfileForm>
      </LayOut>
    </>
  );
};

const EditBar = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 17px;
  font-weight: 500;
  border-bottom: 1px solid black;
`;

const MyPageProfile = styled.div`
  width: 100%;
  height: 135px;
  border-bottom: 1px solid #ebebeb;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* justify-content: space-between;
  align-items: center; */
  font-size: 19px;
  font-weight: 400;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 50%;
    margin-bottom: 10px;
  }
`;

const UserProfileForm = styled.form`
  padding: 15px;
`;

const EditNickname = styled.div`
  display: flex;
  flex-direction: column;

  span {
    font-size: 15px;
    font-weight: 400;
    margin-bottom: 15px;
  }
  input {
    width: 340px;
    height: 48px;
    padding: 15px;
    font-size: 15px;
    border-radius: 15px;
    border: 1px solid #efefef;
  }
`;
export default MyPageEdit;
