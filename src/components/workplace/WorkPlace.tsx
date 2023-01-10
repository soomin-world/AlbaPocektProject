import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getWork } from "../../APIs/workApi";
import Dday from "../dDay/Dday";

import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";

export interface WorkType {
  placeName: string;
  placeColor: string;
  workId: number;
  salaryDay: number;
}

const items: MenuProps["items"] = [
  {
    label: "색상변경",
    key: "0",
  },
  // {
  //   label: <a href="https://www.aliyun.com">2nd menu item</a>,
  //   key: "1",
  // },
  // {
  //   type: "divider",
  // },
  // {
  //   label: "3rd menu item",
  //   key: "3",
  // },
];

function WorkPlace() {
  const navigate = useNavigate();
  const { data } = useQuery(["work"], getWork);
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
                key={w.workId}
                style={{ backgroundColor: `${w.placeColor}` }}
              >
                <div className="wrap">
                  <div className="info">
                    <div>{w.placeName}</div>
                    <div>23.01.16~23.02.15</div>
                  </div>
                  <div className="button">
                    <Dropdown menu={{ items }} trigger={["click"]}>
                      <a onClick={(e) => e.preventDefault()}>
                        <Space>⋮</Space>
                      </a>
                    </Dropdown>
                  </div>
                </div>
                <div className="money"> ₩1,000,000(번돈)</div>
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
  .money {
    display: flex;
    justify-content: flex-end;
    font-size: 23px;
    font-weight: bold;
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
