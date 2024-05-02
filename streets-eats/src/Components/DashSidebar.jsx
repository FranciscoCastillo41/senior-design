import React, { useState, useEffect } from "react";
import { useNavigate, Link, Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { auth } from "../../src/Services/firebase";

const DashSidebar = () => {
  const location = useLocation();
  const [tab, setTab] = useState();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        navigate("/signin");
      }
    });

    return unsubscribe;
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigate("/signin");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="w-64 bg-gray-800 p-4">
      <h1 className="text-white text-2xl font-bold mb-6">Streets Eats</h1>
      <ul>
        <li className="mb-3">
          <Link
            to="/dashboard?tab=analytics"
            className="text-gray-300 hover:text-white block py-2 px-4 rounded transition duration-300 border border-gray-300 hover:border-gray-400"
          >
            <i className="fas fa-chart-line mr-2"></i> Dashboard
          </Link>
        </li>
        <li className="mb-3">
          <Link
            to="/dashboard?tab=map"
            className="text-gray-300 hover:text-white block py-2 px-4 rounded transition duration-300 border border-gray-300 hover:border-gray-400"
          >
            <i className="fas fa-map mr-2"></i> Interactive Map
          </Link>
        </li>
        <li className="mb-3">
          <Link
            to="/dashboard?tab=createPost"
            className="text-gray-300 hover:text-white block py-2 px-4 rounded transition duration-300 border border-gray-300 hover:border-gray-400"
          >
            <i className="fas fa-edit mr-2"></i> Create Post
          </Link>
        </li>
        <li className="mb-3">
          <Link
            to="/dashboard?tab=events"
            className="text-gray-300 hover:text-white block py-2 px-4 rounded transition duration-300 border border-gray-300 hover:border-gray-400"
          >
            <i className="fas fa-calendar-alt mr-2"></i> Find Events
          </Link>
        </li>
        <li className="mb-3">
          <Link
            to="/dashboard?tab=profile"
            className="text-gray-300 hover:text-white block py-2 px-4 rounded transition duration-300 border border-gray-300 hover:border-gray-400"
          >
            <i className="fas fa-user mr-2"></i> Profile
          </Link>
        </li>

        <li>
          <button
            onClick={handleSignOut}
            className="text-gray-300 hover:text-white block py-2 px-4 rounded transition duration-300"
          >
            <i className="fas fa-sign-out-alt mr-2"></i> Sign Out
          </button>
        </li>
      </ul>
    </div>
  );
};

export default DashSidebar;

