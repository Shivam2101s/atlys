import { UserType } from "./user";

export type PostType = {
  author: UserType;
  createdAt: string;
  body: string;
  emoji?: string;
  commentCount: number;
};
