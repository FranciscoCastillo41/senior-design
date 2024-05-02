import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Component imports
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Dashboard from "./Components/Dashboard";
import PreviewBlog from "./Components/PreviewBlog";
import BlogPosts from "./Components/ViewAllPosts";

import Events from "./Components/Events";
import Analytics from "./Components/Analytics";
import MapContainer from "./Components/Map";

// Authentication imports
import Signin from "./Auth/Signin";
import Signup from "./Auth/Signup";

// Page imports
import Home from "./Pages/Home";
import About from "./Pages/About";
import CreatePost from "./Pages/Post";
import PostPage from "./Pages/PostPage";
import Profile from "./Components/Profile";



function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/map" element={<MapContainer />} />
        <Route path="/createPost" element={<CreatePost/>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/previewBlog" element={<PreviewBlog />} />
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/blogPosts" element={<BlogPosts />} />
        <Route path="/events" element={<Events/>} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/posts/:postId" element={<PostPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
