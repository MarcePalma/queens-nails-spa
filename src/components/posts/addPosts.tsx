import { error } from "console";
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
            try {
                const imageBase64 = await convertImageToBase64(image);

                const response = await fetch("http://localhost:3000/api/posts/createPost/route", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        title,
                        content,
                        date: new Date().toISOString(),
                        image: imageBase64,
                        category,
                    }),
                });

                if (response.ok) {
                    const newPost = await response.json();
                    onAddPost(newPost);
                    setTitle("");
                    setContent("");
                    setImage(null);
                    setCategory("manicura");
                } else {
                    console.error("Error creating post:", response.statusText);
                    alert(`Error creando la imagen en la base de datos ${response.statusText}`)
                }
            } catch (error) {
                console.error("Error creating post:", error);
                alert(`Error creando la imagen en la base de datos ${error}`)
            }
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setImage(files[0]);
        }
    };

    const convertImageToBase64 = (imageFile: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(imageFile);

            reader.onload = () => {
                const base64String = reader.result as string;
                resolve(base64String.split(",")[1]); // Eliminar el encabezado "data:image/png;base64,"
            };

            reader.onerror = (error) => {
                reject(error);
            };
        });
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
