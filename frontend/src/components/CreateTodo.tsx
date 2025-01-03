/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import axios from "axios";

interface CreateTodoProps {
  open: boolean;
  onClose: () => void;
  onAddTodo: (todo: any) => void;
}

export const CreateTodo = ({ open, onClose, onAddTodo }: CreateTodoProps) => {
  const token = localStorage.getItem("accessToken");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleClick = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/todos/create",
        { title, content },
        {
          headers: { Authorization: token },
        }
      );
      onAddTodo(response.data);
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  // Lock scrolling when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"; // No scroll on body
    } else {
      document.body.style.overflow = "auto"; // Normal scroll on body
    }

    // Cleanup to unlock scroll if component unmounts or modal is closed
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed h-[100vh] inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-lg z-50">
      <div className="bg-cyan-500 rounded-md w-[400px] p-4">
        <form className="flex flex-col gap-4" onSubmit={handleClick}>
          <input
            className="rounded-sm p-2 outline-none"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="rounded-sm p-2 outline-none w-full h-32 resize-none"
            placeholder="Content (255 characters)"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="flex justify-between">
            <button type="submit">
              <img className="h-8 w-auto" src="/assets/tick.svg" alt="create button" />
            </button>
            <button onClick={onClose}>
              <img className="h-8 w-auto" src="/assets/close.svg" alt="exit btn" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
