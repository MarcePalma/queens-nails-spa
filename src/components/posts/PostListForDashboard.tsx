import React, { useState, useEffect } from "react";
import { Post } from "@/types/types";

const PostListForDashboard = () => {
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

  // Función para eliminar un post por su ID
  const deletePost = async (postId: number) => {
    try {
      const response = await fetch(`/api/posts/deletePost/${postId}`, {
        method: "DELETE"
      });
      if (!response.ok) {
        throw new Error("Error deleting post");
      }
      // Actualizar la lista de posts después de eliminar
      setPosts(posts.filter(post => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.map((post) => (
        <div key={post.id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <a href="#">
            <img className="rounded-t-lg" src={post.image} alt="" />
          </a>
          <div className="p-5">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{post.title}</h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{post.content}</p>
            <button onClick={() => deletePost(post.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostListForDashboard;
