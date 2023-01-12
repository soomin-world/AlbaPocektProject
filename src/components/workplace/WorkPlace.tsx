import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getWorks } from "../../APIs/workApi";
import Dday from "../dDay/Dday";
import DropDown from "../dropDown/DropDown";

export interface WorkType {
  placeName: string;
  placeColor: string;
  placeId: number;
  salaryDay: number;
}

function WorkPlace() {
  const navigate = useNavigate();
  const { data } = useQuery(["work"], getWorks);
  const [isOpen, setIsOpen] = useState(false);
  console.log(data);
  return (
    <STContainer>
      <STHeader>
        <div className="logo">로고</div>
        <div className="nav">
          <img src="/iconChat.png" alt="채팅" />
          <img src="/iconUser.png" alt="마이페이지" />
        </div>
      </STHeader>
      <Dday workList={data?.data.workList} />
      <STAdd onClick={() => navigate("/addwork")}>
        <h2>+ 근무지추가</h2>
      </STAdd>
      {data
        ? data.data.workList.map((w: WorkType) => {
            return (
              <STCard
                key={w.placeId}
                style={{ backgroundColor: `${w.placeColor}` }}
              >
                <div className="wrap">
                  <div className="info">
                    <div>{w.placeName}</div>
                    <div>23.01.16~23.02.15</div>
                  </div>
                  <ul
                    className="button"
                    onBlur={() => setIsOpen(false)}
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    {/* 모달로 변경  */}⋮{isOpen && <DropDown id={w.placeId} />}
                  </ul>
                </div>
                <div className="footer">
                  <button onClick={() => navigate(`/addShift/${w.placeId}`)}>
                    근무추가
                  </button>
                  <div className="money"> ₩1,000</div>
                </div>
              </STCard>
            );
          })
        : null}
    </STContainer>
  );
}

const STContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: auto;
  min-height: 100%;
  padding-bottom: 100px;
`;

const STAdd = styled.div`
  width: 70%;
  height: 100px;
  border: 2px solid grey;
  display: flex;
  justify-content: center;
  padding-top: 35px;
  border-radius: 10px;
  margin: 30px auto 30px auto;
  h2 {
    cursor: pointer;
  }
`;

// const STDday = styled.div`
//   width: 70%;
//   height: 100px;
//   border: 2px solid grey;
//   display: flex;
//   justify-content: center;
//   padding-top: 35px;
//   border-radius: 10px;
//   margin: 30px auto 30px auto;
//   h2 {
//     cursor: pointer;
//   }
// `;

const STCard = styled.div`
  width: 70%;
  height: 100px;
  border: 2px solid transparent;
  border-radius: 10px;
  margin: 30px auto 20px auto;
  color: white;
  font-weight: bold;
  padding: 5px;
  font-size: 13px;
  .button {
    font-weight: bold;
  }
  .wrap {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
  }
  .footer {
    display: flex;
    justify-content: space-between;
    button {
      border: 1px solid transparent;
      width: 50px;
      height: 25px;
      font-size: 10px;
      border-radius: 10px;
      background-color: #ffffff84;
    }
    .money {
      display: flex;
      justify-content: flex-end;
      font-size: 23px;
      font-weight: bold;
    }
  }
`;

const STHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 50px;
  margin-bottom: 20px;
  padding: 10px;
  .nav {
    display: flex;
  }
`;
export default WorkPlace;
