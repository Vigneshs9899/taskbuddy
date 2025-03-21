// src/pages/Dashboard.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { logOut } from "../auth/authService";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if user is logged in
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        // Redirect to login if not authenticated
        navigate("/");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!user) {
    return null; // This shouldn't render as we redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6">
      {" "}
      {/* Ensuring equal side padding */}
      <div className="flex flex-col h-screen">
        {/* Top navigation */}
        <header className="px-6 py-4 rounded-md">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img
                src="/src/assets/task_icon.png"
                alt="TaskBuddy Logo"
                className="h-8 w-8"
              />
              <h1 className="text-2xl font-semibold font-Mulish text-[#2F2F2F]">
                TaskBuddy
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <img
                  src="/src/assets/Ellipse 326.png"
                  alt="User avatar"
                  className="h-8 w-8 rounded-full"
                />
                <span className="font-medium">{user.displayName}</span>
              </div>
            </div>
          </div>

          {/* Tab Section */}
          <div className="sm:flex justify-between items-center mt-3 hidden">
            <div className="flex items-center gap-4">
              {/* Tab 1 */}
              <button className="flex items-center px-4 py-2 text-lg font-semibold">
                <img className="w-5" src="src/assets/list.png" alt="" />
                List
              </button>

              {/* Tab 2 */}
              <button className="flex items-center px-4 py-2 text-lg font-semibold">
                <img
                  className="w-5"
                  src="src/assets/Group 1171276211.png"
                  alt=""
                />
                Board
              </button>
            </div>

            <button
              onClick={logOut}
              className="flex items-center gap-2 text-xs bg-[#FFF9F9] text-gray-800 font-semibold border border-[#7B1984] px-4 py-2 rounded-full hover:bg-red-100 transition cursor-pointer"
            >
              <img src="/src/assets/XMLID_6_.png" alt="Logout" />
              Logout
            </button>
          </div>

          <div className="sm:hidden flex justify-end mt-2">
            
            <button className="bg-[#7B1984] text-white rounded-full px-6 py-2 text-xs hover:bg-[#651470] transition">
              ADD TASK
            </button>
          </div>

          {/* Category and filter section */}
          <div className="flex flex-wrap justify-between items-center mt-4 mb-2">
            <div className="flex items-center gap-4">
              <p className="text-sm font-medium text-gray-600">Filter by:</p>

              <select className="border border-gray-300 py-2 px-4 rounded-full text-sm focus:ring-2 focus:ring-purple-200 focus:border-[#7B1984]">
                <option>Category</option>
                <option>Work</option>
                <option>Personal</option>
                <option>School</option>
              </select>

              <select className="border border-gray-300 py-2 px-4 rounded-full text-sm focus:ring-2 focus:ring-purple-200 focus:border-[#7B1984]">
                <option>Due Date</option>
                <option>Today</option>
                <option>Tomorrow</option>
                <option>This Week</option>
                <option>Next Week</option>
              </select>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative hidden sm:block">
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-full w-64 focus:ring-2 focus:ring-purple-200 focus:border-[#7B1984]"
                />
                <svg
                  className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              <button className="hidden sm:block bg-[#7B1984] text-white rounded-full px-6 py-2 text-xs hover:bg-[#651470] transition">
                ADD TASK
              </button>
            </div>
          </div>
        </header>

        {/* Task Table Heading */}
        <div className="py-3 border-t border-gray-300 mt-3 px-6 hidden sm:block">
          <div className="grid grid-cols-4 text-gray-600 font-semibold text-sm">
            <p>Task Name</p>
            <p>Due On</p>
            <p>Task Status</p>
            <p>Task Category</p>
          </div>
        </div>

        {/* todo contents*/}
        <div className="mt-2 px-6">
          <div className="bg-[#FAC3FF] p-3 rounded-t-2xl flex justify-between">
            <p className="font-Mulish font-semibold text-black text-sm">
              Todo ()
            </p>
            <img className="w-6" src="src\assets\chevron-down.svg" alt="" />
          </div>
          <div className="py-3 border-b border-gray-300 pt-2 px-6 bg-[#F1F1F1] flex text-sm">
            <img className="w-3" src="src\assets\plus.svg" alt="" />
            <p className="font-bold font-Mulish text-gray-600">ADD TASK</p>
          </div>
          <div className="py-3 pt-2 px-6 bg-[#F1F1F1] min-h-50 flex items-center justify-center text-sm rounded-b-2xl">
            <p className="font-Mulish font-medium text-gray-600">
              No Tasks in To-Do
            </p>
          </div>
        </div>

        {/* in progress contents */}
        <div className="mt-5 px-6">
          <div className="bg-[#85D9F1] p-3 rounded-t-2xl flex justify-between">
            <p className="font-Mulish font-semibold text-black text-sm">
              In-Progress ()
            </p>
            <img className="w-6" src="src\assets\chevron-down.svg" alt="" />
          </div>

          <div className="py-3 pt-2 px-6 bg-[#F1F1F1] min-h-40 flex items-center justify-center text-sm rounded-b-2xl">
            <p className="font-Mulish font-medium text-gray-600">
              No Tasks In Progress
            </p>
          </div>
        </div>

        {/* completed contents */}
        <div className="mt-5 px-6 mb-5">
          <div className="bg-[#CEFFCC] p-3 rounded-t-2xl flex justify-between">
            <p className="font-Mulish font-semibold text-black text-sm">
              Completed ()
            </p>
            <img className="w-6" src="src\assets\chevron-down.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
