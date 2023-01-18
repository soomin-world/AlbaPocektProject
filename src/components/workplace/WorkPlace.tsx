import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { deleteWork, getWorks } from "../../APIs/workApi";
import Dday from "../dDay/Dday";
import DropDown from "../dropDown/DropDown";
import Modal from "../modal/Modal";
import Work from "./Work";

export interface WorkType {
  placeName: string;
  placeColor: string;
  placeId: number;
  salaryDay: number;
}

function WorkPlace() {
  const navigate = useNavigate();
  const { data } = useQuery(["work"], getWorks);
  const queryClient = useQueryClient();
  const mutateDelete = useMutation(deleteWork, {
    onSuccess: () => {
      queryClient.invalidateQueries(["work"]);
    },
  });
  // const deleteHandler = (id: number) => {
  //   mutateDelete.mutate(id);
  //   setModalOpen(false);
  // };
  return (
    <>
      <STHeader>
        <img
          src="/image/Logo.png"
          alt="logo"
          className="logo"
          onClick={() => navigate("/")}
        />
        <div className="nav">
          <img src="/image/iconChat.png" alt="채팅" />
          <img
            src="/image/iconUser.png"
            alt="마이페이지"
            onClick={() => navigate("/mypage")}
          />
        </div>
      </STHeader>
      <Dday workList={data?.data.workList} />
      <STAdd onClick={() => navigate("/addwork")}>
        <img src="/image/Frame 12.png" alt="+" />
      </STAdd>
      {data
        ? data.data.workList.map((w: WorkType) => {
            return (
              <Work
                placeId={w.placeId}
                placeName={w.placeName}
                placeColor={w.placeColor}
                salaryDay={w.salaryDay}
              />
              // <STCard
              //   key={w.placeId}
              //   style={{ backgroundColor: `${w.placeColor}` }}
              // >
              //   <div className="wrap">
              //     <div className="info">
              //       <div className="placeName">{w.placeName}</div>
              //       <div className="month">{month}</div>
              //     </div>
              //     <div>
              //       <img
              //         src="/image/dots.png"
              //         alt=":"
              //         className="button"
              //         onClick={() => setIsOpen(!isOpen)}
              //       />
              //       {isOpen ? (
              //         <DropDown
              //           id={w.placeId}
              //           open={isOpen}
              //           close={dropDownHandler}
              //         />
              //       ) : null}
              //     </div>
              //   </div>
              //   <div className="footer">
              //     <button onClick={() => navigate(`/addShift/${w.placeId}`)}>
              //       <img src="/image/Group 180.png" alt="+" />
              //       근무등록
              //     </button>
              //     <div className="money"> ₩1,000</div>
              //   </div>
              // </STCard>
            );
          })
        : null}
    </>
  );
}

const STAdd = styled.div`
  width: 90%;
  height: 110px;
  border: 2px solid #d7d8df;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px auto 20px auto;
  border-radius: 8px;
  img {
    width: 73px;
    height: 50px;
    cursor: pointer;
  }
`;

const STCard = styled.div`
  width: 90%;
  height: 110px;
  border-radius: 8px;
  margin: 10px auto 20px auto;
  color: #ffffff;
  padding: 10px;
  .info {
    width: 106px;
    height: 43px;
    font-weight: 500;
    .placeName {
      font-size: 17px;
    }
    .month {
      font-size: 13px;
    }
  }

  .button {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
  .wrap {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .footer {
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
    button {
      width: 75px;
      height: 29px;
      font-size: 13px;
      color: white;
      background-color: transparent;
      border: none;
      display: flex;
      gap: 1px;
      font-weight: 500;
      cursor: pointer;
      img {
        width: 17px;
        height: 17px;
      }
    }
    div {
      display: flex;
      justify-content: flex-end;
      width: 111px;
      height: 29px;
      font-size: 24px;
      font-weight: 500;
    }
  }
`;

const STHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 20px 20px 20px 20px;
  .nav {
    gap: 15px;
    display: flex;
    height: 24px;
    width: 63px;
    cursor: pointer;
  }
  .logo {
    width: 39px;
    height: 19px;
    cursor: pointer;
  }
`;
export default WorkPlace;
