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

  const [nickname, setNickname] = useState("");
  const [file, setFile] = useState<File | undefined>();
  const [userImage, setUserImage] = useState(data?.profileImage);

  useEffect(() => {
    // setNickname(data?.nickname);
    setUserImage(data?.profileImage);
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
    window.confirm("변경되었습니다!");
    setNickname("");
  };

  const imgPreview = (e: any) => {
    let reader = new FileReader();
    if (e.target.files[0]) {
      console.log(e.target.files[0].name);
      reader.readAsDataURL(e.target.files[0]);
    }
    // 읽기 동작이 끝났을 때마다 발생
    reader.onloadend = () => {
      setUserImage(String(reader.result));
    };
  };

  return (
    <>
      <LayOut padding="0">
        <EditBar>커뮤니티 프로필</EditBar>
        <MyPageProfile>
          <div>
            <label htmlFor="profileImg">
              <img src={userImage} />
              <Camera />
            </label>
            <input
              type="file"
              id="profileImg"
              accept="image/*"
              onChange={(e) => {
                imgPreview(e);
                getImage(e);
              }}
            />

            <span>{data?.nickname}</span>
          </div>
        </MyPageProfile>

        <UserProfileForm onSubmit={onSubmitHandler}>
          <EditNickname>
            <span>닉네임</span>
            <input
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
              }}
            ></input>
          </EditNickname>

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
  position: relative;

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
  input {
    display: none;
  }
`;

const Camera = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-image: url("/image/iconCamera.png");
  background-size: cover;
  position: absolute;
  right: 155px;
  bottom: 50px;
`;

const UserProfileForm = styled.form`
  padding: 15px;

  button {
    width: 340px;
    height: 56px;
    background-color: #5fce80;
    border: none;
    border-radius: 10px;
    color: white;
    font-size: 17px;
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    left: 15px;
    bottom: 15px;
  }
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

const ImagePlus = styled.div`
  width: 60px;
  height: 60px;
  border: 3px solid #c5c5c5;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;

  img {
    width: 30px;
    height: 30px;
    margin: 0;
  }
  input {
    display: none;
  }
`;

export default MyPageEdit;
