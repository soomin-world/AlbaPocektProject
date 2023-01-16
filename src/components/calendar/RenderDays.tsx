import styled from "styled-components";

interface IDaysProps {
  dayWith?: boolean;
  daysWith?: boolean;
}

const RenderDays = ({ dayWith, daysWith }: IDaysProps) => {
  const days = [];
  const date = ["Sun", "Mon", "Thu", "Wed", "Thrs", "Fri", "Sat"];

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
  width: ${(props) => (props.dayWith ? "40px" : "55px")};
  padding: 5px;
  margin-left: ${(props) => (props.dayWith ? "5px" : "7px")};
  font-size: ${(props) => (props.dayWith ? "13px" : null)}; ;
`;

const Days = styled.div<{ daysWith: boolean | undefined }>`
  width: ${(props) => (props.daysWith ? "280px" : "385px")};
  margin: 5px 0px 5px 0px;
  display: flex;
  justify-content: space-around;
  font-size: 18px;
`;

export default RenderDays;
