// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { CreateTodo } from "./CreateTodo";

// export const SearchBox = () => {
//   const token = localStorage.getItem("accessToken");

//   const [search, setSearch] = useState("");
//   const [data, setData] = useState<any>([]);
//   const [selectedOption, setSelectedOption] = useState("all");
//   const [isCreateTodoOpen, setCreateTodoOpen] = useState(false);

//   // Open and close create todo modal with background blur effect
//   const handleOpenCreateTodo = () => {
//     setCreateTodoOpen(true);
//     document.body.classList.add("backdrop-blur-lg");
//   };

//   const handleCloseCreateTodo = () => {
//     setCreateTodoOpen(false);
//     document.body.classList.remove("backdrop-blur-lg");
//   };

//   // Open update modal with pre-filled data

//   // Fetch todos based on selected option
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:3000/todos/status?status=${selectedOption}`,
//           {
//             headers: { Authorization: token },
//           }
//         );
//         setData(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchData();
//   }, [selectedOption]);

//   // Handle search functionality
//   const handleSearch = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:3000/todos/title/?title=${search}`,
//         {
//           headers: { Authorization: token },
//         }
//       );
//       setData(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // Handle add todo after creation
//   const handleAddTodo = async (todo: any) => {
//     setData((prevData: any[]) => [...prevData, todo]);
//   };

//   // Handle delete todo
//   const handleDelete = async (id: number) => {
//     try {
//       await axios.delete(`http://localhost:3000/todos/delete/${id}`, {
//         headers: { Authorization: token },
//       });
//       setData((prevData: any[]) =>
//         prevData.filter((todo: any) => todo.id !== id)
//       );
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // Handle update todo

//   // Handle filter change
//   const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedOption(event.target.value);
//   };

//   // Trigger search on Enter key press
//   const handleKeyDown = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter") {
//       handleSearch();
//     }
//   };

//   // Toggle isCompleted for todo
//   const toggleIsComplete = async (todo: any) => {
//     try {
//       const updatedStatus = !todo.isCompleted;
//       await axios.patch(
//         `http://localhost:3000/todos/update/${todo.id}`,
//         {
//           isCompleted: updatedStatus,
//         },
//         {
//           headers: { Authorization: token },
//         }
//       );
//       setData((prevData: any[]) =>
//         prevData.map((item: any) =>
//           item.id === todo.id ? { ...item, isCompleted: updatedStatus } : item
//         )
//       );
//     } catch (error) {
//       console.error("Error toggling completion status:", error);
//     }
//   };

//   return (
//     <>
//       {isCreateTodoOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-md z-10"></div>
//       )}
//       {/* Search and filter box */}
//       <div className="search-box flex gap-2 w-full justify-center relative z-10">
//         <div className="flex items-center border border-[--primary-color] p-1 rounded-md">
//           <input
//             className="flex-grow p-1 outline-none bg-transparent text-white"
//             type="text"
//             placeholder="Search note..."
//             onChange={(e) => setSearch(e.target.value)}
//             id="search"
//             onKeyDown={handleKeyDown} // Added onKeyDown event handler
//           />
//           <img src="/assets/search.svg" alt="search icon" />
//         </div>
//         <div className="filter">
//           <select
//             value={selectedOption}
//             onChange={handleChange}
//             className="outline-none p-2 rounded-md bg-[--secondary-color] text-black"
//             name="filter"
//           >
//             <option value="all">All</option>
//             <option value="completed">Completed</option>
//             <option value="remaining">Remaining</option>
//           </select>
//         </div>
//         <div>
//           <button
//             onClick={handleSearch}
//             className="p-2 bg-[--secondary-color] rounded-md active:translate-y-1 active:bg-[--primary-color] transition-all"
//           >
//             Search
//           </button>
//         </div>
//         <div>
//           <button
//             onClick={handleOpenCreateTodo}
//             className="p-2 bg-[--secondary-color] rounded-md active:translate-y-1 active:bg-[--primary-color] transition-all"
//           >
//             Create Todo
//           </button>
//           <CreateTodo
//             open={isCreateTodoOpen}
//             onClose={handleCloseCreateTodo}
//             onAddTodo={handleAddTodo}
//           />
//         </div>
//       </div>

