import { useParams } from "react-router-dom";
import PostEditForm from "../components/post/PostEditForm";
import PostForm from "../components/post/PostForm";

function Posting() {
  const { id } = useParams();
  return(
  {id? 
     <PostEditForm />; : <PostForm />;
  }
  )
}

export default Posting;
