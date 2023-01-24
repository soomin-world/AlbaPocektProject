import styled from "styled-components";

interface DropDownType {
  //   open: boolean;
  //   close: () => void;
  children?: JSX.Element | JSX.Element[];
}

const CategoryDropDown: React.FC<DropDownType> = ({ children }) => {
  return <DropDown>{children}</DropDown>;
};

const DropDown = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  z-index: 999;
  top: 50px;
  padding: 5px;
  color: #8f8b8b;
  //margin-top: -2px;
  width: 120px;
  align-items: center;
  animation: modal-bg-show 0.6s;
  background: #f9f9f9;
  box-shadow: 0px 0px 4px rgba(20, 19, 19, 0.08);
  border-radius: 8px;
  border: 1px solid #efefef;
  button {
    width: 100px;
    font-size: 15px;
    font-weight: 500;
    border: none;
    background-color: transparent;
    margin-top: 2px;
  }
`;
export default CategoryDropDown;
