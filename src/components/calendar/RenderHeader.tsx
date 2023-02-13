import { format } from "date-fns";
import { Icon } from "@iconify/react";
import { IHeaderProps } from "../../types/calendar";
import styled from "styled-components";
import { forwardRef, useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import ReactDatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";

const RenderHeader = ({
  currentMonth,
  prevMonth,
  nextMonth,
  selectedMonth,
}: IHeaderProps) => {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date().toISOString().slice(0, 7));
  const [startDate, setStartDate] = useState(new Date());
  const calendarMatch = useMatch("/calendar");
  const calTodoMatch = useMatch("/calendar/:id");
  const calBtnMatch = useMatch("/calendar/:id/:todoId");

  const ExampleCustomInput = forwardRef(({ value, onClick }: any, ref: any) => (
    <Button className="example-custom-input" onClick={onClick} ref={ref}>
      {value}
      <img src="/image/iconCalendarInput.png" />
    </Button>
  ));

  return (
    <Header>
      {calendarMatch || calTodoMatch || calBtnMatch ? (
        <SelectMonth>
          <ReactDatePicker
            selected={startDate}
            onChange={(date: Date) => {
              setStartDate(date);
              selectedMonth(date);
            }}
            dateFormat="yyyy년 M월"
            showMonthYearPicker
            locale={ko}
            className="selectedMonth"
            customInput={<ExampleCustomInput />}
          />
          <img
            src="/image/iconMypage.svg"
            onClick={() => navigate("/mypage")}
          />
        </SelectMonth>
      ) : (
        <HeaderIcon>
          <img
            src="/image/iconCalendarLeftArrow.svg"
            onClick={prevMonth}
            style={{ marginRight: "7px" }}
          />
          <div>
            <HeaderText>
              <div>{format(currentMonth, "yyyy")}년</div>
              <div>{format(currentMonth, "M")}월</div>
            </HeaderText>
          </div>
          {/* <Icon icon="bi:arrow-right-circle-fill" onClick={nextMonth} /> */}
          <img src="/image/iconCalendarArrow.svg" onClick={nextMonth} />
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
`;

const HeaderText = styled.div`
  display: flex;
  div {
    font-size: 20px;
    font-weight: 500;
    height: 21px;
  }
  div:first-child {
    margin-right: 11px;
  }
  div:last-child {
    margin-right: 8px;
  }
`;

const HeaderIcon = styled.div`
  font-family: "Noto Sans KR";
  height: 16px;
  display: flex;
  align-items: center;

  img {
    margin-top: 4px;
  }
`;

const SelectMonth = styled.div`
  width: 340px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
`;

const Button = styled.button`
  width: 160px;
  height: 50px;
  font-size: 20px;
  font-family: "Noto Sans KR";
  font-weight: 500;
  border: none;
  border-radius: 8px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin-left: -30px;
  cursor: pointer;

  img {
    width: 20px;
    height: 20px;
    margin: 0;
    margin-left: 2px;
  }
`;

export default RenderHeader;
