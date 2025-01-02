/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import axios from "axios";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface CreateTodoProps {
  open: boolean;
  onClose: () => void;
  onAddTodo: (todo: any) => void;
}

export const CreateTodo = ({ open, onClose, onAddTodo }: CreateTodoProps) => {
  const token = localStorage.getItem("accessToken");
  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleClick = async () => {
    const response: any = await axios.post(
      "http://localhost:3000/todos/create",
      {
        title,
        content,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    onAddTodo({
      ...response.data,
    });
    setTitle("");
    setContent("");
  };

  if (!open) return null;
  return (
    <div className="bg-emerald-300 absolute h-10 top-20 right-0">
      <form onSubmit={handleClick}>
        <input
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Title"
        />
        <input
          onChange={(e) => setContent(e.target.value)}
          type="text"
          placeholder="Content"
        />
        <button type="submit">Create</button>
        <button onClick={onClose}>
          <img
            className="h-4 w-auto"
            src="/assets/exit_btn.png"
            alt="exit btn"
          />
        </button>
      </form>
    </div>
  );
};
