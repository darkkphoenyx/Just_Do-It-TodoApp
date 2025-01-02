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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/todos/status?status=${selectedOption}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        const data: any = response.data;
        console.log(response);
        setData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [selectedOption]);

  //handle search
  const handleSearch = async () => {
    const response: any = await axios.get(
      `http://localhost:3000/todos/title/?title=${search}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    setData(response.data);
  };

  //handle close
  const handleClose = () => {
    setOpen(false);
  };

  //handle add todo
  const handleAddTodo = async (todo: any) => {
    setData([...data, todo]);
  };
  //handle delete
  const handleDelete = async (id: number) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/todos/delete/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const data: any = response.data;
      setData((previousValue: any[]) =>
        previousValue.filter((todo: any) => todo.id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  //hangle toggleStatus
  const handleToggleStatus = async (id: number) => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/todos/toggle/${id}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const data: any = response.data;
      setData((previousValue: any[]) =>
        previousValue.map((todo: any) =>
          todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  //handle isCompleted
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <>
      <div className="search-box flex gap-2 w-full justify-center">
        <div className="flex items-center border border-[--primary-color] p-1 rounded-md">
          <input
            className="flex-grow p-1 outline-none"
            type="text"
            placeholder="Search note..."
            onChange={(e) => setSearch(e.target.value)}
            id="search"
          />
          <img src="/assets/search.svg" alt="search icon" />
        </div>
        <div className="filter">
          <select
            value={selectedOption}
            onChange={handleChange}
            className="outline-none p-2 rounded-md bg-[--primary-color] text-white"
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
            className="p-2 bg-[--secondary-color] rounded-md active:translate-y-1 active:bg-[--primary-color]  transition-all"
          >
            Search
          </button>
        </div>
        <div>
          <button
            onClick={() => setOpen(true)}
            className="p-2 bg-[--secondary-color] rounded-md active:translate-y-1 active:bg-[--primary-color]  transition-all"
          >
            Create Todo
          </button>
          <CreateTodo
            open={open}
            onClose={handleClose}
            onAddTodo={handleAddTodo}
          />
        </div>
      </div>
      {Array.isArray(data) &&
        data.map((todo: any) => (
          <div
            key={todo.id}
            className={`border p-4 rounded-lg w-[590px] ${
              todo.isCompleted ? "bg-green-400" : "bg-red-400"
            }`}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-xl underline">{todo.title}</h3>
              {todo.isCompleted ? (
                <button
                  onClick={() => handleToggleStatus(todo.id)}
                  className="bg-yellow-400"
                >
                  Mark as Incompleted
                </button>
              ) : (
                <button
                  onClick={() => handleToggleStatus(todo.id)}
                  className="bg-yellow-400"
                >
                  Mark as Completed
                </button>
              )}
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
