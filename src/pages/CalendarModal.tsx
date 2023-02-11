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
import CalendarMiniModal from "../components/calendar/CalendarMiniModal";

type ICellsProps = {
  currentMonth: Date;
  selectedDate: string;
  onDateClick: (day: Date) => string;
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
        <CalendarMiniModal
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
  const [selectedDate, setSelectedDate] = useState("");
  const [isCalendarBtns, setIsCalendarBtns] = useRecoilState(calendarAtom);
  // const dayList: string[] = [];

  const selectedMonth = (date: Date) => {
    setCurrentMonth(date);
    return currentMonth;
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
    return currentMonth;
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
    return currentMonth;
  };

  const onDateClick = (day: Date) => {
    const dayToform =
      String(day).split(" ")[3] +
      "-" +
      String(day).split(" ")[1] +
      String(day).split(" ")[2];

    setSelectedDate(dayToform);
    console.log(selectedDate);
    return selectedDate;
  };

  return (
    <>
      <Total>
        <RenderHeader
          currentMonth={currentMonth}
          selectedMonth={selectedMonth}
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
          // setDayList([]);
        }}
      ></Overlay>
      <Modal>
        <Calendar />
        <Buttons>
          {/* <button
            onClick={() => {
              setIsCalendarBtns(false);
              // setDayList([]);
            }}
          >
            확인
          </button> */}
          <button
            onClick={() => {
              setIsCalendarBtns(false);
              setDayList([]);
            }}
          >
            취소
          </button>
          <button
            onClick={() => {
              setIsCalendarBtns(false);
              // setDayList([]);
            }}
          >
            확인
          </button>
        </Buttons>
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
  border-radius: 10px;
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
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  padding-bottom: 20px;
`;

const CellsRow = styled.div`
  display: flex;
`;

const CellsBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
`;

const Buttons = styled.div`
  position: relative;
  left: 70px;
  bottom: -5px;

  button {
    width: 60px;
    height: 30px;
    border: none;
    border-radius: 5px;
    font-weight: 500;
  }
  & :first-child {
    margin-right: 8px;
    background-color: #f2f3f5;
  }
  & :last-child {
    background-color: #5fce80;
    color: white;
  }
`;

export default Test;
