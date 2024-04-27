import AdminHeaderTwo from "@/components/admin-header-two";
import CopyRight from "@/components/copy-right";
import EventsHandler from "@/components/events-handler";
import prisma from "@/helper/db";
import React from "react";
export const dynamic = "force-dynamic";

const currentEvents = async () => {
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
  });
  const currentDate = new Date();
  const futureEvents = events.filter((event) => event.date >= currentDate);
  return (
    <div className=" w-full h-screen flex flex-col items-start justify-between ">
      <AdminHeaderTwo />
      <div className="flex w-full justify-center">
        <p className="font-bold text-slate-600 text-[16px] sm:text-[10px]">
          Current Events
        </p>
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-1 p-5 gap-8 items-center justify-items-center">
        {futureEvents.map((event, index) => (
          <EventsHandler key={index} event={event} />
        ))}
      </div>
      <CopyRight />
    </div>
  );
};

export default currentEvents;
