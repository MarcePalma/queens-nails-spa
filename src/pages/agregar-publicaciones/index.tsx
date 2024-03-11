import React, { useState } from "react";

import AddPost from "@/components/posts/addPosts";
import PostListForDashboard from "@/components/posts/PostListForDashboard";
import { Post } from "@/types/types";

const Index = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const handleAddPost = (newPost: Post) => {
    setPosts([...posts, newPost]);
  };

  return (
    <div>
      <h1 className="text-white">Agregar Publicaciones</h1>
      {/* @ts-ignore */}
      <AddPost onAddPost={handleAddPost} />
      <PostListForDashboard />
    </div>
  );
};

export default Index;