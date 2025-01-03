/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import axios from "axios";
import { CreateTodo } from "./CreateTodo";

export const SearchBox = () => {
  const token = localStorage.getItem("accessToken");

  const [search, setSearch] = useState("");
  const [data, setData] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("all");
  const [isCreateTodoOpen, setCreateTodoOpen] = useState(false);

  // Open and close create todo modal with background blur effect
  const handleOpenCreateTodo = () => {
    setCreateTodoOpen(true);
    document.body.classList.add("backdrop-blur-lg");
  };

  const handleCloseCreateTodo = () => {
    setCreateTodoOpen(false);
    document.body.classList.remove("backdrop-blur-lg");
  };

  // Fetch todos based on selected option
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/todos/status?status=${selectedOption}`,
          {
            headers: { Authorization: token },
          }
        );
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [selectedOption]);

  // Handle search functionality
  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/todos/title/?title=${search}`,
        {
          headers: { Authorization: token },
        }
      );
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Handle add todo after creation
  const handleAddTodo = async (todo: any) => {
    setData((prevData: any[]) => [...prevData, todo]);
  };

  // Handle delete todo
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/todos/delete/${id}`, {
        headers: { Authorization: token },
      });
      setData((prevData: any[]) =>
        prevData.filter((todo: any) => todo.id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  // Toggle todo status (completed/incomplete)
  const handleToggleStatus = async (id: number) => {
    try {
      await axios.patch(`http://localhost:3000/todos/toggle/${id}`, {}, {
        headers: { Authorization: token },
      });
      setData((prevData: any[]) =>
        prevData.map((todo: any) =>
          todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  // Handle filter change
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  // Trigger search on Enter key press
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      {isCreateTodoOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-md z-10"></div>
      )}

      {/* Search and filter box */}
      <div className="search-box flex gap-2 w-full justify-center relative z-20">
        <div className="flex items-center border border-[--primary-color] p-1 rounded-md">
          <input
            className="flex-grow p-1 outline-none bg-transparent text-white"
            type="text"
            placeholder="Search note..."
            onChange={(e) => setSearch(e.target.value)}
            id="search"
            onKeyDown={handleKeyDown} // Added onKeyDown event handler
          />
          <img src="/assets/search.svg" alt="search icon" />
        </div>
        <div className="filter">
          <select
            value={selectedOption}
            onChange={handleChange}
            className="outline-none p-2 rounded-md bg-[--secondary-color] text-black"
            name="filter"
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="remaining">Remaining</option>
          </select>
        </div>
        <div>
          <button
            onClick={handleSearch}
            className="p-2 bg-[--secondary-color] rounded-md active:translate-y-1 active:bg-[--primary-color] transition-all"
          >
            Search
          </button>
        </div>
        <div>
          <button
            onClick={handleOpenCreateTodo}
            className="p-2 bg-[--secondary-color] rounded-md active:translate-y-1 active:bg-[--primary-color] transition-all"
          >
            Create Todo
          </button>
          <CreateTodo
            open={isCreateTodoOpen}
            onClose={handleCloseCreateTodo}
            onAddTodo={handleAddTodo}
          />
        </div>
      </div>

      {/* Todo list */}
      {Array.isArray(data) &&
        data.map((todo: any) => (
          <div
            key={todo.id}
            className={`border p-4 rounded-lg w-[590px] ${todo.isCompleted ? "bg-green-400" : "bg-red-400"}`}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-xl underline">{todo.title}</h3>
              <button
                onClick={() => handleToggleStatus(todo.id)}
                className="bg-yellow-400"
              >
                {todo.isCompleted ? "Mark as Incompleted" : "Mark as Completed"}
              </button>
            </div>
            <p className="text-black mt-2">{todo.content}</p>
            <div className="flex items-center justify-between mt-4">
              <button
                className="delte_btn bg-[--secondary-color] p-2 rounded-lg active:translate-y-1 active:bg-[--primary-color] transition-all"
                onClick={() => handleDelete(todo.id)}
              >
                Delete
              </button>
              <button>
                <img
                  className="h-8 w-auto"
                  src="/assets/edit_btn.png"
                  alt="edit button"
                />
              </button>
            </div>
          </div>
        ))}
    </>
  );
};

