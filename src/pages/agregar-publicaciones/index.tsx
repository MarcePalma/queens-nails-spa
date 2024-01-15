import React, { useState } from "react";
import PostList from "@/components/posts/PostList";
import AddPost from "@/components/posts/addPosts";
import Postscard from "@/components/posts/postscard";
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
      {/* @ts-ignore */}
      <Postscard posts={posts} onAddPost={handleAddPost} />
      {/* @ts-ignore */}
      <PostList posts={posts} />
    </div>
  );
};

export default Index;