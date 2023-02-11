import styled from "styled-components";
import LayOut from "../layout/LayOut";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Carousel } from "antd";
import { KAKAO_AUTH_URL } from "../../APIs/OAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const contentStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  //borderRadius: "8px",
  //color: "#000000",
  //textAlign: "center",
  background: "#ffffff",
  //display: "flex",
  //justifyContent: "space-between",
  border: "1px solid black",
};
const Guide = () => {
  const token = localStorage.getItem("is_login");
  const navigate = useNavigate();
  const onChange = (currentSlide: number) => {};
  useEffect(() => {
    if (token) {
      alert("이미 로그인하셨습니다.");
      navigate("/");
    }
  }, []);
  return (
    <LayOut height="100vh" padding="0px">
      <STContainer>
        <STWindow>
          <Carousel afterChange={onChange}>
            <div>
              <img src="/image/Group 395.svg" alt="carousel" />
            </div>
            <div>
              <img src="/image/Group 394.svg" alt="carousel" />
            </div>
            <div>
              <img src="/image/Mask group.svg" alt="carousel" />
            </div>
            <div>
              <img src="/image/Mask group1.svg" alt="carousel" />
            </div>
          </Carousel>
        </STWindow>
        <STButton>
          <a className="kakaoLogin" href={KAKAO_AUTH_URL}>
            <img src="/image/Group 374.svg" />
          </a>
          <img
            src="/image/Group 372.svg"
            alt=""
            onClick={() => navigate("/login")}
          />
        </STButton>
      </STContainer>
    </LayOut>
  );
};

const STContainer = styled.div`
  //border: 1px solid black;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .slick-dots li.slick-active button:before {
    // your code here
    color: #5fce80;
  }
`;
const STButton = styled.div`
  position: absolute;
  bottom: 10px;
  margin-top: 58px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  .kakaoLogin {
    width: 339.89px;
    height: 56px;
    background-color: #ffeb3b;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 208px;
      height: 25px;
    }
  }
`;
const STWindow = styled.div`
  margin-top: 30px;
  background-color: #ffffff;
  width: 375px;
  height: 500.09px;
  //border: 1px solid black;
  overflow: hidden;

  div {
    height: 500px;
  }
`;

export default Guide;
