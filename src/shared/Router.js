import { BrowserRouter, Routes, Route } from "react-router-dom";
import Board from "../pages/Board";
import Main from "../pages/Main";
import Post from "../pages/Post";

import Posting from "../pages/Posting";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/posting/:id?" element={<Posting />} />
        <Route path="/board" element={<Board />} />
        <Route path="/post/:id" element={<Post />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
