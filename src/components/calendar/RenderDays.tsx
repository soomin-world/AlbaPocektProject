import styled from "styled-components";

interface IDaysProps {
  dayWith?: boolean;
  daysWith?: boolean;
}

const RenderDays = ({ dayWith, daysWith }: IDaysProps) => {
  const days = [];
  const date = ["일", "월", "화", "수", "목", "금", "토"];

  for (let i = 0; i < 7; i++) {
    days.push(
      <Day dayWith={dayWith} key={i}>
        {date[i]}
      </Day>
    );
  }

  return <Days daysWith={daysWith}>{days}</Days>;
};

const Day = styled.div<{ dayWith: boolean | undefined }>`
  width: ${(props) => (props.dayWith ? "40px" : "50px")};
  margin-left: ${(props) => (props.dayWith ? "5px" : "0px")};
  font-size: ${(props) => (props.dayWith ? "13px" : "11px")};
  font-weight: 400;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Days = styled.div<{ daysWith: boolean | undefined }>`
  width: ${(props) => (props.daysWith ? "280px" : "370px")};
  padding: 5px 10px 5px 10px;
  display: flex;
  justify-content: space-around;
  font-size: 18px;
`;

export default RenderDays;
