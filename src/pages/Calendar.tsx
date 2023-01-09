import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { format, addMonths, subMonths } from "date-fns";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from "date-fns";
import { isSameMonth, isSameDay, addDays, parse } from "date-fns";
import styled from "styled-components";

type ICalendarProps = {
  currentMonth: Date;
  prevMonth: () => Date;
  nextMonth: () => Date; // 부모컴포넌트에서 import 해온 타입을 재사용 해 줍시다.
};

const RenderHeader = ({
  currentMonth,
  prevMonth,
  nextMonth,
}: ICalendarProps) => {
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
  return (
    <div className="calendar">
      <RenderHeader
        currentMonth={currentMonth}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
      />
      <RenderDays />
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
    margin: 0px 10px 0px 0px;
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
`;
export default Calendar;
