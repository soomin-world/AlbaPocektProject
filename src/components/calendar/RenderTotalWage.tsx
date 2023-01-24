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
      <label onClick={() => setIsTax(!isTax)}>
        {isTax ? (
          <input type="checkbox" name="tax" checked />
        ) : (
          <input type="checkbox" name="tax" />
        )}
        세금 제외
      </label>
      {isTax
        ? comma(String(Number(data?.total) * (1 - 0.033)))
        : comma(String(data?.total))}
      원
    </TotalWage>
  );
};

const TotalWage = styled.div`
  width: 365px;
  text-align: right;
  margin-right: 14px;
  font-weight: 400;

  label {
    font-weight: 300;
    margin-right: 10px;
  }
`;

export default RenderTotalWage;
