import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { RecoilRoot } from "recoil";

const root = ReactDOM.render(
  // <React.StrictMode>
  <RecoilRoot>
    <App />
  </RecoilRoot>,
  document.getElementById("root")

  // </React.StrictMode>
);
