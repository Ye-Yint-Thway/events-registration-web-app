import CopyRight from "@/components/copy-right";
import Header from "@/components/header";
import { getOneUser } from "@/helper/userAction";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const user = await getOneUser(session?.user?.email!);
  return (
    <div className="w-full h-screen flex flex-col justify-between">
      <Header user={user!} />
      {children}
      <CopyRight />
    </div>
  );
}
