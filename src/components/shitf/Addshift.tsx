import { useState } from "react";
import Modal from "../modal/Modal";

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
        <Modal open={modalOpen} close={closeModal}></Modal>
      </div>
    </div>
  );
}

export default AddShift;
