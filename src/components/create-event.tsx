"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const CreateEvent = () => {
  const router = useRouter();

  const [submitting, setSubmitting] = useState(false);

  const [event, setEvent] = useState({
    title: "",
    category: "",
    description: "",
    date: "",
    time: "",
    location: "",
    photoURL: "",
  });

  const capitalizeFirstLetter = (str: any) => {
    return str.trim().charAt(0).toUpperCase() + str.trim().slice(1);
  };

  const createEvent = async () => {
    if (
      event.title === "" ||
      event.category === "" ||
      event.description === "" ||
      event.date === "" ||
      event.time === "" ||
      event.location === "" ||
      event.photoURL === ""
    ) {
      window.alert("Please fill all the information.");
      return;
    }

    if (!submitting) {
      setSubmitting(true);
      try {
        await axios.post("/api/event", {
          title: capitalizeFirstLetter(event.title.trim()),
          category: capitalizeFirstLetter(event.category.trim()),
          description: capitalizeFirstLetter(event.description.trim()),
          date: event.date,
          time: event.time,
          location: capitalizeFirstLetter(event.location.trim()),
          // photoURL: capitalizeFirstLetter(event.photoURL.trim()),
          photoURL: event.photoURL,
        });
        router.push("/admin/currentevents");
        router.refresh();
      } catch (error) {
        console.log(error);
        window.alert("Failed to create event.");
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <div className=" flex flex-col w-full h-[400px] items-center justify-center">
      <div className="bg-slate-500  h-[400px] w-[500px] sm:w-[250px] flex flex-col gap-2 justify-between mt-4 p-2 rounded-md overflow-hidden">
        <div className="flex flex-col gap-3 px-2">
          <p className="font-semibold text-[18px] text-white">
            Please fill the event&apos;s information.
          </p>
          <input
            type="text"
            onChange={(e) => {
              setEvent({ ...event, title: e.target.value });
            }}
            placeholder="Event's Title"
            className="input-field rounded-sm"
          />
          <input
            type="text"
            onChange={(e) => {
              setEvent({ ...event, category: e.target.value });
            }}
            placeholder="Event's Category"
            className="input-field rounded-sm"
          />
          <input
            type="text"
            onChange={(e) => {
              setEvent({ ...event, description: e.target.value });
            }}
            placeholder="Event's Description"
            className="input-field rounded-sm"
          />
          <input
            type="date"
            onChange={(e) => {
              setEvent({
                ...event,
                date: new Date(e.target.value).toISOString().split("T")[0],
              });
            }}
            placeholder="Event's Date"
            className="input-field rounded-sm"
          />
          <input
            type="time"
            onChange={(e) => {
              setEvent({
                ...event,
                time: e.target.value,
              });
            }}
            placeholder="Event's Time"
            className="input-field rounded-sm"
          />
          <input
            type="text"
            onChange={(e) => {
              setEvent({ ...event, location: e.target.value });
            }}
            placeholder="Event's Location"
            className="input-field rounded-sm"
          />
          <input
            type="text"
            onChange={(e) => {
              setEvent({ ...event, photoURL: e.target.value });
            }}
            placeholder="Event's Photo URL"
            className="input-field rounded-sm"
          />
        </div>
        <div className="flex justify-between px-2 flex-col">
          <div className="flex gap-2 justify-between">
            <button
              className="bg-red-500 hover:bg-red-700 p-2 text-white font-semibold rounded-md duration-300"
              onClick={() => {
                router.push("/admin");
              }}
            >
              Back
            </button>
            <button
              className="bg-green-500 hover:bg-green-600 p-2 text-white font-semibold rounded-md duration-300"
              onClick={createEvent}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
