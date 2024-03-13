import React, { useState, useEffect } from "react";
import { Post } from "@/types/types";
import Link from "next/link";
import Image from "next/image";

const PostListForDashboard = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
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

  const deletePost = async (postId: number) => {
    try {
      const response = await fetch(`/api/posts/deletePost/${postId}`, {
        method: "DELETE"
      });
      if (!response.ok) {
        throw new Error("Error deleting post");
      }
      setPosts(posts.filter(post => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-20">
      <h2 className="text-center text-3xl font-bold mb-4 text-pink-400">Eliminar Publicaciones</h2>
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
            <button className="bg-white text-pink-500 px-4 py-2 rounded-md text-lg font-semibold focus:outline-none hover:bg-gray-200" onClick={() => deletePost(post.id)}>ELIMINAR PUBLICACION</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostListForDashboard;
