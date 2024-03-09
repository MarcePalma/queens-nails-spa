import React, { useState } from "react";

interface AddPostProps {
  onAddPost: (newPost: {
    id: string;
    title: string;
    content: string;
    date: string;
    image: string;
    category: string;
  }) => void;
}

const AddPost: React.FC<AddPostProps> = ({ onAddPost }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [category, setCategory] = useState("manicura");

  const handleAddPost = async () => {
    if (title && content && image) {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("image", image);
      formData.append("category", category);

      try {
        const response = await fetch("/api/posts/createPost/route", {
          method: "POST",
          body: formData,
        });
        if (!response.ok) {
          throw new Error("Error creating post");
        }
        const newPostData = await response.json();
        onAddPost(newPostData);
        setTitle("");
        setContent("");
        setImage(null);
        setCategory("manicura");
      } catch (error) {
        console.error("Error creating post:", error);
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setImage(files[0]);
    }
  };

  return (
    <div className="add-post text-white p-4 bg-[#121212]">
      <h2 className="text-xl mb-2">Add New Post</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="bg-[#303030] text-white p-2 mb-2"
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="bg-[#303030] text-white p-2 mb-2"
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mb-2"
      />
      <label className="mb-2">
        Category:
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-[#303030] text-white p-2"
        >
          <option value="manicura">Manicura</option>
          <option value="pedicura">Pedicura</option>
        </select>
      </label>
      <button
        onClick={handleAddPost}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Add Post
      </button>
    </div>
  );
};

export default AddPost;