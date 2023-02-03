import { Carousel } from "antd";
import { useState } from "react";
import styled from "styled-components";
import LayOut from "../layout/LayOut";

const contentStyle: React.CSSProperties = {
  width: "90%",
  marginLeft: "5%",
  height: "110px",
  borderRadius: "8px",
  color: "#000000",
  textAlign: "center",
  background: "#EFFFFE",
  display: "flex",
  justifyContent: "space-between",
  boxShadow: "rgb(0 0 0 / 20%) 2px 2px 8px",
  //border: "1px solid black",
};

interface propsType {
  workList: [
    {
      workId: number;
      placeName: string;
      placeColor: string;
      salaryDay: number;
    }
  ];
}
//다음달의 월급날 까지 남은 일수를 구해야되는데
// 연도랑 월만 출력
const Dday: React.FC<propsType> = (props) => {
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };

  //------------- 디데이를 구해보자 ----------
  const today = new Date();
  // 오늘 날짜 -> 밀리초로 바꾼부분
  const thisMonth = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const thisMonthToString = thisMonth.toISOString();
  const thisSalary = thisMonthToString.split("-");

  const myYear = thisSalary[0];
  const myMonth = thisSalary[1];
  const myDay = thisSalary[2];

  const myDate = new Date(`${myYear}-${myMonth}-${myDay}`);

  const nextMonth = new Date(today.getFullYear(), today.getMonth() + 2);
  // 2023 -03
  const nextMonthToString = nextMonth.toISOString();

  const nextSalary = nextMonthToString.split("-");

  const year = nextSalary[0]; //2023
  const month = nextSalary[1]; // 02

  let nextSalaryDay: string[] = [];

  props?.workList?.map((w) => {
    if (
      myDate.getTime() -
        new Date(`${myYear}-${myMonth}-${w.salaryDay}`).getTime() >
      0
    ) {
      nextSalaryDay.push(`${year}-${month}-${w.salaryDay}`);
    } else if (
      myDate.getTime() -
        new Date(`${myYear}-${myMonth}-${w.salaryDay}`).getTime() ===
      0
    ) {
      nextSalaryDay.push("dday");
    } else {
      nextSalaryDay.push(`${myYear}-${myMonth}-${w.salaryDay}`);
    }
  });

  let finalDate: Date[] = [];

  nextSalaryDay.map((d) => {
    if (d === "dday") {
      finalDate.push(myDate);
    } else {
      finalDate.push(new Date(d));
    }
  });

  let toTime: number[] = [];

  finalDate.map((d) => {
    toTime.push(d.getTime());
  });

  let diff: number[] = [];

  toTime.map((t) => {
    diff.push(t - myDate.getTime());
  });

  let diffDay: number[] = [];
  diff.map((d) => {
    diffDay.push(Math.floor(d / (1000 * 60 * 60 * 24)));
  });

  //-------------------------------------------
  return (
    <LayOut>
      <Container>
        <Carousel afterChange={onChange}>
          {props?.workList?.length >= 1 ? (
            props?.workList?.map((w, i) => {
              return (
                <div key={w.workId}>
                  <div style={contentStyle}>
                    <SalaryWrap>
                      <p>{w.placeName} 월급날까지</p>
                      {diffDay[i] === 0 ? (
                        <div> D-Day 입니다!!!</div>
                      ) : (
                        <div>D-{diffDay[i]} 남았어요!</div>
                      )}
                    </SalaryWrap>
                    <STWrap>
                      <img src="/image/piggy-bank 1.svg" alt="저금통" />
                    </STWrap>
                  </div>
                </div>
              );
            })
          ) : (
            <div>
              <div style={contentStyle}>
                <BlankWrap>
                  <div className="text">
                    <img src="/image/Group 178.svg" alt="디데이" />
                  </div>
                  <div className="image">
                    <img
                      className="money"
                      src="/image/cash 1.svg"
                      alt="money"
                    />
                    <img className="add" src="image/add 1.svg" alt="더하기" />
                  </div>
                </BlankWrap>
              </div>
            </div>
          )}
        </Carousel>
      </Container>
    </LayOut>
  );
};

export const Container = styled.div`
  margin-bottom: 20px;
  button {
    border: 1px solid black;
  }
`;

export const BlankWrap = styled.div`
  display: flex;

  width: 100%;
  height: 100%;
  justify-content: space-between;
  .text {
    display: flex;
    height: 100%;
    align-items: center;
    margin-left: 20.68px;
    img {
      width: 189px;
      height: 54px;
    }
  }
  .image {
    width: 100%;
    height: 100%;
    .money {
      margin-top: 10px;
      width: 62.28px;
      height: 62.28px;
    }
    .add {
      object-fit: fill;
      position: absolute;
      top: 30px;
      right: 18px;
      width: 80px;
      height: 80px;
    }
  }
`;

export const SalaryWrap = styled.div`
  //border: 1px solid black;
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  p {
    color: #37adae;
    font-size: 18px;
    font-weight: 500;
  }
  div {
    font-size: 18px;
    color: #37adae;
    font-weight: 800;
  }
`;

export const STWrap = styled.div`
  width: 40%;
  img {
    position: absolute;
    top: -10px;
    width: 122px;
    height: 122px;
    border-radius: 8px;
  }
`;
export const STPig = styled.img`
  //border: 1px solid black;
  width: 50%;
`;
export default Dday;
