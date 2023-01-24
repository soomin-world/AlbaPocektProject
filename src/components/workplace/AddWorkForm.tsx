import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { addWork } from "../../APIs/workApi";
import SalaryDropDown from "../dropDown/SalaryDropDown";
import Modal from "../modal/Modal";

function AddWorkForm() {
  const { id } = useParams();
  const [placeName, setPlaceName] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [salaryDay, setSalaryday] = useState("");
  const [color, setColor] = useState("");
  const [isClicked, setIsClicked] = useState("");
  const colors = [
    "#ee9071",
    "#F6E279",
    "#5FCE80",
    "#6290F0",
    "#6532E9",
    "#ab51b9d7",
  ];
  const openModal = () => {
    setModalOpen(!modalOpen);
  };

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
  console.log(color);
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
  const onColorClick = (i: number, v: string) => {
    setIsClicked(String(i));
    setColor(v);
  };
  const navigate = useNavigate();
  return (
    <STContainer>
      <STHeader>
        <img src="/image/leftArrow.png" alt="<" onClick={() => navigate("/")} />
        <h1>근무지추가</h1>
      </STHeader>
      <STBody>
        <div className="place">
          <p>어디에서 일하시나요?</p>
          <input
            placeholder=" 근무지명"
            type="text"
            onChange={(e) => setPlaceName(e.target.value)}
          />
        </div>
        <div className="salary">
          <p>월급일</p>
          <div>
            <div className="input">
              <p>{salaryDay}</p>
              <img
                src="/image/arrowDecrease.png"
                alt="arrow"
                onClick={openModal}
              />
            </div>
            <Modal open={modalOpen} close={closeModal}>
              <STModal>
                <select onChange={(e) => setSalaryday(e.target.value)}>
                  <option defaultValue={""}>월급!</option>
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
            {colors.map((v, i) => {
              return (
                <button
                  value={v}
                  className={"btn" + (String(i) === isClicked ? "active" : "")}
                  style={{
                    backgroundColor: v,
                  }}
                  onClick={() => onColorClick(i, v)}
                />
              );
            })}
          </STColor>
        </div>
      </STBody>
      <SaveBtn onClick={addWorkHandler}>저장하기</SaveBtn>
    </STContainer>
  );
}

const STContainer = styled.div``;

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
    select {
      background-color: #f9f9f9;
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
  .btn {
    width: 36px;
    height: 36px;
    border-radius: 100%;
    border: none;
  }
  .btnactive {
    width: 36px;
    height: 36px;
    border-radius: 100%;
    border: none;
    box-shadow: 0 0 0 2px #777877;
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
export default AddWorkForm;
