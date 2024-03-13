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
    <div className="bg-pink-500 p-4 rounded-lg shadow-lg mx-auto max-w-md mt-20 px-8">
      <h2 className="text-white text-lg mb-2">Agregar Publicaciones</h2>
      <input
        type="text"
        placeholder="Titulo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="bg-white text-gray-800 px-3 py-2 rounded-md w-full mb-2 focus:outline-none focus:ring focus:border-blue-300"
      />
      <textarea
        placeholder="Contenido"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="bg-white text-gray-800 px-3 py-2 rounded-md w-full mb-2 focus:outline-none focus:ring focus:border-blue-300"
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="bg-white text-gray-800 px-3 py-2 rounded-md w-full mb-2 focus:outline-none focus:ring focus:border-blue-300"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="bg-white text-gray-800 px-3 py-2 rounded-md w-full mb-2 focus:outline-none focus:ring focus:border-blue-300"
      >
        <option value="">Seleccionar Categoria</option>
        <option value="manicura">Manicura</option>
        <option value="pedicura">Pedicura</option>
        <option value="quiropedia">Quiropedia</option>
      </select>
      <button
        onClick={handleAddPost}
        className="bg-white text-pink-500 px-4 py-2 rounded-md text-lg font-semibold focus:outline-none hover:bg-gray-200"
      >
        Agregar Publicacion
      </button>
    </div>
  );;
  
}
export default AddPost;