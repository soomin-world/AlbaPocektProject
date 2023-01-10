import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { format, addMonths, subMonths, toDate } from "date-fns";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from "date-fns";
import { isSameMonth, isSameDay, addDays, parse } from "date-fns";
import styled from "styled-components";
import { stringify } from "querystring";

type IHeaderProps = {
  currentMonth: Date;
  prevMonth: () => Date;
  nextMonth: () => Date; // 부모컴포넌트에서 import 해온 타입을 재사용 해 줍시다.
};

type ICellsProps = {
  currentMonth: Date;
  selectedDate: Date;
  onDateClick: (day: Date) => Date; // 부모컴포넌트에서 import 해온 타입을 재사용 해 줍시다.
};

type ITodosProps = {
  day: Date;
  Month: string;
  todos: ITodos[];
};

type ITodos = {
  todoId: number;
  year: string;
  month: string;
  date: string;
  placeName: string;
  workingTime: string;
  range: { startTime: string; endTime: string };
  hourlyWage: string;
  dayWage: string;
  dayTotalWage: string;
  color: string;
};

const RenderHeader = ({ currentMonth, prevMonth, nextMonth }: IHeaderProps) => {
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

const RenderTodos = ({ day, Month, todos }: ITodosProps) => {
  const key = ["15", "18"];
  // console.log(day);
  const date = String(day).split(" ");
  // console.log(date);
  const todoList = [];

  // console.log(date[2] === "15");
  // console.log(Month);
  // if (Month)
  // 현재 달에 해당하지 않으면 표시 X...다음달에 표시 X
  for (const todo of todos) {
    if (
      todo.date === date[2] &&
      todo.month === Month &&
      todo.year === date[3]
    ) {
      todoList.push(
        <CellTodo key={todo.todoId} color={todo.color}>
          {todo.placeName}
        </CellTodo>
      );
    }
  }
  return <div>{todoList}</div>;
};

const RenderDayTotal = ({ day, Month, todos }: ITodosProps) => {
  const dayMonth = format(day, "M");
  console.log(dayMonth);
  return <DayTotal>최종금액</DayTotal>;
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

  // 예시 데이터
  const todos = [
    {
      todoId: 1,
      year: "2023",
      month: "1",
      date: "05",
      placeName: "카페",
      workingTime: "03:30",
      range: { startTime: "09:00", endTime: "12:30" },
      hourlyWage: "9,620",
      dayWage: "33,670",
      dayTotalWage: "81,770",
      color: "#FFDD94",
    },
    {
      todoId: 2,
      year: "2023",
      month: "1",
      date: "05",
      placeName: "영화관",
      workingTime: "05:00",
      range: { startTime: "13:00", endTime: "18:00" },
      hourlyWage: "9,620",
      dayWage: "48,100",
      dayTotalWage: "81,770",
      color: "#D0E6A5",
    },
    {
      todoId: 3,
      year: "2023",
      month: "1",
      date: "18",
      placeName: "카페",
      workingTime: "04:00",
      range: { startTime: "14:00", endTime: "18:00" },
      hourlyWage: "9,620",
      dayWage: "38,480",
      dayTotalWage: "38,480",
      color: "#FFDD94",
    },
    {
      todoId: 4,
      year: "2023",
      month: "2",
      date: "25",
      placeName: "카페",
      workingTime: "04:00",
      range: { startTime: "14:00", endTime: "18:00" },
      hourlyWage: "9,620",
      dayWage: "38,480",
      dayTotalWage: "38,480",
      color: "#FFDD94",
    },
  ];

  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = "";
  let currentDay = new Date();
  // const Month = format(currentMonth, "M");
  // console.log(currentDay);

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, "d");
      const cloneDay = day;
      const date = String(day);
      const Month = format(currentMonth, "M");
      days.push(
        <Cells
          key={date}
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
          onClick={() => onDateClick(toDate(cloneDay))}
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

const Cells = styled.div<{ color: string; backgroundColor: string }>`
  width: 47px;
  height: 85px;
  padding-top: 2px;
  border-top: 1px solid ${(props) => props.color};
  background-color: ${(props) => props.backgroundColor};
  position: relative;
`;

const CellsNum = styled.span<{ color: string }>`
  color: ${(props) => props.color};
`;

const CellTodo = styled.div<{ color: string }>`
  width: 45px;
  height: 15px;
  margin-bottom: 2px;
  border-radius: 3px;
  background-color: ${(props) => props.color};
  font-size: small;
`;

const DayTotal = styled.div`
  font-size: 10px;
  position: absolute;
  left: 0px;
  bottom: 0px;
`;
export default Calendar;
