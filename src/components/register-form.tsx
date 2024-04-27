"use client";

import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import axios from "axios";

const RegisterForm = ({ user }: { user: User }) => {
  const session = useSession();

  const [name, setName] = useState(user?.name!);
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber!);
  const [birthDate, setBirthDate] = useState(
    user?.birthDate!
      ? new Date(user?.birthDate!).toISOString().split("T")[0]
      : ""
  );
  const [occupation, setOccupation] = useState(user?.occupation!);

  const router = useRouter();

  const submitInfo = async () => {
    try {
      if (name && phoneNumber && birthDate && occupation) {
        await axios.patch(`/api/user/${user.id}`, {
          name,
          phoneNumber,
          birthDate,
          occupation,
        });
        router.push("/");
        router.refresh();
      } else {
        window.alert("Make sure to fill all the information.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" flex flex-col w-full items-center justify-center">
      <div className="bg-slate-500 w-[500px] sm:w-[250px] h-[300px] flex flex-col gap-2 justify-between my-4 p-2 rounded-md overflow-hidden">
        <div className="flex flex-col gap-3 px-2">
          <p className="font-semibold text-[18px] text-white">
            Please fill the information.
          </p>
          <input
            type="text"
            placeholder="Name"
            value={name || ""}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="input-field rounded-sm"
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber || ""}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
            className="input-field rounded-sm"
          />
          <p className="text-white text-sm">Date of Birth</p>
          <input
            type="date"
            placeholder="Date of Birth"
            value={birthDate}
            onChange={(e) => {
              setBirthDate(e.target.value);
            }}
            className="input-field rounded-sm"
          />
          <input
            type="text"
            placeholder="Occupation"
            value={occupation || ""}
            onChange={(e) => {
              setOccupation(e.target.value);
            }}
            className="input-field rounded-sm"
          />
        </div>
        <div className="flex justify-between px-2">
          <button
            className="bg-red-500 hover:bg-red-700 p-2 font-semibold rounded-md duration-300 text-white"
            onClick={() => {
              router.push("/");
            }}
          >
            Cancel
          </button>
          <button
            className="bg-green-500 hover:bg-green-600 p-2 font-semibold rounded-md duration-300 text-white"
            onClick={submitInfo}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
