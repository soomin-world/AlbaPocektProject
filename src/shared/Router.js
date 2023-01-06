import { BrowserRouter, Routes, Route } from "react-router-dom";
import Board from "../pages/Board";
import Main from "../pages/Main";
import Posting from "../pages/Posting";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/posting" element={<Posting />} />
        <Route path="/board" element={<Board />} />
        <Route path="/editPost/:id" element={<EditingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
