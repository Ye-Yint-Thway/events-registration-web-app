"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { User, UserEvents } from "@prisma/client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const EventsDisplay = ({
  event,
  user,
  userEvents,
}: {
  event: {
    id: string;
    photoURL: string;
    title: string;
    category: string;
    description: string;
    location: string;
    date: Date;
    time: String;
  };
  user: User;
  userEvents: UserEvents[];
}) => {
  const session = useSession();

  const router = useRouter();

  const fetchUserEvent = async () => {
    const userEvent = await axios.get("/api/registerevent/");
    return userEvent;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["userEvents"],
    queryFn: () => fetchUserEvent(),
  });

  const filterUserEvents = data?.data.filter((item: UserEvents) => {
    return item.eventId === event.id && item.userId === user.id;
  });

  const eventRegistration = async () => {
    if (!session.data) {
      window.alert("Please sign in to continue.");
    }
    if (
      user === null ||
      user === undefined ||
      user.birthDate === null ||
      user.occupation === null ||
      user.phoneNumber === null
    ) {
      window.alert("Click your profile icon to fill some more informations.");
    } else {
      try {
        await axios.post("/api/registerevent/", {
          userId: user.id,
          eventId: event.id,
        });
        router.refresh();
      } catch (error: any) {
        window.alert(error.response.data.error);
      }
    }
  };

  const unregisterEvent = async () => {
    try {
      await axios.delete(`/api/registerevent/`, {
        data: { userId: user.id, eventId: event.id },
      });
      router.refresh();
    } catch (error) {}
  };

  const isImageURL = (url: string) => {
    const imageExtensions = /.(jpg|jpeg|png|gif|webp)$/i;
    return imageExtensions.test(url);
  };

  const status = userEvents.filter(
    (item) => item.userId === user.id && item.eventId === event.id
  );

  return (
    <>
      <div className="flex flex-col items-start justify-between h-full w-full sm:w-full p-3 bg-slate-600 gap-3 sm:gap-1 rounded-lg overflow-hidden">
        <div className="space-y-3 w-full">
          {isImageURL(event.photoURL) ? (
            <img
              src={event.photoURL}
              alt="photo"
              className="w-full h-[200px] object-cover"
            />
          ) : (
            <div className="w-full h-[200px] flex items-center justify-center object-cover bg-black">
              <p className="text-white">No Image</p>
            </div>
          )}

          <div className="flex flex-col items-start justify-start w-full min-w-max overflow-x-auto">
            <div className="flex">
              <p className="font-bold text-white text-[18px]  whitespace-nowrap">
                Event Name
              </p>
              <p className="font-semibold text-white text-[18px] whitespace-nowrap">
                {" "}
                : {event.title}
              </p>
            </div>
            <div className="flex">
              <p className="font-semibold text-white text-[14px]  whitespace-nowrap">
                Description
              </p>

              <p className="text-white text-[14px] break-words text-justify">
                {" "}
                : {event.description}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center overflow-x-auto">
            <div className="flex items-start justify-between w-full min-w-max">
              <div className="flex flex-col items-center justify-center ">
                <p className="font-semibold text-white text-[12px] whitespace-nowrap">
                  Date
                </p>
                <p className=" text-white text-[12px] whitespace-nowrap">
                  {event.date.toLocaleDateString()}
                </p>
              </div>
              <div className="flex flex-col items-center justify-center ">
                <p className="font-semibold text-white text-[12px] max-w-[150px] ml-1 whitespace-nowrap">
                  Time
                </p>
                <p className=" text-white text-[12px] max-w-[150px] ml-1 whitespace-nowrap">
                  {event.time}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center ">
              <p className="font-semibold text-white text-[12px] max-w-[150px] ml-1 whitespace-nowrap">
                Location
              </p>
              <p className=" text-white text-[12px] max-w-[150px] ml-1 whitespace-nowrap">
                {event.location}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4">
          {filterUserEvents?.length > 0 ? (
            <div className="flex items-start justify-start gap-2">
              {status[0].status === "approved" ? (
                <></>
              ) : status[0].status === "rejected" ? (
                <button
                  className="bg-green-500 hover:bg-green-600 text-white p-2 font-semibold rounded-md duration-300 text-[16px] sm:text-[12px]"
                  onClick={unregisterEvent}
                >
                  Register Again
                </button>
              ) : (
                <button
                  className="bg-red-500 hover:bg-red-700 text-white p-2 font-semibold rounded-md duration-300 text-[16px] sm:text-[12px]"
                  onClick={unregisterEvent}
                >
                  Cancel
                </button>
              )}
              <div className="flex flex-col justify-center items-center gap-1">
                <p
                  className="text-white text-[14px] 
                sm:text-[10px]"
                >
                  Status
                </p>
                <p
                  className="font-semibold text-white text-[16px] 
                sm:text-[12px]"
                >
                  {status[0].status}
                </p>
              </div>
            </div>
          ) : (
            <button
              className="bg-green-500 hover:bg-green-600 p-2 font-semibold text-white rounded-md duration-300 text-[16px] 
              sm:text-[12px]"
              onClick={eventRegistration}
            >
              Register
            </button>
          )}
          <div></div>
        </div>
      </div>
    </>
  );
};

export default EventsDisplay;
