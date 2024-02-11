import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Component imports
import Header from "./Components/Header";
import Footer from "./Components/Footer";

// Authentication imports
import Signin from "./Auth/Signin";
import Signup from "./Auth/Signup";

// Page imports
import Home from "./Pages/Home";
import About from "./Pages/About";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
