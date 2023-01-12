import styled from "styled-components";

type Props = {
  children: React.ReactNode;
};

const LayOut: React.FC<Props> = ({ children }) => {
  return (
    <>
      <STLayOut>{children}</STLayOut>
    </>
  );
};

const STLayOut = styled.div`
  width: ;
`;

export default LayOut;
