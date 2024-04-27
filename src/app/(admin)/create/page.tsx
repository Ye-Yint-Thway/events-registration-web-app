import CopyRight from "@/components/copy-right";
import CreateEvent from "@/components/create-event";
import CreateHeader from "@/components/create-header";
import React from "react";
export const dynamic = "force-dynamic";

const Create = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-between">
      <CreateHeader />
      <div className="flex flex-col">
        <CreateEvent />
      </div>
      <CopyRight />
    </div>
  );
};

export default Create;
