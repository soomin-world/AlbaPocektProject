import { Carousel } from "antd";
import { useState } from "react";

const contentStyle: React.CSSProperties = {
  width: "70%",
  marginLeft: "15%",
  height: "100px",
  borderRadius: "10px",
  color: "#fff",
  textAlign: "center",
  background: "#364d79",
  display: "flex",
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

const Dday: React.FC<propsType> = (props) => {
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };
  const today = new Date();
  const next = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    props.workList[0].salaryDay
  );
  const nextString = next.toISOString();
  //const nextSalary = next.split(" ");

  console.log(typeof props.workList);
  return (
    <Carousel afterChange={onChange}>
      {props?.workList?.map((w) => {
        return (
          <div key={w.workId}>
            <div style={contentStyle}>
              <div className="1">111</div>
              <div className="1">222</div>
            </div>
          </div>
        );
      })}
    </Carousel>
  );
};

export default Dday;
