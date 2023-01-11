import styled from "styled-components";

const RenderDays = () => {
  const days = [];
  const date = ["Sun", "Mon", "Thu", "Wed", "Thrs", "Fri", "Sat"];

  for (let i = 0; i < 7; i++) {
    days.push(<Day key={i}>{date[i]}</Day>);
  }

  return <Days>{days}</Days>;
};

const Day = styled.div`
  width: 47px;
  padding: 5px;
  margin-left: 7px;
`;

const Days = styled.div`
  width: 329px;
  margin: 5px 0px 5px 0px;
  display: flex;
  justify-content: space-around;
  font-size: 18px;
`;

export default RenderDays;
