import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getWorks } from "../../APIs/workApi";
import { WorkType } from "../../types/workType";
import Dday from "../dDay/Dday";
import MainHeader from "../header/MainHeader";
import Work from "./Work";

function WorkPlace() {
  const navigate = useNavigate();
  const { data } = useQuery(["work"], getWorks);

  return (
    <>
      <MainHeader />
      <Dday workList={data?.data.workList} />

      {data
        ? data.data.workList.map((w: WorkType) => {
            return (
              <Work
                key={w.placeId}
                placeId={w.placeId}
                placeName={w.placeName}
                placeColor={w.placeColor}
                salaryDay={w.salaryDay}
              />
            );
          })
        : null}

      <STAdd onClick={() => navigate("/addwork")}>
        <img src="/image/iconPlusFrame.svg" alt="+" />
      </STAdd>
    </>
  );
}

const STAdd = styled.div`
  width: 90%;
  min-height: 110px;
  border: 2px solid #d7d8df;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px auto 70px auto;
  border-radius: 8px;

  img {
    width: 73px;
    height: 50px;
    cursor: pointer;
    margin-left: 10px;
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
