import React from 'react'
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/images/CircadiaLux2.png";
import "../index.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white relative">
      <motion.img
        src={logo}
        alt="CircadiaLux Logo"
        className="w-42 h-42"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <h1 className="text-5xl font-bold mt-4">CircadiaLux</h1>
      <p className="text-gray-600 text-1xl mt-2">Light that cares for you</p>
      <motion.button
        onClick={() => navigate("/login")}
        className="mt-6 cursor-pointer px-6 py-2 bg-gradient-to-r from-[#36AFDE] to-[#74DAF6] text-white rounded-full font-bold focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all hover:brightness-90 shadow-md"
        whileTap={{ scale: 0.97 }}
      >
        Get Started
      </motion.button>
    </div>
  );
};

export default Home;
