import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import DatePicker, { DateObject } from "react-multi-date-picker";
import type { Value } from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import { workDays } from "../../atoms";

export const MultiCalendar = () => {
  const today = new DateObject();
  const st = today.format("YYYY-MM-DD");
  const [values, setValues] = useState<Value>([today]);
  const weekDays = ["일", "월", "화", "수", "목", "금", "토"];
  const months = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];
  // useEffect(()=>{
  //   if(typeof values){
  //     values.map((v: DateObject) => v.format("YYYY-MM-DD"))
  //   }
  // },[])
  // const workdays = values?.map((v: DateObject) => v.format("YYYY-MM-DD"));
  console.log(values);
  return (
    <DatePicker
      weekDays={weekDays}
      months={months}
      multiple
      plugins={[<DatePanel />]}
      value={values}
      onChange={setValues}
    />
  );
};

function AddShift() {
  const [hourlyWage, setHourlyWage] = useState("");
  const workday: any = [];

  return (
    <div className="container">
      <h1>언제 얼마나 일하시나요?</h1>
      <div className="hourlyWage">
        <label>시급</label>
        <input
          placeholder="₩9,620"
          onChange={(e) => console.log(e.target.value)}
        />
      </div>
      <div className="workDay">
        <label>근무날짜</label>
        <div>
          {workday[0]}외 {workday.length - 1}일
        </div>
        <MultiCalendar />
      </div>
    </div>
  );
}

export default AddShift;
