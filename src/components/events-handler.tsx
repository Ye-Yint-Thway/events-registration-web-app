"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";

const EventsHandler = ({
  event,
}: {
  event: {
    id: string;
    time: string;
    photoURL: string;
    title: string;
    category: string;
    description: string;
    location: string;
    date: Date;
  };
}) => {
  const [ready, setReady] = useState(false);

  const router = useRouter();

  const eventRegistration = () => {
    setReady(!ready);
  };

  const isImageURL = (url: string) => {
    const imageExtensions = /.(jpg|jpeg|png|gif)$/i;
    return imageExtensions.test(url);
  };

  const deleteEvent = async () => {
    try {
      await axios.delete(`/api/event/${event.id}`);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-start justify-between h-full w-full sm:w-full  p-3 bg-slate-600 gap-3 sm:gap-1 rounded-lg overflow-hidden">
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

          <div className="flex flex-col overflow-x-auto  items-start justify-start w-full">
            <p className="font-semibold text-white text-[18px] whitespace-nowrap">
              {event.title}
            </p>
            <p className="text-white text-[14px] break-words text-justify">
              {event.description}
            </p>
          </div>

          <div className="flex items-start justify-between w-full min-w-max overflow-x-auto">
            <div className="flex flex-col ">
              <p className="font-semibold text-white text-[12px]">
                {event.date.toLocaleDateString()}
              </p>
              <p className="font-semibold text-white text-[12px] max-w-[150px]">
                {event.time}
              </p>
            </div>
            <p className="font-semibold text-white text-[12px] max-w-[150px] ml-1">
              {event.location}
            </p>
          </div>
        </div>
        <div className="flex items-start justify-start gap-4">
          {ready ? (
            <div className="flex items-center justify-center gap-2">
              <button
                className="bg-green-500 hover:bg-green-600 text-white p-2 sm:p-1 font-semibold rounded-md duration-300
                text-[16px]  sm:text-[10px]"
                onClick={() => {
                  setReady(false);
                }}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 p-2 text-white sm:p-1 font-semibold rounded-md duration-300 text-[16px] 
                sm:text-[10px]"
                onClick={deleteEvent}
              >
                Sure
              </button>
            </div>
          ) : (
            <button
              className="bg-red-500  hover:bg-red-700 p-2 text-white sm:p-1 font-semibold rounded-md duration-300 text-[16px] 
              sm:text-[10px]"
              onClick={() => {
                setReady(true);
              }}
            >
              Cancel Event
            </button>
          )}
          <div></div>
        </div>
      </div>
    </>
  );
};

export default EventsHandler;
