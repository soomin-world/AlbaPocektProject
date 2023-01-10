import styled from "styled-components";

const RenderDays = () => {
  const days = [];
  const date = ["Sun", "Mon", "Thu", "Wed", "Thrs", "Fri", "Sat"];

  for (let i = 0; i < 7; i++) {
    days.push(<div key={i}>{date[i]}</div>);
  }

  return <Days>{days}</Days>;
};

const Days = styled.div`
  margin: 5px 0px 5px 0px;
  display: flex;
  justify-content: space-around;
  font-size: 18px;
`;

export default RenderDays;
