"use client";

import { Status } from "@prisma/client";
import axios from "axios";
import React from "react";

const RegisteredEvent = ({ title, id }: { title: any; id: String }) => {
  const changeStatus = async (status: Status) => {
    try {
      await axios.patch(`/api/userevent/${id}`, { status });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-start justify-center w-[135px] h-[75px] gap- bg-white p-2 rounded-md gap-2 overflow-x-auto">
      <p className="text-[12px] font-semibold text-black">{title}</p>
      <div className="flex items-center justify-center gap-2">
        <button
          className="bg-red-500 hover:bg-red-700 hover:text-gray-300 text-white duration-300 p-1 rounded-md text-[10px]"
          onClick={() => changeStatus("rejected")}
        >
          Reject
        </button>
        <button
          className="bg-green-500 hover:bg-green-600 hover:text-gray-300 duration-300 text-white p-1 rounded-md text-[10px]"
          onClick={() => changeStatus("approved")}
        >
          Approve
        </button>
      </div>
    </div>
  );
};

export default RegisteredEvent;
