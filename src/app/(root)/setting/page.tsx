import RegisterForm from "@/components/register-form";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../../api/auth/[...nextauth]/authOptions";
import { getOneUser } from "@/helper/userAction";
import prisma from "@/helper/db";

const SettingPage = async () => {
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findFirst({
    where: { email: session?.user?.email },
  });

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center ">
      <RegisterForm user={user!} />
    </div>
  );
};

export default SettingPage;
