import { Carousel } from "antd";
import { useState } from "react";
import styled from "styled-components";

const contentStyle: React.CSSProperties = {
  width: "90%",
  marginLeft: "5%",
  height: "90px",
  borderRadius: "10px",
  color: "#000000",
  textAlign: "center",
  background: "#e3fde1",
  display: "flex",
  flexDirection: "column",
  paddingTop: "17px",
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
    <Container>
      <Carousel afterChange={onChange}>
        {props?.workList?.map((w, i) => {
          return (
            <div key={w.workId}>
              <div style={contentStyle}>
                <SalaryWrap>
                  <div className="wrap">
                    <img src="/image/image 118.png" alt="돈" />
                    {w.placeName} 월급날까지
                  </div>
                  <div>
                    {diffDay[i] === 0 ? (
                      <div> D-Day 입니다!!!</div>
                    ) : (
                      <div>D-{diffDay[i]}</div>
                    )}
                  </div>
                </SalaryWrap>
              </div>
            </div>
          );
        })}
      </Carousel>
    </Container>
  );
};

export const Container = styled.div`
  button {
    border: 1px solid black;
  }
`;

export const SalaryWrap = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px;
  .wrap {
    display: flex;
    gap: 15px;
  }
  img {
    width: 25px;
    height: 25px;
  }
  div {
    font-size: 17px;
    font-weight: bold;
  }
`;
export default Dday;
