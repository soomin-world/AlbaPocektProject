import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getComments } from "../../api/detailPostApi";

const CommentList = () => {
  const { id } = useParams();
  console.log(id);
  const data = useQuery(["comment", id], () => getComments(id));
  console.log(data);
  // if (isLoading) return <div>Loading~~~</div>;
  // if (isError) return <div>Error!</div>;
  return (
    <div>
      <div> </div>
    </div>
  );
};

export default CommentList;
