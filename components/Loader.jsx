import React from "react";
import "../styles/globals.css";
const Loader = () => {
  return (
    <div className="h-[50vh] grid justify-center items-center ">
      <div class="w-full gap-x-2 flex justify-center items-center">
        <div class="w-5 bg-[#58c992] animate-pulse h-5 rounded-full "></div>
        <div class="w-5 animate-pulse h-5 bg-[#56a1f6] rounded-full "></div>
        <div class="w-5 h-5 animate-pulse bg-[#9b2de5] rounded-full "></div>
      </div>
    </div>
  );
};

export default Loader;
