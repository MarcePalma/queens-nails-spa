import React, { useState, useEffect } from "react";
import { Post } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

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
    <div className="m-20">
      <h2 className="text-center text-3xl font-bold mb-4 text-pink-400">Publicaciones</h2>
      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <div key={post.id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-pink-400 dark:border-pink-700 mx-auto">
            <a href="#">
              <Image width={1000} height={1000} className="rounded-t-lg" src={post.image} alt="" />
            </a>
            <div className="p-5 text-center">
              <Link href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">{post.title}</h5>
              </Link>
              <p className="mb-3 font-normal text-white">{post.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;
