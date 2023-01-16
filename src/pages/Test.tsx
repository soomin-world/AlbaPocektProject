import ReactDOM from "react-dom";
import { format, addMonths, subMonths, toDate } from "date-fns";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from "date-fns";
import { isSameMonth, isSameDay, addDays } from "date-fns";
import { useEffect, useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { calendarAtom, calendarDayList } from "../atoms";
import RenderDays from "../components/calendar/RenderDays";
import RenderHeader from "../components/calendar/RenderHeader";
import TodosModal from "../components/calendarModal/TodosModal";
import CalendarTest from "../components/calendar/CalendarTest";

type ICellsProps = {
  currentMonth: Date;
  selectedDate: Date;
  onDateClick: (day: Date) => Date;
  // dayList: string[];
};

const RenderCells = ({
  currentMonth,
  selectedDate,
  onDateClick,
}: // dayList,
ICellsProps) => {
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

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, "d");
      const cloneDay = day;
      const dayMonth = format(day, "MM");
      const Month = format(currentMonth, "MM");
      // const [isActive, setIsActive] = useState(false);

      days.push(
        <CalendarTest
          day={day}
          monthStart={monthStart}
          currentMonth={currentMonth}
          selectedDate={selectedDate}
          onDateClick={onDateClick}
          cloneDay={cloneDay}
          formattedDate={formattedDate}
        />
      );
      day = addDays(day, 1);
    }

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
  // const dayList: string[] = [];

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
      <Total>
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
          // dayList={dayList}
        />
      </Total>
    </>
  );
};

export const CalendarModal = () => {
  const [isCalendarBtns, setIsCalendarBtns] = useRecoilState(calendarAtom);
  const [dayList, setDayList] = useRecoilState(calendarDayList);

  return ReactDOM.createPortal(
    <>
      <Overlay
        onClick={() => {
          setIsCalendarBtns(false);
          setDayList([]);
        }}
      ></Overlay>
      <Modal>
        <Calendar />
      </Modal>
    </>,
    document.getElementById("modal") as Element
  );
};

const Test = () => {
  const [isCalendarBtns, setIsCalendarBtns] = useRecoilState(calendarAtom);
  return (
    <>
      <button onClick={() => setIsCalendarBtns((pre) => !pre)}>달력</button>
      {isCalendarBtns && <CalendarModal />}
    </>
  );
};

const Total = styled.div`
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

const Modal = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 10px;
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
