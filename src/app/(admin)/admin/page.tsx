import AdminHeader from "@/components/admin-header";
import CopyRight from "@/components/copy-right";
import RegisteredList from "@/components/registered-list";
import prisma from "@/helper/db";

import React from "react";
export const dynamic = "force-dynamic";

const Admin = async () => {
  const users = await prisma.user.findMany({
    include: { events: { include: { event: true } } },
  });

  return (
    <div className=" w-full h-screen items-start justify-between flex flex-col ">
      <AdminHeader />
      <div className="w-full flex flex-col items-center justify-center gap-4 my-4 p-2">
        <p className="font-bold text-slate-600 text-[16px] sm:text-[10px]">
          Registered Users
        </p>
        {users.map((user: any, index: any) => (
          <RegisteredList user={user!} key={index} />
        ))}
      </div>
      <CopyRight />
    </div>
  );
};

export default Admin;
