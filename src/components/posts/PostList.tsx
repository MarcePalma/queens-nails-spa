import React from "react";
import Postscard from "./postscard";
import { Post } from "@/types/types";

interface PostListProps {
    posts: Post[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
    return (
        <div className="post-list">
            {posts.map((post) => (
                // @ts-ignore
                <Postscard key={post.id} {...post} />
            ))}
        </div>
    );
};

export default PostList;