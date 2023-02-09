import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { addWork } from "../../APIs/workApi";
import sweetAlert from "../../util/sweetAlert";
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

  const mutateWork = useMutation(addWork, {
    onSuccess: () => {
      queryClient.invalidateQueries(["work"]);
    },
  });

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
      sweetAlert(1000, "error", "근무지명을 입력하세요!");
      return;
    }
    if (placeName.length > 10) {
      sweetAlert(1000, "error", "근무지명은 최대 10자까지 입력가능합니다!");
      return;
    }
    if (salaryDay === "" || null) {
      sweetAlert(1000, "error", "월급일을 입력해주세요!");
      return;
    }
    if (color === "" || null) {
      sweetAlert(1000, "error", "색상을 선택해주세요!");
      return;
    }
    mutateWork.mutateAsync(workPlaceForm).then((res) => {
      sweetAlert(1000, "success", "근무지를 추가하였습니다!");
      navigate("/");
    });
  };

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
    <LayOut position="relative" height="100vh">
      <Header title="근무지추가" padding="5% 0" marginLeft="110px" />

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
            <div className="input" onClick={openModal}>
              <p>{salaryDay}</p>
              <img src="/image/iconArrowDecrease.svg" alt="arrow" />
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
      <SaveBtn onClick={addWorkHandler}>
        <div>저장하기</div>
      </SaveBtn>
    </LayOut>
  );
}

const STBody = styled.div`
  .place {
    p {
      font-size: 15px;
      font-weight: 500;
      margin: 21px 0px 15px 0px;
    }
    input {
      font-family: "Noto Sans KR";
      font-weight: 500;
      width: 90%;
      height: 44px;
      background-color: #f9f9f9;
      border: 1px solid #efefef;
      border-radius: 8px;
      margin-bottom: 40px;
      padding-left: 10px;
    }
  }
  .salary {
    margin-bottom: 40px;
    p {
      font-size: 15px;
      font-weight: 500;
      line-height: 22px;
    }
    .input {
      width: 90px;
      height: 44px;
      background-color: #f9f9f9;
      border: 1px solid #efefef;
      border-radius: 8px;
      cursor: pointer;
      /* border-top-right-radius: 8px;
      border-top-left-radius: 8px; */
      display: flex;
      align-items: center;
      padding: 7px;
      margin-top: 15px;
      justify-content: space-between;
      p {
        margin-left: 19px;
      }
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
  width: 90px;
  height: 300px;
  margin-top: -5px;
  overflow: auto;
  animation: modal-bg-show 0.6s;
  background-color: #f9f9f9;
  border: 1px solid #efefef;
  border-top: none;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  border-top: none;
  font-weight: 500;
  font-size: 18px;
  ::-webkit-scrollbar {
    display: none; /* Chrome , Safari , Opera */
  }
  div {
    cursor: pointer;
    list-style: none;
    padding: 3px;
    text-align: center;
  }
`;

const STColor = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 290px;
  .btn {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    //  box-shadow: rgb(0 0 0 / 20%) 2px 2px 8px;
  }
  .btnactive {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: none;
    box-shadow: 0 0 0 4px #706f6f53;
    cursor: pointer;
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
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 17px;
  cursor: pointer;
  transition: all 0.3s linear;
  font-family: "Noto Sans KR";

  div {
    height: 27px;
  }

  &:hover {
    background-color: white;
    border: 1px solid #5fce80;
    color: #5fce80;
  }
`;

export default AddWorkForm;
