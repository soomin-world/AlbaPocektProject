import { useQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { getTotal } from "../../APIs/calendarApi";
import { calendarTax } from "../../atoms";
import comma from "../../hooks/comma";

interface ITotalWage {
  data: IData;
}

interface IData {
  month: string;
  total: string;
  year: string;
}

const RenderTotalWage = ({ data }: ITotalWage) => {
  const [isTax, setIsTax] = useRecoilState(calendarTax);

  return (
    <TotalWage>
      <Tax onClick={() => setIsTax(!isTax)}>
        {isTax ? (
          <img src="/image/iconFullCheck.svg" />
        ) : (
          <img src="/image/iconEmptyCheck.svg" />
        )}
        <div>세금 포함</div>
      </Tax>

      <TotalText>
        <div>총급여</div>
        <div>
          {isTax
            ? comma(String(Math.floor(Number(data?.total) * (1 - 0.033))))
            : comma(String(data?.total))}
          원
        </div>
      </TotalText>
    </TotalWage>
  );
};

const TotalWage = styled.div`
  width: 350px;
  height: 50px;
  text-align: right;
  padding-right: 10px;
  margin-bottom: 57px;
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Tax = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
  cursor: pointer;

  img {
    width: 15px;
    height: 15px;
    margin-right: 10px;
  }

  div {
    height: 13px;
  }
`;

const TotalText = styled.div`
  display: flex;
  align-items: center;

  div:first-child {
    font-size: 13px;
    height: 13px;
    margin-right: 10px;
  }

  div:last-child {
    font-size: 18px;
    height: 18px;
    font-weight: 500;
  }
`;
export default RenderTotalWage;
