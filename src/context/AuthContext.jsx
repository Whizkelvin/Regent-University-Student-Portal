// context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { supabase } from "../../supabaseClients";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching session:", error.message);
        toast.error("Failed to fetch session");
      }
      setSession(data?.session || null);
      setLoading(false);
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setLoading(false);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // ✅ Sign out function
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Signed out successfully");
      setSession(null);
      setStudent(null);
    }
  };

  const value = {
    session,
    student,
    loading,
    signOut, // 👈 make it available
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <p className="text-lg font-semibold">Loading...</p>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
