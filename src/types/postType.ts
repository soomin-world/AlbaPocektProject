export interface IAllPosts {
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
  commentCount: number;
  children?: JSX.Element | JSX.Element[];
}

export interface CommentType {
  commentId: number;
  comment: string;
  nickname: string;
  commentLikeNum: number;
  likeComment: Boolean;
  createAt: string;
  userId: string;
  profileImage: string;
  title?: string;
  postId?: number;
}
