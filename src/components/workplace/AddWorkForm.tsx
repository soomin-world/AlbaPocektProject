import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { addWork, getWork } from "../../APIs/workApi";
import Modal from "../modal/Modal";
import { WorkType } from "./WorkPlace";

function AddWorkForm() {
  const { id } = useParams();
  const [placeName, setPlaceName] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [salaryDay, setSalaryday] = useState("");
  const [color, setColor] = useState("");
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  let i = 0;
  const days = Array(31)
    .fill(i)
    .map((v, i) => i + 1 + "일");
  const workPlaceForm = {
    placeName: placeName,
    salaryDay: salaryDay.slice(0, -1),
    placeColor: color,
  };
  const queryClient = useQueryClient();
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
  console.log(color);
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
            <div>{salaryDay}</div>
            <div onClick={openModal}>🔻</div>
            <Modal open={modalOpen} close={closeModal}>
              <STModal>
                <select onChange={(e) => setSalaryday(e.target.value)}>
                  {days.map((day, i) => {
                    return (
                      <option key={i} value={day}>
                        {day}
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

          <STColor>
            <button
              onClick={() => {
                const value = `#ef0400c6`;
                setColor(value);
              }}
              style={{
                backgroundColor: `#ef0400c6`,
              }}
            />
            <button
              onClick={() => {
                const value = `#b2c34f`;
                setColor(value);
              }}
              style={{
                backgroundColor: `#b2c34f`,
              }}
            />
            <button
              onClick={() => {
                const value = `#70d683`;
                setColor(value);
              }}
              style={{
                backgroundColor: `#70d683`,
              }}
            />
            <button
              onClick={() => {
                const value = `#3f74dd`;
                setColor(value);
              }}
              style={{
                backgroundColor: `#3f74dd`,
              }}
            />
            <button
              onClick={() => {
                const value = `#6344c9`;
                setColor(value);
              }}
              style={{
                backgroundColor: `#6344c9`,
              }}
            />
            <button
              onClick={() => {
                const value = `#ab51b9d7`;
                setColor(value);
              }}
              style={{
                backgroundColor: `#ab51b9d7`,
              }}
            />
          </STColor>
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
  div {
    width: 30%;
  }
`;

const STBody = styled.div`
  border: 1px solid black;
`;

const STColor = styled.div`
  display: flex;
  gap: 10px;
  button {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 100%;

    button:hover {
      background: #353535c6;
    }
  }
`;
export default AddWorkForm;
