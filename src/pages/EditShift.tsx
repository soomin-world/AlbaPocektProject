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
import LayOut from "../components/layout/LayOut";

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
    <LayOut>
      <STHeader>
        <img src="/image/leftArrow.png" alt="<" onClick={() => navigate("/")} />
        <h1>근무 수정</h1>
      </STHeader>
      <SThourlyWage>
        <label>시급</label>
        <input
          value={hourlyWage}
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
    margin-bottom: 390px;
  }
`;

const STButton = styled.button`
  width: 90%;
  height: 56px;
  background-color: #5fce80;
  border-radius: 8px;
  margin-left: 6%;
  border: none;
  color: white;
  font-size: 17px;
  font-weight: 500;
  line-height: 24.62px;
`;

export default EditShift;
