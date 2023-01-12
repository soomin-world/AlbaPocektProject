import React, { useState } from "react";
import { format, addMonths, subMonths, toDate } from "date-fns";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from "date-fns";
import { isSameMonth, isSameDay, addDays, parse } from "date-fns";
import styled from "styled-components";
import RenderHeader from "../components/calendar/RenderHeader";
import RenderDays from "../components/calendar/RenderDays";
import RenderTodos from "../components/calendar/RenderTodos";
import RenderDayTotal from "../components/calendar/RenderDayTotal";
import TodosModal from "../components/CalendarModal.tsx/TodosModal";
import { useNavigate } from "react-router-dom";
import { useMatch } from "react-router-dom";
import MoreBtnsModal from "../components/CalendarModal.tsx/MoreBtnsModal";
import { useRecoilValue } from "recoil";
import { moreBtnsAtom, workplaceBtnsAtom } from "../atoms";
import WorkplaceBtnsModal from "../components/CalendarModal.tsx/WorkplaceBtnsModal";

type ICellsProps = {
  currentMonth: Date;
  selectedDate: Date;
  onDateClick: (day: Date) => Date; // 부모컴포넌트에서 import 해온 타입을 재사용 해 줍시다.
};

type IBonusProps = {
  day: Date;
  Month: string;
  bonus: IBonus[];
};

type IBonus = {
  year: string;
  month: string;
  date: string;
  bonus: string;
  color: string;
};

const RenderBonus = ({ day, Month, bonus }: IBonusProps) => {
  const dayYear = format(day, "Y");
  const dayMonth = format(day, "MM");
  const dayDate = format(day, "dd");

  const bonusList = [];

  for (const b of bonus) {
    if (
      b.year === dayYear &&
      b.month === dayMonth &&
      dayMonth === Month &&
      b.date === dayDate
    ) {
      bonusList.push(
        <BonusWage>
          <div style={{ backgroundColor: `${b.color}` }}></div>
          <span>주휴수당</span>
        </BonusWage>
      );
    }
  }
  return <div>{bonusList}</div>;
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

  // 예시 데이터

  // const todo = {
  //   "20230105": [{}, {}],
  // };

  const todos = [
    {
      todoId: 1,
      year: "2023",
      month: "01",
      date: "05",
      placeName: "카페",
      workingTime: "03:30",
      startTime: "09:00",
      endTime: "12:30",
      hourlyWage: "9,620",
      dayWage: "33,670",
      dayTotalWage: "81,770",
      color: "#FFDD94",
    },
    {
      todoId: 2,
      year: "2023",
      month: "01",
      date: "05",
      placeName: "영화관",
      workingTime: "05:00",
      startTime: "13:00",
      endTime: "18:00",
      hourlyWage: "9,620",
      dayWage: "48,100",
      dayTotalWage: "81,770",
      color: "#D0E6A5",
    },
    {
      todoId: 2,
      year: "2023",
      month: "01",
      date: "08",
      placeName: "영화관",
      workingTime: "05:00",
      startTime: "13:00",
      endTime: "18:00",
      hourlyWage: "9,620",
      dayWage: "48,100",
      dayTotalWage: "81,770",
      color: "#D0E6A5",
    },
    {
      todoId: 3,
      year: "2023",
      month: "01",
      date: "18",
      placeName: "카페",
      workingTime: "04:00",
      startTime: "14:00",
      endTime: "18:00",
      hourlyWage: "9,620",
      dayWage: "38,480",
      dayTotalWage: "38,480",
      color: "#FFDD94",
    },
    {
      todoId: 4,
      year: "2023",
      month: "02",
      date: "01",
      placeName: "카페",
      workingTime: "04:00",
      startTime: "14:00",
      endTime: "18:00",
      hourlyWage: "9,620",
      dayWage: "38,480",
      dayTotalWage: "38,480",
      color: "#FFDD94",
    },
  ];

  const bonus = [
    {
      year: "2023",
      month: "01",
      date: "08",
      bonus: "33,000",
      color: "#FFDD94",
    },
    {
      year: "2023",
      month: "01",
      date: "08",
      bonus: "46,000",
      color: "#D0E6A5",
    },
    {
      year: "2023",
      month: "01",
      date: "22",
      bonus: "56,000",
      color: "#FFDD94",
    },
  ];

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

      const id = `${String(day).split(" ")[3]}${dayMonth}${
        String(day).split(" ")[2]
      }`;
      // console.log(id);

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
            isSameDay(day, selectedDate)
              ? "#D1DFE8"
              : isSameDay(day, currentDay)
              ? "#EDE1E3"
              : "transparent"
          }
          onClick={() => {
            onDateClick(toDate(cloneDay));
            navigate(`/calendar/${id}`);
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
          <RenderTodos day={day} Month={Month} todos={todos} />
          <RenderBonus day={day} Month={Month} bonus={bonus} />
          <RenderDayTotal day={day} Month={Month} todos={todos} />
        </Cells>
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

  /////// 모달창 기능
  const [isOpen, setIsOpen] = useState(false);
  const dayMatch = useMatch("/calendar/:id");
  // console.log(dayMatch);
  const isMoreBtns = useRecoilValue(moreBtnsAtom);
  const isWorkplaceBtns = useRecoilValue(workplaceBtnsAtom);
  console.log(isMoreBtns);
  console.log(isWorkplaceBtns);

  return (
    <>
      <div>
        <RenderHeader
          currentMonth={currentMonth}
          prevMonth={prevMonth}
          nextMonth={nextMonth}
        />
        <RenderDays />
        <RenderCells
          currentMonth={currentMonth}
          selectedDate={selectedDate}
          onDateClick={onDateClick}
        />
        <MonthlyTotalWage>1,875,000원</MonthlyTotalWage>
      </div>

      {dayMatch && <TodosModal />}
      {isMoreBtns && <MoreBtnsModal />}
      {isWorkplaceBtns && <WorkplaceBtnsModal />}
    </>
  );
};

const CellsRow = styled.div`
  display: flex;
  &:last-child {
    border-bottom: 1px solid #adb5bd;
  }
`;

const CellsBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
`;

const Cells = styled.div<{ color: string; backgroundColor: string }>`
  width: 47px;
  height: 85px;
  padding-top: 3px;
  border-top: 1px solid ${(props) => props.color};
  background-color: ${(props) => props.backgroundColor};
  position: relative;
`;

const CellsNum = styled.span<{ color: string }>`
  color: ${(props) => props.color};
`;

const MonthlyTotalWage = styled.div`
  position: absolute;
  right: 0px;
  margin-right: 10px;
`;

const BonusWage = styled.div`
  font-size: 10px;
  display: flex;
  align-items: center;
  margin-bottom: 1px;

  div {
    width: 7px;
    height: 7px;
    margin-right: 2px;
    border-radius: 50%;
  }
`;

export default Calendar;
