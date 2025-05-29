import React from "react";
import { TfiArrowCircleRight } from "react-icons/tfi";
import CircadiuLuxLogo from '../assets/images/CircadiaLux2.png';

const Card = ({ title, count }) => {
  return (
    <div className="cursor-pointer bg-gradient-to-r from-[#36AFDE] to-[#74DAF6] shadow-xl text-white hover:brightness-90 focus:outline-none focus:ring-4 focus:ring-blue-300 p-6 rounded-[25px] w-[350px] h-[235px] text-left relative hover:brightness-103 transition-transform duration-300 hover:scale-102 overflow-hidden">
      {/* Texture background */}
      <img src={CircadiuLuxLogo} alt="CircadiaLux Texture" className="absolute inset-20 w-70 h-70 object-cover opacity-60 pointer-events-none select-none mix-blend-lighten" />

      <p className="text-white text-[29px] mb-2">{title}</p>

      <p className="text-white text-[128px] leading-none">{count}</p>

      <div className="absolute bottom-7 right-7 cursor-pointer transition-all">
        <TfiArrowCircleRight className="text-white text-[32px] p-[1px] rounded-full hover:bg-white hover:text-[#2197CD] transition-colors duration-300" />
      </div>
    </div>
  );
};

export default Card;
