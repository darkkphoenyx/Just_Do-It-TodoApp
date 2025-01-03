import { Route, Routes } from "react-router-dom";
// import HomePage from "../pages/Homepage/HomePage";
import Login from "../pages/Login/Login";
import HomePage from "../pages/Homepage/HomePage";
import { Footer } from "../pages/Footer/Footer";

export default function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login onClose={() => {}} />}></Route>
        <Route path="/homepage" element={<HomePage />}></Route>
      </Routes>
      <Footer />
    </>
  );
}
