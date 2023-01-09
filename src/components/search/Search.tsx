import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchPost } from "../../APIs/communityBoard";
import SearchList from "./SearchList";

function Search() {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState("");
  const searchMutate = useMutation(searchPost);
  const onSearchHandler = () => {
    const result = searchMutate.mutate(userInput);
    return result;
  };

  return (
    <>
      <div className="container">
        <div className="header">
          <img
            src="../../../public/icon-arrow-left-small-mono.png"
            onClick={() => navigate("/board")}
            alt="이전페이지"
          />
          <h2>게시판 검색</h2>
        </div>
        <div className="searchBar">
          <input
            type="text"
            onChange={(e: any) => {
              setUserInput(e.target.value);
            }}
          />
          <button onClick={onSearchHandler}>검색</button>
        </div>
      </div>
      {/* <SearchList result={result} />  */}
    </>
  );
}

export default Search;
