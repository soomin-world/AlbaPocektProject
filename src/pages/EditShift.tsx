import { TimePicker } from "antd";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { calendarAtom, calendarDayList, moreBtnsAtom } from "../atoms";
import { CalendarModal } from "./CalendarModal";
import dayjs from "dayjs";
import styled from "styled-components";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { addShift, editWork, getEditWork } from "../APIs/workApi";
import { getPost } from "../APIs/detailPostApi";
import LayOut from "../components/layout/LayOut";
import Header from "../components/header/Header";
import sweetAlert from "../util/sweetAlert";
import inputPriceFormat from "../hooks/inputComma";

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

  const { mutateAsync } = useMutation(editWork);

  const [hourlyWage, setHourlyWage] = useState(data?.hourlyWage);
  const [startTime, setStartTime] = useState(data?.startTime);
  const [endTime, setEndTime] = useState(data?.endTime);

  useEffect(() => {
    setHourlyWage(data?.hourlyWage);
    setStartTime(data?.startTime);
    setEndTime(data?.endTime);
  }, [data]);

  const work = {
    hourlyWage: Number(
      hourlyWage?.split(",").reduce((curr, acc) => curr + acc, "")
    ),
    startTime: startTime,
    endTime: endTime,
  };

  const payload = [todoId, work];

  const dayId = String(data?.workDay).split("-").join("");

  const onClickHandler = () => {
    setIsMoreBtns(false);
    mutateAsync(payload).then(() => {
      sweetAlert(1000, "success", "근무 일정이 수정되었습니다!");
      navigate(`/calendar/${dayId}/${todoId}`);
    });
  };

  return (
    <LayOut position="relative" height="100vh">
      <Header title="근무수정" padding="5% 0" marginLeft="120px" />

      <SThourlyWage>
        <label>시급</label>
        <div>
          <input
            value={inputPriceFormat(String(hourlyWage))}
            maxLength={6}
            placeholder="시급을 입력해주세요."
            onChange={(e) => setHourlyWage(inputPriceFormat(e.target.value))}
          />
          <span>원</span>
        </div>
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
          <span> ~ </span>
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

const SThourlyWage = styled.div`
  display: flex;
  flex-direction: column;
  margin: 21.5px 0px 11px 0px;
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
    padding: 10px;
    margin: 0px 10px 30px 0px;
  }
  span {
    font-weight: 500;
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
    padding: 10px;
    margin-bottom: 290px;
    font-family: "Noto Sans KR";
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
  position: fixed;
  bottom: 17px;
  cursor: pointer;
  transition: all 0.5s linear;

  &:hover {
    background-color: white;
    border: 1px solid #5fce80;
    color: #5fce80;
  }
`;

export default EditShift;
