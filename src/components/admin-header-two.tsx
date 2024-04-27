"use client";

import { useRouter } from "next/navigation";
import React from "react";

const AdminHeaderTwo = () => {
  const router = useRouter();

  return (
    <div className="w-full h-[50px] bg-slate-600 flex justify-between items-center px-4 py-1">
      <div className="flex items-center gap-3"></div>
      <div className="flex justify-between gap-3 items-center">
        <button
          onClick={() => {
            router.push("/admin");
          }}
          className="font-semibold text-white relative group"
        >
          <span className="relative z-10 text-[16px] sm:text-[10px]">
            Registered Users
          </span>
          <span className="absolute inset-x-0 bottom-0 h-0.5 bg-green-500 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
        </button>
        <button
          onClick={() => {
            router.push("/");
          }}
          className="font-semibold text-white relative group"
        >
          <span className="relative z-10 text-[16px] sm:text-[10px]">
            Audience Panel
          </span>
          <span className="absolute inset-x-0 bottom-0 h-0.5 bg-green-500 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
        </button>
        <button
          onClick={() => {
            router.push("/create");
          }}
          className="font-semibold text-white relative group p-1 px-5 py-2 bg-green-500 hover:bg-green-600  rounded-md text-[16px] sm:text-[10px] duration-300"
        >
          Create Event
        </button>
      </div>
    </div>
  );
};

export default AdminHeaderTwo;
