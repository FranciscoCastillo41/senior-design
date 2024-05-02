import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../src/Services/firebase";
import MapContainer from "./Map";
import CreatePost from "../Pages/Post";
import DashSidebar from "./DashSidebar";
import Profile from "./Profile";
import Events from "./Events";
import Analytics from "./Analytics";

const Dashboard = () => {
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

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar */}
      <DashSidebar />
      {/* Main Content */}
      <div className="flex-1">
        <main>
          {tab === "createPost" && <CreatePost />}
          {tab === "profile" && <Profile />}
          {tab === "map" && <MapContainer />}
          {tab === "events" && <Events />}
          {tab == "analytics" && <Analytics />}
          
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

