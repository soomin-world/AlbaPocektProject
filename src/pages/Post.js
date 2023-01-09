import CommentList from "../components/comment/CommentList";
import CommentPost from "../components/comment/CommentPost";
import Footer from "../components/footer/Footer";
import PostDetail from "../components/postDetail/PostDetail";

function Post() {
  return (
    <>
      <PostDetail />;
      <CommentPost />
      <CommentList />
      <Footer />
    </>
  );
}

export default Post;
