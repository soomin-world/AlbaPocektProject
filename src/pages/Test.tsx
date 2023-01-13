import ReactDOM from "react-dom";
import { format, addMonths, subMonths, toDate } from "date-fns";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from "date-fns";
import { isSameMonth, isSameDay, addDays } from "date-fns";
import { useEffect, useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { calendarAtom } from "../atoms";
import RenderDays from "../components/calendar/RenderDays";
import RenderHeader from "../components/calendar/RenderHeader";
import TodosModal from "../components/calendarModal/TodosModal";

type ICellsProps = {
  currentMonth: Date;
  selectedDate: Date;
  onDateClick: (day: Date) => Date; // 부모컴포넌트에서 import 해온 타입을 재사용 해 줍시다.
};

const RenderCells = ({
  currentMonth,
  selectedDate,
  onDateClick,
}: ICellsProps) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const navigate = useNavigate();

  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = "";
  let currentDay = new Date();

  const dayList: Date[] = [];

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, "d");
      const cloneDay = day;
      const dayMonth = format(day, "MM");
      const Month = format(currentMonth, "MM");
      // const [isActive, setIsActive] = useState(false);

      days.push(
        <Cells
          key={String(day)}
          color={
            !isSameMonth(day, monthStart)
              ? "#adb5bd"
              : format(currentMonth, "M") !== format(day, "M")
              ? "#adb5bd"
              : "black"
          }
          backgroundColor={
            isSameDay(day, selectedDate) ? "#D1DFE8" : "transparent"
          }
          onClick={() => {
            onDateClick(toDate(cloneDay));
            dayList.push(day);
          }}
        >
          <CellsNum
            color={
              format(currentMonth, "M") !== format(day, "M")
                ? "#adb5bd"
                : "black"
            }
          >
            {formattedDate}
          </CellsNum>
        </Cells>
      );
      day = addDays(day, 1);
    }
    console.log(dayList);
    // 아마도 여기다 key값을 주어야 warning이 사라질듯함...그런데 줄 방법이 없음ㅋ
    rows.push(<CellsRow>{days}</CellsRow>);
    days = [];
  }
  return <CellsBody>{rows}</CellsBody>;
};

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isCalendarBtns, setIsCalendarBtns] = useRecoilState(calendarAtom);

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
    return currentMonth;
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
    return currentMonth;
  };

  const onDateClick = (day: Date) => {
    setSelectedDate(day);
    return selectedDate;
  };

  return (
    <>
      <Modal>
        <RenderHeader
          currentMonth={currentMonth}
          prevMonth={prevMonth}
          nextMonth={nextMonth}
        />
        <RenderDays dayWith={true} daysWith={true} />
        <RenderCells
          currentMonth={currentMonth}
          selectedDate={selectedDate}
          onDateClick={onDateClick}
        />
      </Modal>
    </>
  );
};

const Test = () => {
  const [isCalendarBtns, setIsCalendarBtns] = useRecoilState(calendarAtom);
  return (
    <>
      <button onClick={() => setIsCalendarBtns(true)}>달력 열기</button>
      {isCalendarBtns && <Calendar />}
    </>
  );
};

const Modal = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
`;

const Cells = styled.div<{ color: string; backgroundColor: string }>`
  width: 40px;
  height: 40px;
  padding-top: 3px;
  background-color: ${(props) => props.backgroundColor};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CellsNum = styled.span<{ color: string }>`
  color: ${(props) => props.color};
`;

const CellsRow = styled.div`
  display: flex;
`;

const CellsBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
`;

export default Test;
