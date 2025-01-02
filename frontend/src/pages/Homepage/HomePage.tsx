/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SearchBox } from "../../components/SearchBox";

export default function HomePage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  };
  return (
    <>
      <div className="container mx-auto flex justify-center items-center flex-col space-y-4">
        <div className="logout_btn absolute top-4 right-4 bg-[--primary-color] p-2 rounded-lg active:translate-y-1 active:bg-[--primary-color]  transition-all">
          <button onClick={handleLogout}>Logout</button>
        </div>
        <h1 className="font-bold mt-8 text-4xl text-[--primary-color]">
          Welcome to a Simple Todo App
        </h1>
        <h3 className="font-semibold pt-8 text-3xl">TODO List</h3>
        <SearchBox />
      </div>
    </>
  );
}
