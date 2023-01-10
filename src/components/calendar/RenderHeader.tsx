import { format } from "date-fns";
import { Icon } from "@iconify/react";
import { IHeaderProps } from "../../types/calendar";
import styled from "styled-components";

const RenderHeader = ({ currentMonth, prevMonth, nextMonth }: IHeaderProps) => {
  return (
    <Header>
      <div>
        <HeaderText>
          <span>{format(currentMonth, "M")}월</span>
          <span>{format(currentMonth, "yyyy")}</span>
        </HeaderText>
      </div>
      <HeaderIcon>
        <Icon
          icon="bi:arrow-left-circle-fill"
          onClick={prevMonth}
          style={{ marginRight: "4px" }}
        />
        <Icon icon="bi:arrow-right-circle-fill" onClick={nextMonth} />
      </HeaderIcon>
    </Header>
  );
};

const Header = styled.div`
  width: 100%;
  height: 50px;
  border: 2px solid black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 10px 0px 10px;
  div:first-child {
    margin-right: 10px;
  }
`;

const HeaderText = styled.div`
  span {
    font-size: 20px;
  }
  span:first-child {
    margin-right: 10px;
  }
`;

const HeaderIcon = styled.div`
  height: 16px;
`;

export default RenderHeader;
