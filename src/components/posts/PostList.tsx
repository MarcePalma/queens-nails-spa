import React from "react";
import ManicuraCard from "./Card/ManicuraCard"; // Asegúrate de importar ManicuraCard desde la ubicación correcta
import PedicuraCard from "./Card/PedicuraCard"; // Importa PedicuraCard si es necesario
import { Post } from "@/types/types";

interface PostListProps {
    posts: Post[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
    return (
        <div className="post-list">
            {posts.map((post) => (
                post.category === 'manicura' && post.image ? (
                    <ManicuraCard key={post.id} {...post} />
                ) : post.category === 'pedicura' && post.image ? (
                    <PedicuraCard key={post.id} {...post} />
                ) : null
            ))}
        </div>
    );
};

export default PostList;