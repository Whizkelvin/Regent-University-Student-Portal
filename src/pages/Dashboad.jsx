import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';

const Dashboad = () => {
  const { student, session, signOut } = useContext(AuthContext);
  return (
    <nav className="p-4 bg-green-900 text-white flex justify-between">
      <h1>Student Portal</h1>
      {session ? (
        <div className="flex gap-4 items-center">
          <span>{student?.full_name || session.user.email}</span>
          <button onClick={signOut} className="bg-red-600 px-3 py-1 rounded">
            Logout
          </button>
        </div>
      ) : (
        <span>Not logged in</span>
      )}
    </nav>
  );
}

export default Dashboad