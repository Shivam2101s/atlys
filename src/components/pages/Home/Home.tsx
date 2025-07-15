import * as React from "react";
import { PostCard } from "../../common/PostCard";
import { DummyPosts } from "../../../constants";
import { isStringValid } from "../../../utils";
import { PostType, UserType } from "../../../types";
import { withAuth } from "../../hocs/withAuth/withAuth";

function Home() {
  const userState = localStorage.getItem("userState");
  const user: UserType = isStringValid(userState)
    ? JSON.parse(userState as string)
    : null;

  const [posts, setPosts] = React.useState<PostType[]>(DummyPosts);
  const [postText, setPostText] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");

  const handlePost = () => {
    if (!postText.trim()) {
      setError("Post content can't be empty.");
      return;
    }

    const newPost: PostType = {
      author: {
        username: user?.username || "Anonymous",
        userImg:
          user?.userImg || "https://randomuser.me/api/portraits/lego/1.jpg",
      },
      body: postText.trim(),
      emoji: "✍️",
      createdAt: new Date().toISOString(),
      commentCount: 0,
    };

    setPosts([newPost, ...posts]);
    setPostText("");
    setError("");
  };

  return (
    <div className="flex flex-col items-center py-[32px] px-[24px] bg-black w-screen h-screen overflow-y-scroll">
      <div className="w-full max-w-[700px]">
        <p className="text-[28px] text-[#C5C7CA] font-[500] mb-[8px]">
          Hello {user?.username}
        </p>
        <p className="text-[16px] text-[#7F8084] font-[400] mb-[8px]">
          How are you doing today? Would you like to share something with the
          community 🤗
        </p>

        {/* Create post */}
        <div className="p-4 border border-[#35373B] rounded-lg bg-[#27292D] w-full mt-[36px]">
          <div className="text-white text-lg font-semibold mb-4">
            Create post
          </div>

          <div className="flex items-center p-3 bg-[#191920] rounded-lg mb-2">
            <span className="w-[48px] h-[48px] bg-[#27292D] rounded-full flex items-center justify-center shrink-0 text-[18px] mr-3">
              📝
            </span>
            <input
              type="text"
              placeholder="How are you feeling today?"
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              className="bg-transparent text-gray-400 placeholder-gray-500 focus:outline-none flex-grow"
            />
          </div>

          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

          <div className="flex justify-end">
            <button
              className="bg-[#4A96FF] hover:bg-blue-500 text-white py-2 px-8 rounded-md"
              onClick={handlePost}
            >
              Post
            </button>
          </div>
        </div>

        {/* Posts */}
        <div className="mt-6 flex flex-col gap-4">
          {posts.map((post, idx) => (
            <PostCard key={idx} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}

export const HomeWithAuth = withAuth(Home);
