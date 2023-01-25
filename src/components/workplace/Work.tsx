import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getMonthlyWage } from "../../APIs/workApi";
import comma from "../../hooks/comma";
import DropDown from "../dropDown/DropDown";
import { WorkType } from "./WorkPlace";

const Work = ({ placeId, placeName, placeColor, salaryDay }: WorkType) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const today = new Date();
  const yearMonth = String(
    new Date(today.getFullYear(), today.getMonth())
  ).split(" ");
  const month = yearMonth[3] + "년" + yearMonth[2] + "월";
  const dropDownHandler = () => {
    setIsOpen(!isOpen);
  };
  const data = useQuery(["post", placeId], () => getMonthlyWage(placeId));
  window.addEventListener("scroll", () => setIsOpen(false));
  return (
    <STCard key={placeId} style={{ backgroundColor: `${placeColor}` }}>
      <div className="wrap">
        <div className="info">
          <div className="placeName">{placeName}</div>
          <div className="month">{month}</div>
        </div>
        <div>
          <img
            src="/image/dots.png"
            alt=":"
            className="button"
            onClick={() => setIsOpen(!isOpen)}
          />
          {isOpen ? (
            <DropDown
              id={placeId}
              open={isOpen}
              close={dropDownHandler}
              address={`/addwork/${placeId}`}
              deleteValue={"workPlace"}
            />
          ) : null}
        </div>
      </div>
      <div className="footer">
        <button onClick={() => navigate(`/addShift/${placeId}`)}>
          <img src="/image/Group 180.png" alt="+" />
          근무등록
        </button>
        <div className="money"> ₩ {comma(String(data?.data?.totalWage))}</div>
      </div>
    </STCard>
  );
};

const STCard = styled.div`
  width: 90%;
  height: 110px;
  border-radius: 8px;
  margin: 0px auto 20px auto;
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
      font-size: 20px;
      font-weight: 500;
    }
  }
`;

export default Work;
