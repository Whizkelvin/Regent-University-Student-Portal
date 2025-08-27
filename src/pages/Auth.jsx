import React, { useState } from "react";
import banner from "../assets/Regent-banner.jpeg";
import Logo from "../assets/RUCST_logo (1).png";
import Signin from "./Signin";
import Signup from "./Signup";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate()

  return (
    <div className="mx-5 md:mx-0 md:w-full">
      <div className="relative">
        <img
          src={banner}
          alt=""
          className="md:w-full brightness-50 md:object-cover md:h-screen rounded-xl md:rounded-none"
        />
      </div>
      <div className="absolute bg-gradient-to-br from-green-50/90 to-red-50/70 w-[80%] p-3 flex flex-col left-0 right-0 m-auto top-[15%] rounded-2xl border-red-900 border shadow shadow-black/10">
        <div className="flex items-center justify-center gap-2 font-Merriweather py-6">
          <img src={Logo} alt="Logo" className="w-20" />
          <div className="text-center font-bold">
            <h1 className="text-sm md:text-3xl md:flex md:flex-col md:gap-3">
              REGENT UNIVERSITY OF COLLEGE{" "}
              <span className="text-red-950">SCIENCE AND TECHNOLOGY</span>
            </h1>
          </div>
        </div>
        <div className="text-center font-Merriweather">
          <h1 className="text-[20px] capitalize md:text-4xl">
            student information portal
          </h1>
          <p className="text-xl md:text-3xl md:text-green-950 mt-2">(SIP)</p>
        </div>
        <hr className=" my-3 bg-red-950" />
        <div>
          <Signin />
        </div>
         <div className="md:text-2xl text-center">
            <p>Don't have an account? <span><button onClick={() => navigate("/signup")}
              className="text-red-950">signup</button></span>
            </p>
          </div>
      </div>
    </div>
  );
};

export default Auth;
