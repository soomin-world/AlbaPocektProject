import { TimePicker } from "antd";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { calendarAtom, calendarDayList } from "../atoms";
import { CalendarModal } from "./Test";
import dayjs from "dayjs";
import styled from "styled-components";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { addShift } from "../APIs/workApi";

export type EventValue<DateType> = DateType | null;
export type RangeValue<DateType> =
  | [EventValue<DateType>, EventValue<DateType>]
  | null;

function AddShift() {
  const { id } = useParams();
  const [hourlyWage, setHourlyWage] = useState("");
  const [isCalendarBtns, setIsCalendarBtns] = useRecoilState(calendarAtom);
  const workdays = useRecoilValue(calendarDayList);
  const [workingTime, setWorkingTime] = useState<string[]>([]);
  const format = "HH:mm";
  console.log(hourlyWage);
  const onChangeHandler = (
    time: RangeValue<dayjs.Dayjs>,
    timestring: [string, string]
  ) => {
    setWorkingTime(timestring);
  };

  const work = {
    hourlyWage: hourlyWage,
    startTime: workingTime[0],
    endTime: workingTime[1],
    workDay: workdays,
  };
  console.log(work);

  const payload = [id, work];
  const mutateWork = useMutation(addShift);
  const onClickHandler = () => {
    if (!hourlyWage) {
      alert("시급을 입력해주세요!");
      return;
    } else if (workingTime === null) {
      alert("근무시간을 입력해주세요!");
      return;
    }
    if (workdays.length === 0) {
      alert("근무일자를 입력해주세요!");
    }
    mutateWork.mutate(payload);
  };
  return (
    <>
      <div className="container">
        <h1>언제 얼마나 일하시나요?</h1>
        <div className="hourlyWage">
          <label>시급</label>
          <input
            placeholder="시급을 입력해주세요"
            onChange={(e) => setHourlyWage(e.target.value)}
          />
        </div>
        <HourlyWageInput>
          <div>{workdays[0]} ...</div>
          <img
            src="/icon-calendar-check-mono.png"
            onClick={() => setIsCalendarBtns((pre) => !pre)}
            alt="달력"
          />
        </HourlyWageInput>
        {isCalendarBtns && <CalendarModal />}
        <TimeSelector className="workingTime">
          <div>근무시간</div>
          <TimePicker.RangePicker
            format={format}
            placeholder={["시작시간", "끝나는시간"]}
            onChange={onChangeHandler}
            popupStyle={{ fontWeight: "bold" }}
            bordered={true}
            minuteStep={10}
            className={"timeSelection"}
          />
        </TimeSelector>
      </div>
      <button onClick={onClickHandler}>저장하기</button>
    </>
  );
}

const TimeSelector = styled.div`
  .timeSelection {
    width: 200px;
    border: 3px solid;
    border-color: #30b130;
    background-color: #f0eeee;
  }
`;

const HourlyWageInput = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid black;
  width: 30%;
  div {
    width: 60%;
  }
`;

export default AddShift;
