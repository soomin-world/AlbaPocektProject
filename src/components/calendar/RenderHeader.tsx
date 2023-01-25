import { format } from "date-fns";
import { Icon } from "@iconify/react";
import { IHeaderProps } from "../../types/calendar";
import styled from "styled-components";

const RenderHeader = ({ currentMonth, prevMonth, nextMonth }: IHeaderProps) => {
  return (
    <Header>
      {/* <div>
        <HeaderText>
          <span>{format(currentMonth, "M")}월</span>
          <span>{format(currentMonth, "yyyy")}</span>
        </HeaderText>
      </div> */}
      <HeaderIcon>
        <Icon
          icon="bi:arrow-left-circle-fill"
          onClick={prevMonth}
          style={{ marginRight: "9px" }}
        />
        <div>
          <HeaderText>
            {/* <div>{format(currentMonth, "M")}월</div> */}
            <div>{format(currentMonth, "yyyy")}년</div>
            <div>{format(currentMonth, "M")}월</div>
          </HeaderText>
        </div>
        <Icon icon="bi:arrow-right-circle-fill" onClick={nextMonth} />
      </HeaderIcon>
    </Header>
  );
};

const Header = styled.div`
  width: 100%;
  height: 50px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 10px 0px 10px;

  div:first-child {
    margin-right: 10px;
  }
`;

const HeaderText = styled.div`
  display: flex;
  div {
    font-size: 20px;
    font-weight: 500;
    height: 21px;
  }
  div:first-child {
    margin-right: 10px;
  }
`;

const HeaderIcon = styled.div`
  height: 16px;
  display: flex;
  align-items: center;
`;

export default RenderHeader;
