import { TimePicker } from "antd";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { calendarAtom, calendarDayList, moreBtnsAtom } from "../atoms";
import { CalendarModal } from "./Test";
import dayjs from "dayjs";
import styled from "styled-components";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { addShift, editWork, getEditWork } from "../APIs/workApi";
import { getPost } from "../APIs/detailPostApi";

interface IEditWork {
  endTime: string;
  hourlyWage: string;
  startTime: string;
  workDay: string;
}

function EditShift() {
  const navigate = useNavigate();
  const setIsMoreBtns = useSetRecoilState(moreBtnsAtom);

  const { todoId } = useParams();

  const { data } = useQuery<IEditWork>(["editWork", todoId], () =>
    getEditWork(todoId)
  );
  console.log(data);

  const { mutate } = useMutation(editWork);

  const [hourlyWage, setHourlyWage] = useState(data?.hourlyWage);
  const [startTime, setStartTime] = useState(data?.startTime);
  const [endTime, setEndTime] = useState(data?.endTime);

  useEffect(() => {
    setHourlyWage(data?.hourlyWage);
    setStartTime(data?.startTime);
    setEndTime(data?.endTime);
  }, [data]);

  const work = {
    hourlyWage: hourlyWage,
    startTime: startTime,
    endTime: endTime,
  };

  const payload = [todoId, work];

  const onClickHandler = () => {
    console.log(work);
    mutate(payload);
    setIsMoreBtns(false);
    navigate(-1);
  };

  return (
    <>
      <STContainer>
        <div className="hourlyWage">
          <label>시급</label>
          <input
            value={hourlyWage}
            placeholder="시급을 입력해주세요"
            onChange={(e) => setHourlyWage(e.target.value)}
          />
        </div>

        <TimeSelector className="workingTime">
          <div>근무시간</div>
          <input
            type="time"
            value={startTime}
            onChange={(e) => {
              setStartTime(e.target.value);
            }}
          />
          <span> ~ </span>
          <input
            type="time"
            value={endTime}
            onChange={(e) => {
              setEndTime(e.target.value);
            }}
          />
        </TimeSelector>
        <button onClick={onClickHandler}>저장하기</button>
      </STContainer>
    </>
  );
}

const STContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const TimeSelector = styled.div`
  margin-bottom: 300px;
`;

const WorkDayInput = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid black;
  width: 90%;
  div {
    width: 60%;
  }
`;

export default EditShift;
