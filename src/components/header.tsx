"use client";

import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import AdminPassword from "./admin-password";
import { signIn, signOut, useSession } from "next-auth/react";
import { User } from "@prisma/client";

const Header = ({ user }: { user: User }) => {
  const session = useSession();

  const [adminLoggin, setAdminLoggin] = useState(false);

  const adminClicked = () => {
    setAdminLoggin(true);
  };

  return (
    <>
      <div className="w-full h-[50px] bg-slate-600 flex justify-between items-center px-4 py-1">
        <div className="flex items-center gap-3 overflow-hidden">
          <p className="font-bold text-white text-[16px] sm:text-[10px]">
            Join Our Events
          </p>
        </div>
        <div className="flex justify-between gap-3 items-center sm:text[10px]">
          <button
            onClick={adminClicked}
            className="font-semibold text-white relative group text-[16px] sm:text-[10px]"
          >
            <span className="relative z-10">Admin Panel</span>
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-green-500 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
          </button>
          {session.data ? (
            <Link href={"/setting"} className="flex items-center gap-2">
              <Image
                src={session.data.user!.image!}
                alt="avatar"
                width={200}
                height={200}
                className="size-[35px] rounded-full overflow-hidden"
              />

              <p className="font-semibold text-white text-[16px] sm:text-[10px]">
                {user?.name}
              </p>
            </Link>
          ) : null}
          {session.data ? (
            <button
              className="bg-green-500 hover:bg-green-600 text-white relative group p-1   hover:text-gray-100 font-semibold duration-300 rounded-md px-5 py-2 text-[16px] sm:text-[10px]"
              onClick={() => {
                signOut();
              }}
            >
              Sign Out
            </button>
          ) : (
            <button
              className="bg-green-500 hover:bg-green-600 text-white relative group p-1   hover:text-gray-100 font-semibold duration-300 rounded-md px-5 py-2 text-[16px] sm:text-[10px]"
              onClick={() => {
                signIn();
              }}
            >
              Sign In
            </button>

            // relative group p-1 bg-green-500 px-5 py-2 hover:bg-green-600 text-white rounded-md text-[16px] sm:text-[10px] duration-300"
          )}
        </div>
      </div>

      {adminLoggin ? <AdminPassword setAdminLoggin={setAdminLoggin} /> : <></>}
    </>
  );
};

export default Header;
