export interface IMyPage {
  nickname: string;
  profileImage: string;
  userId: string;
  postList: [
    {
      postId: number;
      profileImage: string;
      nickname: string;
      title: string;
      content: string;
      imgUrl: string;
      postLikeNum: number;
      category: string | null;
      createAt: string;
      modifiedAt: string;
      likePost: boolean;
    }
  ];
}
