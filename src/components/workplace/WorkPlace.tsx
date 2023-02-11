import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getWorks } from "../../APIs/workApi";
import { WorkType } from "../../types/workType";
import Dday from "../dDay/Dday";
import MainHeader from "../header/MainHeader";
import Work from "./Work";

function WorkPlace() {
  const [pathName, setPathName] = useState("");
  const navigate = useNavigate();
  const { data } = useQuery(["work"], getWorks);
  const locationNow = useLocation();
  useEffect(() => {
    setPathName(locationNow.pathname);
  }, []);

  return (
    <>
      <MainHeader location={pathName} />
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
  margin: 0px auto 75px auto;
  border-radius: 8px;

  img {
    width: 73px;
    height: 50px;
    cursor: pointer;
    margin-left: 10px;
  }
`;

export default WorkPlace;
