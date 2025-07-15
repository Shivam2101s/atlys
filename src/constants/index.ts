import { PostType } from "../types";

export const DummyPosts: PostType[] = [
  {
    author: {
      username: "Aarav Sharma",
      userImg: "https://randomuser.me/api/portraits/men/51.jpg",
    },
    createdAt: "2025-07-15T06:40:00Z", // 5 mins ago
    body: "Just started reading a new book on frontend architecture. It's amazing how much design patterns matter in large apps!",
    emoji: "📘",
    commentCount: 18,
  },
  {
    author: {
      username: "Priya Mehra",
      userImg: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    createdAt: "2025-07-15T06:35:00Z", // 10 mins ago
    body: "Woke up early today and went for a walk. Sometimes, a quiet morning is all you need to reset.",
    emoji: "🌅",
    commentCount: 27,
  },
  {
    author: {
      username: "Rohan Patel",
      userImg: "https://randomuser.me/api/portraits/men/33.jpg",
    },
    createdAt: "2025-07-15T06:30:00Z", // 15 mins ago
    body: "Building a React + TypeScript side project. Loving the strict typing experience!",
    emoji: "💻",
    commentCount: 11,
  },
  {
    author: {
      username: "Sneha Iyer",
      userImg: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    createdAt: "2025-07-15T06:25:00Z", // 20 mins ago
    body: "Can’t stop listening to this new indie playlist. Highly recommend checking it out!",
    emoji: "🎶",
    commentCount: 9,
  },
  {
    author: {
      username: "Vikram Nair",
      userImg: "https://randomuser.me/api/portraits/men/74.jpg",
    },
    createdAt: "2025-07-15T06:20:00Z", // 25 mins ago
    body: "Tried cooking Paneer Butter Masala for the first time. Turned out better than I expected! 🍽️",
    emoji: "🔥",
    commentCount: 14,
  },
];
