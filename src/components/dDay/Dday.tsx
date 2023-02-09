import { Carousel } from "antd";
import styled from "styled-components";
import LayOut from "../layout/LayOut";
import moment, { Moment } from "moment";

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
  const onChange = (currentSlide: number) => {};
  //------------- 디데이를 구해보자 ----------
  const today = moment();

  const thisMonth = today.format("MM");
  const thisYear = today.format("YY");

  const nextSalary = moment().add(1, "M").format("YYYY-MM-DD");

  const nextMonth = nextSalary.split("-")[1];
  const nextYear = nextSalary.split("-")[0];
  //03

  let nextSalaryDay: Moment[] = [];

  props?.workList?.map((w) => {
    if (
      today.diff(
        moment(`${thisYear}-${thisMonth}-${w.salaryDay}`, "YYYY-MM-D"),
        "days"
      ) > 0
    ) {
      nextSalaryDay.push(
        moment(`${nextYear}-${nextMonth}-${w.salaryDay}`, "YYYY-MM-D")
      );
    } else if (
      today.diff(
        moment(`${thisYear}-${thisMonth}-${w.salaryDay}`, "YYYY-MM-D"),
        "days"
      ) === 0
    ) {
      nextSalaryDay.push(today);
    } else {
      nextSalaryDay.push(
        moment(`${thisYear}-${thisMonth}-${w.salaryDay}`, "YYYY-MM-D")
      );
    }
  });

  let diffDay: number[] = [];

  nextSalaryDay.map((d) => {
    diffDay.push(d.diff(today, "days"));
  });
  //-------------------------------------------
  return (
    <LayOut>
      <Container>
        <Carousel afterChange={onChange} autoplay={true} autoplaySpeed={3500}>
          {props?.workList?.length >= 1 ? (
            props?.workList?.map((w, i) => {
              return (
                <div key={w.workId}>
                  <div style={contentStyle}>
                    <SalaryWrap>
                      <div style={{ marginLeft: "10px" }}>
                        {w.placeName} 월급날까지
                      </div>
                      {diffDay[i] === 0 ? (
                        <div>
                          <div className="dDayText">D-Day</div> 입니다!!!
                        </div>
                      ) : (
                        <div>
                          <div className="dDayText">D-{diffDay[i]} </div>
                          남았어요!
                        </div>
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
  .slick-dots li.slick-active button:before {
    // your code here
    color: #5fce80;
  }
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
  font-family: "Noto Sans KR";
  color: #37adae;
  font-size: 18px;
  font-weight: 500;
  div {
    display: flex;
    align-items: center;
    margin-left: 10px;
  }
  .dDayText {
    font-family: "Montserrat";
    font-size: 24px;
    font-weight: 700;
    margin-top: 3px;
    margin-right: 5px;
  }
`;

export const STWrap = styled.div`
  width: 122px;

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
