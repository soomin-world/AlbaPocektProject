import CommentList from "../components/comment/CommentList";
import CommentPost from "../components/comment/CommentPost";
import Footer from "../components/footer/Footer";
import LayOut from "../components/layout/LayOut";
import PostDetail from "../components/postDetail/PostDetail";

function Post() {
  return (
    <>
      <LayOut padding="0" position="relative" height="100vh">
        <PostDetail />
        <CommentPost />
        <div style={{ paddingBottom: "50px" }}>
          <CommentList />
        </div>
      </LayOut>
      <Footer />
    </>
  );
}

export default Post;
