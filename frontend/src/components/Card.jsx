import React from "react";
import { TfiArrowCircleRight } from "react-icons/tfi";

const Card = ({title,count}) => {
  return (
      <div className="bg-gradient-to-br from-[#81E5FF] to-[#2197CD] p-6 rounded-[25px] shadow-lg w-[350px] h-[235px] text-left relative">
       
        <p className="text-white text-[29px] mb-2">{title}</p>

        <p className="text-white text-[128px] leading-none">{count}</p>

        <div className="absolute bottom-7 right-7 cursor-pointer transition-all">
          <TfiArrowCircleRight className="text-white text-[32px] p-[1px] rounded-full hover:bg-white hover:text-[#2197CD] transition-colors duration-300" />
        </div>
      </div>
  );
};

export default Card;
