import { useState } from "react";
import "../modal/Modal.css";

interface modalType {
  open: boolean;
  close: () => void;
  children?: JSX.Element | JSX.Element[];
}
const Modal: React.FC<modalType> = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close } = props;

  return (
    <>
      <div className={open ? "openModal modal" : "modal"}>
        {open ? (
          <section>
            <header></header>
            <main>{props.children}</main>
            <footer>
              <button className="close" onClick={close}>
                close
              </button>
              <button className="close" onClick={close}>
                확인
              </button>
            </footer>
          </section>
        ) : null}
      </div>
    </>
  );
};

export default Modal;
