import { TimePicker } from "antd";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { calendarAtom, calendarDayList } from "../atoms";
import { CalendarModal } from "./Test";
import dayjs from "dayjs";
import styled from "styled-components";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { addShift } from "../APIs/workApi";
import LayOut from "../components/layout/LayOut";

export type EventValue<DateType> = DateType | null;
export type RangeValue<DateType> =
  | [EventValue<DateType>, EventValue<DateType>]
  | null;

function AddShift() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [hourlyWage, setHourlyWage] = useState("");
  const [isCalendarBtns, setIsCalendarBtns] = useRecoilState(calendarAtom);
  const workdays = useRecoilValue(calendarDayList);
  const [workingTime, setWorkingTime] = useState<string[]>([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const onChangeHandler = (
    time: RangeValue<dayjs.Dayjs>,
    timestring: [string, string]
  ) => {
    setWorkingTime(timestring);
  };

  const work = {
    hourlyWage: Number(hourlyWage),
    startTime: startTime,
    endTime: endTime,
    workDay: workdays,
  };

  const payload = [id, work];
  const mutateWork = useMutation(addShift);
  const onClickHandler = () => {
    if (isNaN(work.hourlyWage)) {
      alert("시급을 입력해주세요!");
      return;
    } else if (workingTime === null) {
      alert("근무시간을 입력해주세요!");
      return;
    }
    if (workdays.length === 0) {
      alert("근무일자를 입력해주세요!");
      return;
    }
    mutateWork.mutate(payload);
    // navigate(-1);
  };
  console.log(workdays[0]);
  return (
    <LayOut position="relative">
      <STHeader>
        <img src="/image/leftArrow.png" alt="<" onClick={() => navigate("/")} />
        <h1>근무 등록</h1>
      </STHeader>
      <STLabel>
        <h1>날짜</h1>
      </STLabel>
      <WorkDayInput>
        <div>
          {workdays[0]
            ? workdays[0].slice(4, 6) + "." + workdays[0].slice(6, 8)
            : null}
          {workdays[1]
            ? "/" +
              workdays[1].slice(4, 6) +
              "." +
              workdays[1].slice(6, 8) +
              "..."
            : null}
        </div>
        <img
          src="/image/calendar.png"
          onClick={() => setIsCalendarBtns((pre) => !pre)}
          alt="달력"
        />
      </WorkDayInput>
      {isCalendarBtns && <CalendarModal />}
      <SThourlyWage>
        <label>시급</label>
        <input
          placeholder="시급을 입력해주세요"
          onChange={(e) => setHourlyWage(e.target.value)}
        />
      </SThourlyWage>

      <TimeSelector className="workingTime">
        <label>근무시간</label>
        <div>
          <input
            type="time"
            value={startTime}
            onChange={(e) => {
              setStartTime(e.target.value);
            }}
          />
          <span> - </span>
          <input
            type="time"
            value={endTime}
            onChange={(e) => {
              setEndTime(e.target.value);
            }}
          />
        </div>
      </TimeSelector>
      <STButton onClick={onClickHandler}>저장하기</STButton>
    </LayOut>
  );
}

const STHeader = styled.div`
  display: flex;
  margin: 12px 0px 41.5px 0px;
  height: 35px;
  img {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
  h1 {
    width: 83px;
    height: 25px;
    font-size: 17px;
    font-weight: 500;
    margin-left: 102px;
  }
`;
const STLabel = styled.div`
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 11px;
`;

const WorkDayInput = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid #efefef;
  border-radius: 8px;
  background-color: #f9f9f9;
  width: 100%;
  height: 44px;
  align-items: center;
  padding: 10px;
  margin-bottom: 30px;
  img {
    width: 18px;
    height: 18px;
  }
`;

const SThourlyWage = styled.div`
  display: flex;
  flex-direction: column;
  label {
    font-size: 15px;
    font-weight: 500;
    margin-bottom: 15px;
  }
  input {
    width: 159.78px;
    height: 44px;
    border-radius: 8px;
    background-color: #f9f9f9;
    border: 1px solid #efefef;
    font-size: 15px;
    font-weight: 500;
    padding: 5px;
    margin-bottom: 30px;
  }
`;
const TimeSelector = styled.div`
  display: flex;
  flex-direction: column;
  label {
    font-size: 15px;
    font-weight: 500;
    margin-bottom: 15px;
  }
  input {
    width: 159.78px;
    height: 44px;
    border-radius: 8px;
    background-color: #f9f9f9;
    border: 1px solid #efefef;
    font-size: 15px;
    font-weight: 500;
    padding: 5px;
    margin-bottom: 290px;
  }
`;

const STButton = styled.button`
  width: 340px;
  height: 56px;
  background-color: #5fce80;
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 17px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 17px;
  bottom: 17px;
`;

export default AddShift;
