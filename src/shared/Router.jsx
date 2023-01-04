import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "../pages/Main";
import Register from "../pages/Register";
import Login from "../pages/Login";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
