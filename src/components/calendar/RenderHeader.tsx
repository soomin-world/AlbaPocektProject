import { format } from "date-fns";
import { Icon } from "@iconify/react";
import { IHeaderProps } from "../../types/calendar";
import styled from "styled-components";
import { useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";

const RenderHeader = ({
  currentMonth,
  prevMonth,
  nextMonth,
  selectedMonth,
}: IHeaderProps) => {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date().toISOString().slice(0, 7));
  const calendarMatch = useMatch("/calendar");
  const calTodoMatch = useMatch("/calendar/:id");
  const calBtnMatch = useMatch("/calendar/:id/:todoId");

  return (
    <Header>
      {calendarMatch || calTodoMatch || calBtnMatch ? (
        <SelectMonth className="header">
          <input
            type="month"
            id="monthInput"
            value={date}
            onChange={(e) => {
              console.log(e.target.value);
              setDate(() => e.target.value);
              selectedMonth(new Date(e.target.value));
            }}
          />
          <img
            src="/image/iconMypage.png"
            onClick={() => navigate("/mypage")}
          />
        </SelectMonth>
      ) : (
        <HeaderIcon>
          <Icon
            icon="bi:arrow-left-circle-fill"
            onClick={prevMonth}
            style={{ marginRight: "9px" }}
          />
          <div>
            <HeaderText>
              <div>{format(currentMonth, "yyyy")}년</div>
              <div>{format(currentMonth, "M")}월</div>
            </HeaderText>
          </div>
          <Icon icon="bi:arrow-right-circle-fill" onClick={nextMonth} />
        </HeaderIcon>
      )}
    </Header>
  );
};

const Header = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 10px 0px 10px;

  /* div:first-child {
    margin-right: 10px;
  } */
`;

const HeaderText = styled.div`
  display: flex;
  div {
    font-size: 20px;
    font-weight: 500;
    height: 21px;
  }
  div:first-child {
    margin-right: 10px;
  }
  div:last-child {
    margin-right: 8px;
  }
`;

const HeaderIcon = styled.div`
  height: 16px;
  display: flex;
  align-items: center;
`;

const SelectMonth = styled.div`
  width: 340px;
  display: flex;
  justify-content: space-between;

  input {
    width: 140px;
    min-height: 29px;
    font-size: 20px;
    font-weight: 500;
    font-family: "Noto Sans KR";
    height: 21px;
    border: none;
    background: url("image/iconCalendarInput.png") no-repeat right 3px center /
      24px auto;
  }
  input[type="month"]::-webkit-inner-spin-button,
  input[type="month"]::-webkit-calendar-picker-indicator {
    background: transparent;
    -webkit-appearance: none;
  }
  input:focus {
    outline: none;
  }

  img {
    width: 24px;
    height: 24px;
  }
`;
export default RenderHeader;
