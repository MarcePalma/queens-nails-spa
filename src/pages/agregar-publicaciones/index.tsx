import React, { useState } from "react";

import Navbar from "@/components/navigation/Navbar";
import AddPost from "@/components/posts/addPosts";
import PostListForDashboard from "@/components/posts/PostListForDashboard";
import { Post } from "@/types/types";
import { useUser } from "@/context/UserContext";
import Link from "next/link";

const Index = () => {
  const { token } = useUser()
  const [posts, setPosts] = useState<Post[]>([]);

  const handleAddPost = (newPost: Post) => {
    setPosts([...posts, newPost]);
  };

  if (!token) {
    return <h1>Acceso denegado. Por favor inicia sesion para acceder <Link className='font-bold' href={"/"}>VOLVER</Link></h1>
  }

  return (
    <div className="py-24">
      <Navbar />
      <h1 className="text-white">Agregar Publicaciones</h1>
      {/* @ts-ignore */}
      <AddPost onAddPost={handleAddPost} />
      <PostListForDashboard />
    </div>
  );
};

export default Index;