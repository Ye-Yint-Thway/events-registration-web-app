"use client";

import React, { useEffect } from "react";
import { PasswordStore } from "@/store";
import AdminPassword from "./admin-password";

const PasswordProvider = ({ children }: { children: React.ReactNode }) => {
  const isPasswordCorrect = PasswordStore((state) => state.isPasswordCorrect);
  const setIsPasswordCorrect = PasswordStore(
    (state) => state.setIsPasswordCorrect
  );

  useEffect(() => {
    if (window.location.pathname === "/") {
      setIsPasswordCorrect(false);
    }
  }, []);

  if (!isPasswordCorrect) {
    return <AdminPassword />;
  } else {
    return <>{children}</>;
  }
};

export default PasswordProvider;
