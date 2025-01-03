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
      <div className="flex min-h-[100vh] items-center flex-col space-y-4 pb-4">
        <div className="logout_btn absolute top-4 right-4 bg-[--primary-color]  p-2 rounded-lg active:translate-y-1 active:bg-[--primary-color]  transition-all">
          <button onClick={handleLogout}>Logout</button>
        </div>
        <h1 className="font-medium mt-8 text-6xl text-[--primary-color] pt-16 pb-4">
          Just Do It.
        </h1>
        <SearchBox />
      </div>
      <p className="text-center p-2 text-white">All rights reserved © Deepesh Sunuwar</p>
    </>
  );
}
