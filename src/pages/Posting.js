import { useParams } from "react-router-dom";

import PostForm from "../components/post/PostForm";
import PostEditForm from "../components/post/PostEditForm";
import LayOut from "../components/layout/LayOut";

function Posting() {
  const { id } = useParams();
  return <LayOut height="100vh">{id ? <PostEditForm /> : <PostForm />}</LayOut>;
}

export default Posting;
