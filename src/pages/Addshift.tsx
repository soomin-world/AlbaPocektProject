import { useState } from "react";
import { useRecoilState } from "recoil";
import { calendarAtom } from "../atoms";
import { CalendarModal } from "./Test";

function AddShift() {
  const [hourlyWage, setHourlyWage] = useState("");
  const [isCalendarBtns, setIsCalendarBtns] = useRecoilState(calendarAtom);
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
      <button onClick={() => setIsCalendarBtns((pre) => !pre)}>달력</button>
      {isCalendarBtns && <CalendarModal />}
    </div>
  );
}

export default AddShift;
