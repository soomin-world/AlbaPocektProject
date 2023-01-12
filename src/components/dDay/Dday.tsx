import { Carousel } from "antd";
import derivative from "antd/es/theme/themes/default";
import { useState } from "react";

const contentStyle: React.CSSProperties = {
  width: "70%",
  marginLeft: "15%",
  marginBottom: "30px",
  height: "100px",
  borderRadius: "10px",
  color: "#fff",
  textAlign: "center",
  background: "#364d79",
  display: "flex",
  flexDirection: "column",
  paddingTop: "30px",
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
  const todayToTime = today.getTime();
  // 오늘 날짜 -> 밀리초로 바꾼부분
  const nextMonth = new Date(today.getFullYear(), today.getMonth() + 2);
  // 2023 -03
  const nextMonthToString = nextMonth.toISOString();

  const nextSalary = nextMonthToString.split("-");

  const year = nextSalary[0]; //2023
  const month = nextSalary[1]; // 02

  let nextSalaryDay: string[] = [];

  props?.workList?.map((w) => {
    nextSalaryDay.push(`${year}-${month}-${w.salaryDay}`);
  });

  let finalDate: Date[] = [];

  nextSalaryDay.map((d) => finalDate.push(new Date(d)));

  let toTime: number[] = [];

  finalDate.map((d) => {
    toTime.push(d.getTime());
  });

  let diff: number[] = [];

  toTime.map((t) => {
    diff.push(t - todayToTime);
  });

  let diffDay: number[] = [];
  console.log(diff);
  diff.map((d) => {
    diffDay.push(Math.floor(d / (1000 * 60 * 60 * 24)));
  });
  console.log("남은 날수:", diffDay);
  //-------------------------------------------
  return (
    <Carousel afterChange={onChange}>
      {props?.workList?.map((w, i) => {
        return (
          <div key={w.workId}>
            <div style={contentStyle}>
              <div className="1">
                {year}-{month}-{w.salaryDay}까지
              </div>
              <div>{diffDay[i]}일 남았습니다</div>
            </div>
          </div>
        );
      })}
    </Carousel>
  );
};

export default Dday;
