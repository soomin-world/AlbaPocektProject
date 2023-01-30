import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { addWork } from "../../APIs/workApi";
import Header from "../header/Header";
import LayOut from "../layout/LayOut";

function AddWorkForm() {
  const { id } = useParams();
  const [placeName, setPlaceName] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [salaryDay, setSalaryday] = useState<string | undefined>("");
  const [color, setColor] = useState("");
  const [isClicked, setIsClicked] = useState("");
  const colors = ["#FFB69E", "#FDE569", "#6CDA8D", "#9BBCFF", "#AB8CFE"];
  const openModal = () => {
    setModalOpen(!modalOpen);
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
  const onSalaryClick = (e: any) => {
    setSalaryday(e.currentTarget.textContent?.replace("일", ""));
    setModalOpen(false);
  };
  const navigate = useNavigate();
  return (
    <LayOut position="relative">
      <Header title={"근무지추가"} />

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
            {modalOpen ? (
              <DropDown>
                {days.map((day, i) => {
                  return (
                    <div key={i} onClick={(e) => onSalaryClick(e)}>
                      {day}
                    </div>
                  );
                })}
              </DropDown>
            ) : null}
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
    </LayOut>
  );
}

const STBody = styled.div`
  .place {
    p {
      font-size: 15px;
      font-weight: 500;
      margin: 21.5px 0px 15px 0px;
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
      border-bottom: none;
      border-top-right-radius: 8px;
      border-top-left-radius: 8px;
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
const DropDown = styled.div`
  position: absolute;
  z-index: 999;
  padding: 5px;
  color: #8f8b8b;
  //margin-top: px;
  width: 70px;
  height: 150px;
  overflow: auto;
  animation: modal-bg-show 0.6s;
  background-color: #f9f9f9;
  border: 1px solid #efefef;
  border-top: none;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  border-top: none;
  font-weight: 500;
  ::-webkit-scrollbar {
    display: none; /* Chrome , Safari , Opera */
  }
  div {
    list-style: none;
    padding: 3px;
    text-align: center;
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
    box-shadow: 0 0 0 2px #888888;
  }
`;

const SaveBtn = styled.button`
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
`;
export default AddWorkForm;
