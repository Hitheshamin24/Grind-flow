import React, { useState } from "react";
import { login, register } from "../api/auth";
import { useNavigate } from "react-router-dom";
const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [mode, setMode] = useState("login");
const navigate=useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === "login") {
        const response = await login(email, password);
        const data = response.data;
        localStorage.setItem("token", data.token);
        navigate("/dashboard")
      } else {
        await register(name, email, password);
        alert("Registration successful! You can now log in.");
        setMode("login");
      }
    } catch (error) {
      console.error(`${mode} failed:`, error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-200 flex flex-col items-center justify-center p-4">
      
      <button 
        className="mb-8 px-6 py-2 rounded-full bg-white shadow-md text-blue-600 font-semibold hover:bg-blue-50 hover:shadow-lg transition-all duration-300 active:scale-95"
        onClick={() => setMode(mode === "login" ? "register" : "login")}
      >
        {mode === "login" ? "Need an account? Register" : "Have an account? Login"}
      </button>

      <div className="bg-white p-8 w-full max-w-md rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
        <h1 className="text-3xl font-extrabold mb-6 text-gray-800 text-center capitalize tracking-tight">
          {mode}
        </h1>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {mode === "register" && (
            <div className="flex flex-col transition-all duration-300">
              <label className="text-sm font-semibold text-gray-700 mb-1" htmlFor="name">Name</label>
              <input
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Hithesh"
              />
            </div>
          )}

          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-1" htmlFor="email">Email</label>
            <input
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="enter your email"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-1" htmlFor="password">Password</label>
            <input
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>

          <button
            className="mt-4 bg-blue-600 text-white font-bold px-4 py-3 rounded-lg hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300 active:scale-95 transition-all duration-200"
            type="submit"
          >
            {mode === "login" ? "Sign In" : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;