import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { format, addMonths, subMonths, toDate } from "date-fns";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from "date-fns";
import { isSameMonth, isSameDay, addDays, parse } from "date-fns";
import styled from "styled-components";

type ICalendarHeaderProps = {
  currentMonth: Date;
  prevMonth: () => Date;
  nextMonth: () => Date; // 부모컴포넌트에서 import 해온 타입을 재사용 해 줍시다.
};

type ICalendarCellsProps = {
  currentMonth: Date;
  selectedDate: Date;
  onDateClick: (day: Date) => Date; // 부모컴포넌트에서 import 해온 타입을 재사용 해 줍시다.
};

const RenderHeader = ({
  currentMonth,
  prevMonth,
  nextMonth,
}: ICalendarHeaderProps) => {
  return (
    <Header>
      <div>
        <HeaderText>
          <span>{format(currentMonth, "M")}월</span>
          <span>{format(currentMonth, "yyyy")}</span>
        </HeaderText>
      </div>
      <HeaderIcon>
        <Icon
          icon="bi:arrow-left-circle-fill"
          onClick={prevMonth}
          style={{ marginRight: "4px" }}
        />
        <Icon icon="bi:arrow-right-circle-fill" onClick={nextMonth} />
      </HeaderIcon>
    </Header>
  );
};

const RenderDays = () => {
  const days = [];
  const date = ["Sun", "Mon", "Thu", "Wed", "Thrs", "Fri", "Sat"];

  for (let i = 0; i < 7; i++) {
    days.push(<div key={i}>{date[i]}</div>);
  }

  return <Days>{days}</Days>;
};

const RenderCells = ({
  currentMonth,
  selectedDate,
  onDateClick,
}: ICalendarCellsProps) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  // 예시 데이터
  const todos = [
    { day: "18", workplace: "카페", workHours: "3시간", range: [3, 6] },
    { day: "22", workplace: "영화관", workHours: "5시간", range: [2, 7] },
  ];
  // const TodosLength = todos.length;

  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = "";

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, "d");
      const cloneDay = day;
      days.push(
        <Cells
          color={`${
            !isSameMonth(day, monthStart)
              ? "blue"
              : isSameDay(day, selectedDate)
              ? "red"
              : format(currentMonth, "M") !== format(day, "M")
              ? "blue"
              : "black"
          }`}
          onClick={() => onDateClick(toDate(cloneDay))}
        >
          <CellsNum
            color={
              format(currentMonth, "M") !== format(day, "M") ? "blue" : "black"
            }
          >
            {formattedDate}
          </CellsNum>

          {/* <CellTodo>양치하기</CellTodo> */}
        </Cells>
      );
      day = addDays(day, 1);
    }
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

  return (
    <div className="calendar">
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
    </div>
  );
};

const Header = styled.div`
  width: 100%;
  height: 50px;
  border: 2px solid black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 10px 0px 10px;
  div:first-child {
    margin-right: 10px;
  }
`;

const HeaderText = styled.div`
  span {
    font-size: 20px;
  }
  span:first-child {
    margin-right: 10px;
  }
`;

const HeaderIcon = styled.div`
  height: 16px;
`;

const Days = styled.div`
  margin: 5px 0px 5px 0px;
  display: flex;
  justify-content: space-around;
  font-size: 18px;
`;

const CellsRow = styled.div`
  display: flex;
`;

const CellsBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
`;

const Cells = styled.div<{ color: string }>`
  width: 47px;
  height: 60px;
  border: 1px solid ${(props) => props.color};
`;

const CellsNum = styled.span<{ color: string }>`
  color: ${(props) => props.color};
`;

const CellTodo = styled.div`
  width: 45px;
  height: 15px;
  background-color: aquamarine;
  font-size: small;
`;
export default Calendar;
