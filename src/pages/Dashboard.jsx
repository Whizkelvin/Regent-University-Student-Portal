// src/pages/Dashboard.tsx
import { useContext, useEffect, useState } from "react";
import Logo from "../assets/RUCST_logo (1).png";
import { AuthContext } from '../context/AuthContext';
import AOS from "aos";
import "aos/dist/aos.css";
import { MdAccountBox } from "react-icons/md";
import { FaCircleUser } from "react-icons/fa6";

import { PiExamFill } from "react-icons/pi";
import {
  FaPhone,
  FaRegCalendarTimes,
  FaWallet,
  FaWpforms,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClients";



const Dashboard = () => {
  const { student, session, signOut } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    AOS.init({
      duration: 500,
      delay: 300,
      once: true, 
    });
  }, []);

  useEffect(()=>{
    const fetchUser = async () => {
    const { data, error } = await supabase
      .from("students")
      .select("student_id, programme, year")   
      .eq("uid", session?.user?.id) 
      .single();

    if (error) {
      console.error("Error fetching student:", error);
    } else {
      setUser(data);
    }
    setLoading(false);
  };

  if (session?.user) {
    fetchUser();
  }

  }, [session])
console.log(session);


  return (
    <div className="px-5 pt-7 min-h-screen">
    
      <div className="flex items-center justify-center gap-2 font-Merriweather bg-gray-100 rounded-md p-4">
        <img src={Logo} alt="Logo" className="w-20" />
        <div className="text-center font-bold">
          <h1 className="text-md">
            REGENT UNIVERSITY OF COLLEGE{" "}
            <span className="text-green-950">SCIENCE AND TECHNOLOGY</span>
            <p>( RUCST )</p>
          </h1>
        </div>
      </div>


      <div
        data-aos="fade-left"
        className="my-4 bg-gray flex p-4 rounded-xl gap-2 flex-col"
      >
        <div className="flex gap-3  items-center">
          <FaCircleUser  className="text-3xl"/>
          <div className="flex flex-col">
            <span>{session.user.email}</span>
             <span>{user?.student_id}</span>
             <span>{user?.student_programme}</span>
             <span>{user?.student_year}</span>
          </div>
        </div>
        <p className="text-sm text-gray-400">Academic Year</p>
        <h1 className="font-Merriweather font-black text-green-900 text-xl">
          2025/2026, First Semester
        </h1>
      </div>

      <button
        data-aos="fade-right"
        className=" font-semibold my-4 bg-white flex p-4 rounded-xl gap-2 flex-col justify-center items-center w-full"
      >
        <MdAccountBox className="text-4xl text-green-950" />
        <p> My Account</p>
      </button>

      <button
        data-aos="fade-right"
        className=" font-semibold my-4 bg-white flex p-4 rounded-xl gap-2 flex-col justify-center items-center w-full"
      >
        <FaWallet className="text-4xl text-green-950" />
        <p> Account Statement</p>
      </button>
      <button
        data-aos="fade-up"
        className=" font-semibold my-4 bg-white flex p-4 rounded-xl gap-2 flex-col justify-center items-center w-full"
      >
        <FaWpforms className="text-4xl text-green-950" />
        <p> Courses Registered</p>
      </button>
      <button
        data-aos="fade-up"
        className=" font-semibold my-4 bg-white flex p-4 rounded-xl gap-2 flex-col justify-center items-center w-full"
      >
        <FaRegCalendarTimes className="text-4xl text-green-950" />
        <p> Lecture Timetable</p>
      </button>
      <button
      onClick={()=>navigate('/resultslip')}
        data-aos="fade-up"
        className=" font-semibold my-4 bg-white flex p-4 rounded-xl gap-2 flex-col justify-center items-center w-full"
      >
        <PiExamFill className="text-4xl text-green-950" />
        <p> My Result Slip</p>
      </button>
      <button
        data-aos="fade-up"
        className=" font-semibold my-4 bg-white flex p-4 rounded-xl gap-2 flex-col justify-center items-center w-full"
      >
        <FaPhone className="text-4xl text-green-950" />
        <p> Contact</p>
      </button>
      <div className="flex items-center justify-center pb-4">
        <button  onClick={signOut}  className="text-red-500 border-2 px-4 py-2 rounded-lg border-green-900 mb-5">Sign Out</button>
      </div>
    </div>
  );
};

export default Dashboard;
