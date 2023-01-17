import styled from "styled-components";
import { format } from "date-fns";
import workingTime from "../../hooks/workingTime";
import { useRecoilState } from "recoil";
import { calendarDayList } from "../../atoms";

interface ISelectedProps {
  day: Date;
  Month: string;
}

const RenderSelected = ({ day, Month }: ISelectedProps) => {
  // console.log(todos);
  const [dayList, setDayList] = useRecoilState(calendarDayList);
  const dayMonth = format(day, "MM");
  const date = String(day).split(" ");
  // console.log(date);

  // console.log(Month);

  // 현재 달에 해당하지 않으면 표시 X...다음달에 표시 X
  for (const selectedDay of dayList) {
    if (selectedDay === `${format(day, "YMM")}${format(day, "dd")}`) {
      return <SelectedBox></SelectedBox>;
    }
  }
  return null;
};

const SelectedBox = styled.div`
  width: 40px;
  height: 40px;
  position: absolute;
  bottom: 0px;
  border-radius: 15px;
  background-color: red;
  opacity: 0.5;
`;
export default RenderSelected;
