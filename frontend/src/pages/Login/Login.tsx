/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  onClose: () => void; // Define onClose as a function that returns void
}

interface SignInData {
  email: string;
  password: string;
}

interface SignUpData {
  username: string;
  email: string;
  password: string;
}

export default function Login({ onClose }: LoginProps) {
  const [isSignUpVisible, setIsSignUpVisible] = useState(false);
  const navigate = useNavigate();
  const [signInData, setSignInData] = useState<SignInData>({
    email: "",
    password: "",
  });
  const [signUpData, setSignUpData] = useState<SignUpData>({
    username: "",
    email: "",
    password: "",
  });

  const loginRef = useRef<HTMLDivElement>(null); // Create a ref for the login div

  const handleSignUpClick = () => {
    setIsSignUpVisible(true);
  };

  const handleSignInClick = () => {
    setIsSignUpVisible(false);
  };

  // Handle Sign In Request
  const handleSignInSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/user/login",
        signInData
      );
      const data: any = response.data;

      console.log("Sign In Success:", data.accessToken); // Handle successful sign-in
      localStorage.setItem("accessToken", data.accessToken);
      // Show success alert
      Swal.fire({
        icon: "success",
        title: "Sign In Successful",
        text: "Welcome back!",
      }).then(() => navigate("/homepage/"));
    } catch (error) {
      console.error("Error during sign-in:", error); // Handle sign-in error

      // Show error alert
      Swal.fire({
        icon: "error",
        title: "Sign In Failed",
        text: "Please check your credentials and try again.",
      });
    }
  };

  // Handle Sign Up Request
  const handleSignUpSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/user/signup",
        signUpData
      );
      const data = response.data;

      console.log("Sign Up Success:", data); // Handle successful sign-up

      // Show success alert
      Swal.fire({
        icon: "success",
        title: "Sign Up Successful",
        text: "You can now sign in!",
      });
    } catch (error) {
      console.error("Error during sign-up:", error); // Handle sign-up error

      // Show error alert
      Swal.fire({
        icon: "error",
        title: "Sign Up Failed",
        text: "Please try again later.",
      });
    }
  };

  // Close the login div when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        loginRef.current &&
        !loginRef.current.contains(event.target as Node)
      ) {
        onClose(); // Call onClose when clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="relative flex items-center justify-center h-screen w-screen">
      <div
        ref={loginRef} // Attach the ref to the main login div
        className="relative w-full max-w-4xl h-[500px] rounded-2xl bg-white shadow-lg flex"
      >
        {/* Sign In Form */}
        <div
          className={`w-1/2 h-full bg-white flex flex-col rounded-2xl justify-center items-center px-10 transition-all duration-700 ${
            isSignUpVisible ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <h1 className="text-3xl font-bold mb-4">Sign In</h1>
          <span className="text-sm mb-4">Enter Your Credentials</span>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-4 border rounded-lg bg-gray-200"
            value={signInData.email}
            onChange={(e) =>
              setSignInData({ ...signInData, email: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-4 border rounded-lg bg-gray-200"
            value={signInData.password}
            onChange={(e) =>
              setSignInData({ ...signInData, password: e.target.value })
            }
          />
          <a href="#" className="text-sm text-[--primary-color] mb-4">
            Forgot Your Password?
          </a>
          <button
            className="bg-[--primary-color] text-white py-2 px-6 rounded-full"
            onClick={handleSignInSubmit}
          >
            Sign In
          </button>
        </div>

        {/* Sign Up Form */}
        <div
          className={`w-1/2 h-full bg-white flex flex-col rounded-2xl justify-center items-center px-10 transition-all duration-700 ${
            isSignUpVisible ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <h1 className="text-3xl font-bold mb-6">Create Account</h1>
          <span className="text-sm mb-4">
            Enter the data below to create an account
          </span>
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 mb-4 border rounded-lg bg-gray-200"
            value={signUpData.username}
            onChange={(e) =>
              setSignUpData({ ...signUpData, username: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-4 border rounded-lg bg-gray-200"
            value={signUpData.email}
            onChange={(e) =>
              setSignUpData({ ...signUpData, email: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-4 border rounded-lg bg-gray-200"
            value={signUpData.password}
            onChange={(e) =>
              setSignUpData({ ...signUpData, password: e.target.value })
            }
          />
          <button
            className="bg-[--primary-color] text-white py-2 px-6 rounded-full"
            onClick={handleSignUpSubmit}
          >
            Sign Up
          </button>
        </div>

        {/* Overlapping Div */}
        <div
          className={`absolute right-0 top-0 rounded-2xl w-1/2 h-full bg-[--primary-color] flex flex-col items-center justify-center transition-transform duration-700 ${
            isSignUpVisible ? "-translate-x-full" : "translate-x-0"
          }`}
          style={{ zIndex: 10 }}
        >
          <h1 className="text-3xl font-bold mb-6 text-white">
            {isSignUpVisible ? "Welcome Back!" : "Hello, Friend!"}
          </h1>
          <p className="mb-4 text-white">
            {isSignUpVisible
              ? "Sign in to continue your journey!"
              : "Sign up and Create Your First Todo now."}
          </p>
          <button
            className="bg-transparent border-white border py-2 px-6 rounded-full"
            onClick={isSignUpVisible ? handleSignInClick : handleSignUpClick}
          >
            {isSignUpVisible ? "Sign In" : "Sign Up"}
          </button>
        </div>
        <button className="absolute top-2 right-4 text-white" onClick={onClose}>
          &times;
        </button>
      </div>
    </div>
  );
}
