import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function WorkPlace() {
  const navigate = useNavigate();
  return (
    <STContainer>
      <STAdd>디데이 계신기</STAdd>
      <STAdd onClick={() => navigate("/addwork")}>
        <h2>+ 근무지추가</h2>
      </STAdd>
    </STContainer>
  );
}

const STContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
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
`;
export default WorkPlace;
