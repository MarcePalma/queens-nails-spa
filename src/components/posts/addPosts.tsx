import React, { useState } from "react";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<string>("");
  const [category, setCategory] = useState("");

  const handleAddPost = async () => {
    // Verificar que los campos obligatorios no estén vacíos
    if (!title || !content || !image || !category) {
      console.error("Los campos obligatorios no pueden estar vacíos");
      return;
    }

    const postData = {
      title: title,
      content: content,
      image: image,
      category: category
    };

    try {
      const response = await fetch("/api/posts/create/route", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(postData)
      });
      if (!response.ok) {
        throw new Error("Error creating post");
      }
      const responseData = await response.json();
      console.log("New post created:", responseData);
      // Limpiar el formulario después de enviar los datos
      setTitle("");
      setContent("");
      setImage("");
      setCategory("");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImage(reader.result);
        }
      };
    }
  };

  return (
    <div>
      <h2>Add New Post</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Select Category</option>
        <option value="manicura">Manicura</option>
        <option value="pedicura">Pedicura</option>
        <option value="quiropedia">Quiropedia</option>
      </select>
      <button onClick={handleAddPost}>Add Post</button>
    </div>
  );
};

export default AddPost;