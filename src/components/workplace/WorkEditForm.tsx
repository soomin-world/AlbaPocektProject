import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getWork, putWork } from "../../APIs/workApi";
import Modal from "../modal/Modal";

function WorkEditForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [editWork, setEditWork] = useState({
    placeName: "",
    salaryDay: "",
    placeColor: "",
  });
  console.log(editWork.placeColor);
  const { data, isSuccess } = useQuery(["work", id], () => getWork(id));

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
    .map((v, i) => i + 1);

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
        <img src="/image/leftArrow.png" alt="<" onClick={() => navigate("/")} />
        <h1>근무지수정</h1>
      </STHeader>
      <STBody>
        <div className="place">
          <p>어디에서 일하시나요?</p>
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
            <div className="input">
              <p>{editWork.salaryDay}</p>
              <img
                src="/image/arrowDecrease.png"
                alt="arrow"
                onClick={openModal}
              />
            </div>
            <Modal open={modalOpen} close={closeModal}>
              <STModal>
                <select
                  value={editWork.salaryDay}
                  onChange={(e) => {
                    const { value } = e.target;
                    setEditWork({
                      ...editWork,
                      salaryDay: value,
                    });
                  }}
                >
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
          <p>색상</p>
          <STColor>
            <button
              onClick={() => {
                const value = `#ef0400c6`;
                setEditWork({
                  ...editWork,
                  placeColor: value,
                });
              }}
              style={{
                backgroundColor: `#ef0400c6`,
              }}
            />
            <button
              onClick={() => {
                const value = `#f2eb73`;
                setEditWork({
                  ...editWork,
                  placeColor: value,
                });
              }}
              style={{
                backgroundColor: `#f2eb73`,
              }}
            />
            <button
              onClick={() => {
                const value = `#5FCE80`;
                setEditWork({
                  ...editWork,
                  placeColor: value,
                });
              }}
              style={{
                backgroundColor: `#5FCE80`,
              }}
            />
            <button
              onClick={() => {
                const value = `#3f74dd`;
                setEditWork({
                  ...editWork,
                  placeColor: value,
                });
              }}
              style={{
                backgroundColor: `#3f74dd`,
              }}
            />
            <button
              onClick={() => {
                const value = `#6344c9`;
                setEditWork({
                  ...editWork,
                  placeColor: value,
                });
              }}
              style={{
                backgroundColor: `#6344c9`,
              }}
            />
            <button
              onClick={() => {
                const value = `#ab51b9d7`;
                setEditWork({
                  ...editWork,
                  placeColor: value,
                });
              }}
              style={{
                backgroundColor: `#ab51b9d7`,
              }}
            />
          </STColor>
        </div>
      </STBody>
      <SaveBtn onClick={addWorkHandler}>수정하기</SaveBtn>
    </STContainer>
  );
}
const STContainer = styled.div`
  padding: 0px 17px 0px 18px;
`;

const STHeader = styled.div`
  display: flex;
  margin: 12px 0px 41.5px 0px;
  height: 35px;
  img {
    width: 24px;
    height: 24px;
  }
  h1 {
    width: 83px;
    height: 25px;
    font-size: 17px;
    font-weight: 500;
    margin-left: 102px;
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
  .place {
    p {
      font-size: 15px;
      font-weight: 500;
      margin-bottom: 15px;
    }
    input {
      width: 90%;
      height: 44px;
      background-color: #f9f9f9;
      border: 1px solid #efefef;
      border-radius: 8px;
      margin-bottom: 41px;
    }
  }
  .salary {
    margin-bottom: 30px;
    p {
      font-size: 15px;
      font-weight: 500;
      line-height: 22px;
    }
    .input {
      width: 20%;
      height: 44px;
      background-color: #f9f9f9;
      border: 1px solid #efefef;
      border-radius: 8px;
      display: flex;
      align-items: center;
      padding: 7px;
      justify-content: space-between;
      img {
        width: 18px;
        height: 18px;
      }
    }
  }
  .color {
    p {
      font-size: 15px;
      font-weight: 500;
      line-height: 22px;
      margin-bottom: 11px;
    }
  }
`;

const STColor = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 290px;
  button {
    width: 36px;
    height: 36px;
    border-radius: 100%;
    border: none;
  }
  button:hover {
    box-shadow: 0 0 0 2px grey;
  }
`;

const SaveBtn = styled.button`
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
export default WorkEditForm;
