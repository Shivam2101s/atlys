import * as React from "react";
import { BsThreeDots } from "react-icons/bs";
import { GoComment } from "react-icons/go";
import { PostType } from "../../../types";
import { formatDate } from "../../../utils";

type PostCardProps = {
  post: PostType;
};

export function PostCard({ post }: PostCardProps) {
  const handleClick = () => {
   window.alert("Function not implemented");
  }
  return (
    <div className="p-4 border border-[#35373B] rounded-lg bg-[#27292D] w-full mt-[12px]">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <img
            src={post.author.userImg}
            alt="Profile"
            className="w-10 h-10 rounded-full mr-3"
             onClick={handleClick}
          />
          <div className="font-[500]">
            <div className="text-white text-[16px]">{post.author.username}</div>
            <div className="text-[#7F8084] text-[14px]">{formatDate(post.createdAt)}</div>
          </div>
        </div>
        <div className="text-gray-400">
          <button
            className="focus:outline-none"
            onClick={handleClick}
          >
            <BsThreeDots size={16} />
          </button>
        </div>
      </div>

      <div className="flex items-center p-3 bg-[#191920] rounded-lg mb-4">
        <div className="flex items-start">
          <span className="w-[48px] h-[48px] bg-[#27292D] rounded-full flex items-center justify-center shrink-0 text-[18px] mr-3">
            {post.emoji || "👋"}
          </span>
          <p className="text-[#7F8084] text-[16px] font-[400]">{post.body}</p>
        </div>
      </div>

      <div className="flex items-center text-[#7F8084] text-[14px] font-[400] gap-[6px]"  onClick={handleClick}>
        <GoComment size={20} />
        <span>{post.commentCount} comments</span>
      </div>
    </div>
  );
}
