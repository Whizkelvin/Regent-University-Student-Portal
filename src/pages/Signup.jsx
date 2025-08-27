import { useState } from "react";
import { supabase } from "../../supabaseClients";
import { useNavigate } from "react-router-dom";
import banner from "../assets/Regent-banner.jpeg";
import Logo from "../assets/RUCST_logo (1).png";
import toast from "react-hot-toast";

export default function Signup() {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    student_id: "",
    programme: "",
    level: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSignup = async (e) => {
  e.preventDefault();

  const schoolDomain = "@regent.edu.gh"; 
  if (!form.email.endsWith(schoolDomain)) {
    toast.error("You must use your school email address to sign up.");
    return;
  }

  if (form.student_id.length !== 8) {
    toast.error("Student ID must be exactly 9 digits");
    return;
  }

  // Step 1: Create user in Supabase Auth and add metadata
  const { data: signupData, error: signupError } = await supabase.auth.signUp({
    email: form.email,
    password: form.password,
    options: {
      data: {
        full_name: form.full_name,
        student_id: form.student_id,
        programme: form.programme,
        level: form.level,
      },
    },
  });

  if (signupError) {
    toast.error(signupError.message);
    return;
  }

  const user = signupData.user;
  if (!user) {
    toast.error("User not created.");
    return;
  }

  // Step 2: Insert student info into students table
  const { error: insertError } = await supabase.from("students").insert([
    {
      uid: user.id,               // link to Auth user
      full_name: form.full_name,
      student_id: form.student_id,
      programme: form.programme,
      level: form.level,
    },
  ]);

  if (insertError) {
    toast.error("Failed to save student info: " + insertError.message);
    return;
  }

  toast.success("Signup successful! Check your email to verify your account.");
  navigate("/");
};


  return (
    <div className="mx-5 md:mx-0 md:w-full">
      <div className="relative">
        <img
          src={banner}
          alt=""
          className="md:w-full brightness-50 md:object-cover md:min-h-screen rounded-xl md:rounded-none"
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

        <form onSubmit={handleSignup} className="flex flex-col">
          <input
            name="full_name"
            placeholder="Full Name"
            onChange={handleChange}
            required
            className="w-full p-4 bg-gray-100 border-gray-600 border my-2 rounded-md"
          />
          <input
            type="email"
            name="email"
            placeholder="School Email"
            onChange={handleChange}
            required
            className="w-full p-4 bg-gray-100 border-gray-600 border my-2 rounded-md"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            minLength={8}
            maxLength={20}
            onChange={handleChange}
            required
            className="w-full p-4 bg-gray-100 border-gray-600 border my-2 rounded-md"
          />
          <input
            type="number"
            name="student_id"
            placeholder="School ID (9 digits)"
            
            onChange={handleChange}
            required
            className="w-full p-4 bg-gray-100 border-gray-600 border my-2 rounded-md"
          />
          <select
            name="programme"
            onChange={handleChange}
            required
            className="w-full p-4 bg-gray-100 border-gray-600 border my-2 rounded-md"
          >
            <option value="">Select Program</option>
            <option value="BSc Info Systems">BSc Information Systems</option>
            <option value="BSc Computer Science">BSc Computer Science</option>
          </select>
          <select
            name="level"
            onChange={handleChange}
            required
            className="w-full p-4 bg-gray-100 border-gray-600 border my-2 rounded-md"
          >
            <option value="">Select Level</option>
            <option value="100">100</option>
            <option value="200">200</option>
            <option value="300">300</option>
            <option value="400">400</option>
          </select>
          <button
            type="submit"
            className="bg-green-900 text-white p-4 w-full text-xl rounded-xl mb-5"
          >
            Sign Up
          </button>
        </form>

        <div className="md:text-2xl text-center">
          <p>
            Already have an account?{" "}
            <span>
              <button
                onClick={() => navigate("/")}
                className="text-red-950"
              >
                Sign in
              </button>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
