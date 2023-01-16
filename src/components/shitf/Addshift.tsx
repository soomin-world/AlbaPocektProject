import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import DatePicker, { DateObject } from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import { Value } from "react-multi-date-picker";
import Calendar from "../../pages/Calendar";
import Modal from "../modal/Modal";
import MultiCalendar from "./MultiCalendar";

// interface IValue {
//   values: [];
// }

// export const MultiCalendar = () => {
//   const today = new DateObject();
//   const tomorrow = new Date();

//   tomorrow.setDate(tomorrow.getDate() + 1);

//   const [values, setValues] = useState<Value[]>([today]);

//   const weekDays = ["일", "월", "화", "수", "목", "금", "토"];
//   const months = [
//     "1월",
//     "2월",
//     "3월",
//     "4월",
//     "5월",
//     "6월",
//     "7월",
//     "8월",
//     "9월",
//     "10월",
//     "11월",
//     "12월",
//   ];

//   function hadleChange(date: DateObject | DateObject[]) {
//     date?.map();
//   }

//   console.log(values);

//   // useEffect(()=>{
//   //   if(typeof values){
//   //     values.map((v: DateObject) => v.format("YYYY-MM-DD"))
//   //   }
//   // },[])
//   // const workdays = values?.map((v: DateObject) => v.format("YYYY-MM-DD"));
//   // console.log(values?.map((v: DateObject) => v.format("YYYY-MM-DD")));
//   return (
//     <DatePicker
//       weekDays={weekDays}
//       months={months}
//       multiple
//       plugins={[<DatePanel />]}
//       value={[new DateObject()]}
//       onChange={hadleChange}
//       format={"YYYY-MM-DD"}
//     />
//   );
// };

function AddShift() {
  const [hourlyWage, setHourlyWage] = useState("");
  const workday: any = [];
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  console.log(modalOpen);
  const closeModal = () => {
    setModalOpen(false);
  };

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
        <div onClick={openModal}>🔻</div>
        <Modal open={modalOpen} close={closeModal}>
          <MultiCalendar />
        </Modal>
      </div>
    </div>
  );
}

export default AddShift;
