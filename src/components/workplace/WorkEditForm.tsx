import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getWork, putWork } from "../../APIs/workApi";
import Modal from "../modal/Modal";

function WorkEditForm() {
  const { id } = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [editWork, setEditWork] = useState({
    placeName: "",
    salaryDay: "",
    placeColor: "",
  });

  const { data, isSuccess } = useQuery(["work", id], () => getWork(id));
  console.log(data);
  useEffect(() => {
    if (isSuccess) {
      setEditWork({
        placeName: data.placeName,
        salaryDay: data.salaryDay,
        placeColor: data.placeColor,
      });
    }
  }, [isSuccess]);
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
  const payload = [id, editWork];
  const addWorkHandler = () => {
    if (editWork.placeName === "") {
      alert("근무지명을 입력하세요 ");
      return;
    }
    if (editWork.salaryDay === "" || null) {
      alert("월급일을 입력해주세요");
      return;
    }
    if (editWork.placeColor === "" || null) {
      alert("색상을 선택해주세요");
      return;
    }
    mutateEditwork.mutate(payload);
  };
  console.log(editWork.salaryDay);
  const mutateEditwork = useMutation(putWork);
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
            value={editWork.placeName}
            onChange={(e) => {
              const { value } = e.target;
              setEditWork({ ...editWork, placeName: value });
            }}
          />
        </div>
        <div className="salary">
          <p>월급일</p>
          <div>
            <div>{editWork.salaryDay}</div>
            <div onClick={openModal}>🔻</div>
            <Modal open={modalOpen} close={closeModal}>
              <STModal>
                <select
                  value={editWork.salaryDay}
                  onChange={(e) => {
                    const { value } = e.target;
                    setEditWork({
                      ...editWork,
                      salaryDay: value.slice(0, -1),
                    });
                  }}
                >
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
          <select
            value={editWork.placeColor}
            onChange={(e) => {
              const { value } = e.target;
              setEditWork({ ...editWork, placeColor: value });
            }}
          >
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
              backgroundColor: `${editWork.placeColor}`,
            }}
          />
        </div>
      </STBody>
      <button onClick={addWorkHandler}>수정하기</button>
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

export default WorkEditForm;
