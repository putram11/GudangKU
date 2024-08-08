import { useState } from "react";
import { appRequest } from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { FaWarehouse } from 'react-icons/fa';
import { GoogleLogin } from "@react-oauth/google"; // Import GoogleLogin

export default function LoginPage() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleChangeInput = (event) => {
    const key = event.target.name;
    const value = event.target.value;

    setUserData({
      ...userData,
      [key]: value,
    });
  };

  const navigate = useNavigate();
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const { email, password } = userData;

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      const { data } = await appRequest({
        url: "/login",
        method: "POST",
        data: { email, password },
      });

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("id", data.id);
      localStorage.setItem("role", data.role);

      const role = localStorage.getItem("role");

      if (role === "Admin") {
        navigate("/good"); 
      } else if (role === "Staff"){
        navigate("/log"); 
      }
      
    } catch (error) {
      console.error(error);
      alert("Login failed. Please check your credentials and try again.");
    }
  };

  const handleGoogleLoginSuccess = async (response) => {
    try {
      const { data } = await appRequest({
        url: "/auth/google",
        method: "POST",
        data: { credential: response.credential },
      });

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("id", data.id);
      localStorage.setItem("role", data.role);

      const role = localStorage.getItem("role");

      if (role === "Admin") {
        navigate("/good"); 
      } else if (role === "Staff") {
        navigate("/log");
      }
    } catch (error) {
      console.error("Google login failed", error);
      alert("Google login failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg border border-gray-200">
        <div className="flex items-center justify-center mb-6">
          <FaWarehouse size={48} className="text-gray-700" />
        </div>
        <h3 className="text-3xl font-bold text-center text-gray-700 mb-6">Gudangku</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-3 border border-gray-300 bg-gray-100 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              placeholder="Enter your email"
              value={userData.email}
              onChange={handleChangeInput}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-3 border border-gray-300 bg-gray-100 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              placeholder="Enter your password"
              value={userData.password}
              onChange={handleChangeInput}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-700 text-white py-3 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Sign In
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-700 mb-4">Or sign in with Google</p>
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </div>
      </div>
    </div>
  );
}
