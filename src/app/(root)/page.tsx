import EventsDisplay from "@/components/events-display";
import prisma from "@/helper/db";
import { getOneUser } from "@/helper/userAction";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

export default async function Home() {
  const currentDate = new Date();
  const events = await prisma.event.findMany({
    select: {
      id: true,
      title: true,
      category: true,
      description: true,
      date: true,
      time: true,
      location: true,
      photoURL: true,
    },
    orderBy: {
      date: "desc",
    },
  });
  const session = await getServerSession(authOptions);
  const user = await getOneUser(session?.user?.email as string);
  const userEvents = await prisma.userEvents.findMany();

  const futureEvents = events.filter((event) => event.date >= currentDate);

  return (
    <div className="grid grid-cols-4 sm:grid-cols-1 items-center justify-items-center m-2 gap-2">
      {futureEvents.map((event, index) => (
        <EventsDisplay
          key={index}
          event={event}
          user={user!}
          userEvents={userEvents}
        />
      ))}
    </div>
  );
}
