import React, { useState, useEffect } from "react";
import { Post } from "@/types/types";

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Fetch de datos desde la API
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/posts/route");
        if (!response.ok) {
          throw new Error("Error fetching posts");
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-10 mt-20">
            <h1 className="text-white mb-4 text-4xl sm:text-5xl lg:text-3xl lg:leading-normal font-extrabold">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-pink-600 z-10">
                    Publicaciones
                </span>
            </h1>
      {posts.map((post) => (
        <div key={post.id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-pink-400 dark:border-pink-700">
          <a href="#">
            <img className="rounded-t-lg" src={post.image} alt="" />
          </a>
          <div className="p-5">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">{post.title}</h5>
            </a>
            <p className="mb-3 font-normal text-white">{post.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
