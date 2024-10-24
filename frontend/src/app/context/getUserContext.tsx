"use client";
import React, { createContext, useEffect, useState } from "react";
import { getUser } from "../actions/getUser-action";
import { User } from "@clerk/nextjs/server";

export const UserContext = createContext<User | null>(null);

interface UserContextProviderProps {
  children: React.ReactNode;
}

export const UserContextProvider: React.FC<UserContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const userData = await getUser();
      setUser(userData);
    }
    fetchUser();
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