//       {/* Todo list */}
//       {data && Array.isArray(data) && data.length > 0 ? (
//         data.map((todo: any) => (
//           <div
//             key={todo.id}
//             className={`border p-4 rounded-lg w-[590px] ${
//               todo.isCompleted ? "bg-green-400" : "bg-red-400"
//             }`}
//           >
//             <div className="flex items-center justify-between">
//               <h3 className="font-medium text-xl underline">{todo.title}</h3>
//               <button
//                 className={`toggle_isCompleted_btn p-2 rounded-full active:translate-y-0.5 ${
//                   todo.isCompleted ? "bg-red-400" : "bg-green-400"
//                 }`}
//                 onClick={() => toggleIsComplete(todo)} // Toggle completion
//               >
//                 {todo.isCompleted ? (
//                   <img
//                     src="/assets/close.svg"
//                     alt="mark todo as not completed"
//                   />
//                 ) : (
//                   <img src="/assets/check.svg" alt="mark todo as  completed" />
//                 )}
//               </button>
//             </div>

//             <p className="text-black mt-2">{todo.content}</p>
//             <div className="flex items-center justify-between mt-4">
//               <button
//                 className="delte_btn bg-[--primary-color] p-2 rounded-full active:translate-y-1 transition-all"
//                 onClick={() => handleDelete(todo.id)}
//               >
//                 <img src="/assets/delete.svg" alt="delete button" />
//               </button>
//               <button className="p-2 rounded-full bg-yellow-500">
//                 <img src="/assets/edit.svg" alt="edit button" />
//               </button>
//             </div>
//           </div>
//         ))
//       ) : (
//         <img className="h-96" src="/assets/notFound.png" alt="not found" />
//       )}
//     </>
//   );
// };

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import axios from "axios";
import { CreateTodo } from "./CreateTodo";

