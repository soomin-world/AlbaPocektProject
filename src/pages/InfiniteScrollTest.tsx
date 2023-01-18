import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { getInfinitePost } from "../APIs/communityBoardApi";

function InfiniteScrollText() {
  const { ref, inView } = useInView();
  const { data, status, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ["posts"],
    ({ pageParam = 0 }) => getInfinitePost(pageParam),
    {
      getNextPageParam: (lastPage) =>
        !lastPage.last ? lastPage.nextPage : undefined,
    }
  );
  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  //return (
  //   <>
  //   <PostsContainer>
  //     {data?.pages.map((page, index) => (
  //       <React.Fragment key={index}>
  //         {page.posts.map((post) => (
  //           <PostCard key={post._id} post={post}></PostCard>
  //         ))}
  //       </React.Fragment>
  //     ))}
  //   </PostsContainer>
  //   {isFetchingNextPage ? <Loading /> : <div ref={ref}></div>}
  // </>
  //)
}

export default InfiniteScrollText;
