import CommentList from "../components/comment/CommentList";
import CommentPost from "../components/comment/CommentPost";
import PostDetail from "../components/postDetail/PostDetail";

function Post() {
  return (
    <>
      <PostDetail />;
      <CommentPost />
      <CommentList />
    </>
  );
}

export default Post;
