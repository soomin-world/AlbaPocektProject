// 리다이렉트될 화면

import axios from "axios";
import { useEffect } from "react";
import LayOut from "../components/layout/LayOut";
import Loading from "../components/Loading/Loading";
// import Spinner from "./Spinner";
interface IData {
  headers: {
    authorization: string;
  };
}

const setAccessToken = (accessToken: any) => {
  localStorage.setItem("is_login", accessToken);
};

const setUserId = (userId: string) => {
  localStorage.setItem("userId", userId);
};

const setNickname = (nickname: string) => {
  localStorage.setItem("nickname", nickname);
};

const kakaoLogin = (code: string | null) => {
  console.log(code);
  axios
    .get(`https://woooo.shop/api/user/kakao/callback?code=${code}`)
    .then((res) => {
      // const response:IData = res;
      console.log(res.headers.authorization); // 토큰이 넘어올 것임
      const accessToken = res.headers.authorization;
      const userId = res.data.userId;
      const nickname = res.data.nickname;
      setNickname(nickname);
      setAccessToken(accessToken);
      setUserId(userId);
      window.location.href = "/"; // 토큰 받았았고 로그인됐으니 화면 전환시켜줌(메인으로)
    })
    .catch((err: any) => {
      console.log("소셜로그인 에러", err);
      window.alert("로그인에 실패하였습니다.");
      window.location.href = "/login"; // 로그인 실패하면 로그인화면으로 돌려보냄
    });
};

const KakaoSocial = () => {
  // 인가코드
  console.log("호출 직전!!!");
  const code: string | null = new URL(window.location.href).searchParams.get(
    "code"
  );
  console.log(code);
  kakaoLogin(code);
  return (
    // <LayOut height="100vh">
    //   <div>카카오 로그인 처리중...</div>
    // </LayOut>
    <Loading />
  );
};

export default KakaoSocial;
