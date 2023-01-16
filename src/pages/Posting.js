import { useParams } from "react-router-dom";

import PostForm from "../components/post/PostForm";
import PostEditForm from "../components/post/PostEditForm";

function Posting() {
  const { id } = useParams();
  return <>{id ? <PostEditForm /> : <PostForm />}</>;
}

export default Posting;
