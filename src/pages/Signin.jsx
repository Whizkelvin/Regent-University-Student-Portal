import { useState } from "react";
import { supabase } from "../../supabaseClients";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast"; 

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    // Fetch extra student info
    const { data: student, error: studentError } = await supabase
      .from("students")
      .select("*")
      .eq("uid", data.user.id)
      .single();

    if (studentError) {
      toast.error(studentError.message);
      return;
    }

    console.log("Student info:", student);
    navigate("/dashboard");
  };

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col p-5 justify-center items-center"
    >
      <input
        type="email"
        placeholder="Enter your school email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full p-4 bg-gray-100 border-gray-600 border rounded-md"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full p-4 bg-gray-100 border-gray-600 border my-5 rounded-md"
      />
      <button
        type="submit"
        className="bg-green-900 text-white p-4 w-full text-xl rounded-xl"
      >
        Login
      </button>
    </form>
  );
}
