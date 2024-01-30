import React, { useState, ChangeEvent, FormEvent } from "react";

interface AddPostProps {
  onAddPost: (newPost: {
    title: string;
    content: string;
    image: File;
    category: string;
  }) => void;
}

const AddPost: React.FC<AddPostProps> = ({ onAddPost }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [category, setCategory] = useState("manicura");

  const handleAddPost = (e: FormEvent) => {
    e.preventDefault();

    if (title && content && image) {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("image", image);
      formData.append("category", category);

      onAddPost({
        title,
        content,
        image,
        category,
      });

      setTitle("");
      setContent("");
      setImage(null);
      setCategory("manicura");
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setImage(files[0]);
    }
  };

  return (
    <form className="add-post text-white p-4 bg-[#121212]" onSubmit={handleAddPost}>
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
      <input type="file" accept="image/*" onChange={handleImageChange} className="mb-2" />
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
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
        Add Post
      </button>
    </form>
  );
};

export default AddPost;
