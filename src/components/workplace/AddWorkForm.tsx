import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { addWork } from "../../APIs/workApi";
import Modal from "../modal/Modal";

function AddWorkForm() {
  const { id } = useParams();
  const [placeName, setPlaceName] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [salaryDay, setSalaryday] = useState("");
  const [color, setColor] = useState("");
  const openModal = () => {
    setModalOpen(true);
  };
  console.log(modalOpen);
  const closeModal = () => {
    setModalOpen(false);
  };
  let i = 0;
  const days = Array(31)
    .fill(i)
    .map((v, i) => i + 1);
  const workPlaceForm = {
    placeName: placeName,
    salaryDay: salaryDay,
    placeColor: color,
  };
  const queryClient = useQueryClient();
  console.log(workPlaceForm);
  const addWorkHandler = () => {
    if (placeName === "") {
      alert("근무지명을 입력하세요 ");
      return;
    }
    if (salaryDay === "" || null) {
      alert("월급일을 입력해주세요");
      return;
    }
    if (color === "" || null) {
      alert("색상을 선택해주세요");
      return;
    }
    mutateWork.mutate(workPlaceForm);
  };
  const mutateWork = useMutation(addWork, {
    onSuccess: () => {
      queryClient.invalidateQueries(["work"]);
    },
  });
  return (
    <STContainer>
      <STHeader>
        <div> &lt; </div>
        <h1>근무지추가</h1>
      </STHeader>
      <STBody>
        <div className="place">
          <p>어디서 일하시나요?</p>
          <input
            placeholder="근무지명"
            type="text"
            onChange={(e) => setPlaceName(e.target.value)}
          />
        </div>
        <div className="salary">
          <p>월급일</p>
          <div>
            <div>{salaryDay} 일</div>
            <div onClick={openModal}>🔻</div>
            <Modal open={modalOpen} close={closeModal}>
              <STModal>
                <select onChange={(e) => setSalaryday(e.target.value)}>
                  {days.map((day, i) => {
                    return (
                      <option key={i} value={day}>
                        {day}일
                      </option>
                    );
                  })}
                </select>
              </STModal>
            </Modal>
          </div>
        </div>
        <div className="color">
          <span>색상</span>
          <select onChange={(e) => setColor(e.target.value)}>
            <option defaultValue={""}>색상선택</option>
            <option value="#e6d05f">노란색</option>
            <option value="#256b96">파란색</option>
            <option value="#6d6c6b">회색</option>
            <option value="#e0523f">빨간색</option>
            <option value="#3abc7b">초록색</option>
          </select>

          <div
            style={{
              borderRadius: "100%",
              border: "1px solid black",
              width: "1rem",
              height: "1rem",
              backgroundColor: `${color}`,
            }}
          />
        </div>
      </STBody>
      <button onClick={addWorkHandler}>저장하기</button>
    </STContainer>
  );
}

const STContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 5%;
  width: 80%;
  margin-left: 10%;
  border: 1px solid black;
`;

const STHeader = styled.div`
  display: flex;
  border: 1px solid black;
  div {
  }
`;

const STModal = styled.div`
  width: 90%;
  select {
    width: 100%;
    border-radius: 10px;
  }
`;

const STBody = styled.div`
  border: 1px solid black;
`;

export default AddWorkForm;
