import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getPosts } from "../../APIs/communityBoard";
import { IAllPosts } from "../../types/postType";
import PostCard from "./PostCard";

const Cover = () => {
  const { isLoading, isError, data } = useQuery<IAllPosts[]>(
    ["categoryPosts"],
    () => getPosts("cover")
  );
  console.log(data);
  return (
    <div>
      {data?.map((post) => {
        console.log(post);
        return <PostCard key={post.postId} post={post} />;
      })}
    </div>
  );
};

export default Cover;