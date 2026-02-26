import React from "react";
import AuthPage from "./pages/AuthPage";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
const RequireAuth = ({ children }) => {
  const token = localStorage.getItem("token");
  const location = useLocation();
  if (!token) {
    return <Navigate to="/auth" replace state={{ from: location }} />;
  }
  return children;
};
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/auth" element={<AuthPage/>}/>
        <Route path="/dashboard" element={
          <RequireAuth>
            <HomePage/>
          </RequireAuth>
        }/>

        <Route path="" element={<Navigate to="/dashboard/"  replace/> } />
      </Routes>


    </div>
  );
};

export default App;
