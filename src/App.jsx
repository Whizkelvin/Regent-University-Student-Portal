import React from "react";
import { Route, Routes } from "react-router-dom";

import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboad";
import ProtectedRoute from "./components/ProtectedRoute"; 
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      {/* All your routes/components */}
      <Toaster position="top-center" reverseOrder={false} />
       <div>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />

        {/* Protect the dashboard */}
        <Route
    path="/dashboard"
    element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    }
  />
      </Routes>
    </div>
    </>
   
  );
};

export default App;
