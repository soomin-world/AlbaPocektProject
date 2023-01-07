import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "../pages/Main";
import Register from "../pages/Register";
import Login from "../pages/Login";
import KakaoSocial from "../APIs/KakaoSocial";
import Board from "../pages/Board";
import Post from "../pages/Post";
import Posting from "../pages/Posting";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/oauth/callback/kakao" element={<KakaoSocial />}></Route>
        <Route path="/posting/:id?" element={<Posting />} />
        <Route path="/board" element={<Board />} />
        <Route path="/post/:id" element={<Post />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