export const SearchBox = () => {
  const token = localStorage.getItem("accessToken");

  const [search, setSearch] = useState("");
  const [data, setData] = useState<any>([]);
  const [selectedOption, setSelectedOption] = useState("all");
  const [isCreateTodoOpen, setCreateTodoOpen] = useState(false);
  const [isUpdateTodoOpen, setUpdateTodoOpen] = useState(false);

  // New states for updating todo
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editTodoId, setEditTodoId] = useState<number | null>(null);

  // Open and close create todo modal with background blur effect
  const handleOpenCreateTodo = () => {
    setCreateTodoOpen(true);
    document.body.classList.add("backdrop-blur-lg");
  };

  const handleCloseCreateTodo = () => {
    setCreateTodoOpen(false);
    document.body.classList.remove("backdrop-blur-lg");
  };

  // Open update modal with pre-filled data
  const handleOpenUpdateTodo = (todo: any) => {
    setEditTitle(todo.title);
    setEditContent(todo.content);
    setEditTodoId(todo.id);
    setUpdateTodoOpen(true);
    document.body.classList.add("backdrop-blur-lg");
  };

  const handleCloseUpdateTodo = () => {
    setUpdateTodoOpen(false);
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

  // Handle update todo
  const handleUpdateTodo = async () => {
    if (editTodoId === null) return; // If no todo is selected for editing
    try {
      await axios.patch(
        `http://localhost:3000/todos/update/${editTodoId}`,
        {
          title: editTitle,
          content: editContent,
        },
        {
          headers: { Authorization: token },
        }
      );
      setData((prevData: any[]) =>
        prevData.map((todo: any) =>
          todo.id === editTodoId
            ? { ...todo, title: editTitle, content: editContent }
            : todo
        )
      );
      setUpdateTodoOpen(false); // Close modal after update
      document.body.classList.remove("backdrop-blur-lg");
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

  // Toggle isCompleted for todo
  const toggleIsComplete = async (todo: any) => {
    try {
      const updatedStatus = !todo.isCompleted;
      await axios.patch(
        `http://localhost:3000/todos/update/${todo.id}`,
        {
          isCompleted: updatedStatus,
        },
        {
          headers: { Authorization: token },
        }
      );
      setData((prevData: any[]) =>
        prevData.map((item: any) =>
          item.id === todo.id ? { ...item, isCompleted: updatedStatus } : item
        )
      );
    } catch (error) {
      console.error("Error toggling completion status:", error);
    }
  };

  return (
    <>
      {isCreateTodoOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-md z-20"></div>
      )}

      {isCreateTodoOpen && (
        <div className="fixed inset-0 z-30 flex justify-center items-center">
          <div className="bg-white p-4 rounded-md shadow-lg w-[300px]">
            {/* Create Todo Modal Content */}
            <CreateTodo
              open={isCreateTodoOpen}
              onClose={handleCloseCreateTodo}
              onAddTodo={handleAddTodo}
            />
          </div>
        </div>
      )}

      {/* Search and filter box */}
      <div className="search-box flex gap-2 w-full justify-center relative z-10">
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
        </div>
      </div>

      {/* Todo list */}
      {data && Array.isArray(data) && data.length > 0 ? (
        data.map((todo: any) => (
          <div
            key={todo.id}
            className={`border p-4 rounded-lg w-[590px] ${
              todo.isCompleted ? "bg-green-400" : "bg-red-400"
            }`}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-xl underline">{todo.title}</h3>
              <button
                className={`toggle_isCompleted_btn p-2 rounded-full active:translate-y-0.5 ${
                  todo.isCompleted ? "bg-red-400" : "bg-green-400"
                }`}
                onClick={() => toggleIsComplete(todo)} // Toggle completion
              >
                {todo.isCompleted ? (
                  <img
                    src="/assets/close.svg"
                    alt="mark todo as not completed"
                  />
                ) : (
                  <img src="/assets/check.svg" alt="mark todo as completed" />
                )}
              </button>
            </div>

            <p className="text-black mt-2">{todo.content}</p>
            <div className="flex items-center justify-between mt-4">
              <button
                className="delte_btn bg-[--primary-color] p-2 rounded-full active:translate-y-1 transition-all"
                onClick={() => handleDelete(todo.id)}
              >
                <img src="/assets/delete.svg" alt="delete button" />
              </button>
              <button
                onClick={() => handleOpenUpdateTodo(todo)}
                className="p-2 rounded-full bg-yellow-500"
              >
                <img src="/assets/edit.svg" alt="edit button" />
              </button>
            </div>
          </div>
        ))
      ) : (
        <img className="h-96" src="/assets/notFound.png" alt="not found" />
      )}

      {/* Update Todo Modal */}
      {isUpdateTodoOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-gradient-to-r from-[#545455] to-[#0C3140]">
          <div className="bg-white p-4 rounded-md shadow-lg w-[300px] space-y-2">
            <h3 className="font-semibold text-lg mb-2">Edit Todo</h3>
            <p className="text-sm text-gray-500">Title</p>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Title"
              className="w-full mb-2 p-2 border border-gray-400 rounded-md outline-none"
            />
            <p className="text-sm text-gray-500">Content</p>
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              placeholder="Content"
              className="w-full mb-2 p-2 h-32 border border-gray-400 rounded-md outline-none"
            />
            <div className="flex justify-between">
              <button
                onClick={handleUpdateTodo}
                className="bg-blue-500 text-white p-2 rounded-md"
              >
                Update
              </button>
              <button
                onClick={handleCloseUpdateTodo}
                className="bg-red-500 text-white p-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
