import { Carousel } from "antd";
import { WorkType } from "../workplace/WorkPlace";

const contentStyle: React.CSSProperties = {
  width: "70%",
  marginLeft: "15%",
  height: "100px",
  borderRadius: "10px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
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
  console.log(props);
  return (
    <Carousel afterChange={onChange}>
      {props.workList.map((w) => {
        return (
          <div>
            <div style={contentStyle}>월급날 :일</div>
          </div>
        );
      })}
    </Carousel>
  );
};

export default Dday;
