/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SearchBox } from "../../components/SearchBox";

export default function HomePage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const username = localStorage.getItem("username");

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <div className="flex min-h-screen items-center flex-col space-y-4 pb-2">
        <div
          className="logout_btn absolute flex items-center justify-center
        flex-col space-y-4 top-4 right-4 bg-[--primary-color] p-2 rounded-lg "
        >
          <div className="flex items-start justify-between gap-1 p-2 rounded-lg ">
            <img src="/assets/account.svg" alt="account profile" />
            {username}
          </div>
          <div>
            <button
              className="active:translate-y-1 active:bg-[--p1-color] bg-[#0D3140] text-white p-2 px-5 rounded-md transition-all"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
        <h1 className="font-medium mt-8 text-6xl text-[--primary-color] pt-12 pb-4">
          Just Do It.
        </h1>
        <SearchBox />
      </div>
    </>
  );
}
