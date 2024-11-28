"use client";
import { Socket } from "socket.io-client";
import { createContext, useEffect, useState } from "react";
import { socket } from "@/socket";
export const SocketContext = createContext<{ socket: Socket, isConnected: boolean } | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [isConnected, setIsConnected] = useState(false);
  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <SocketContext.Provider value={{ isConnected, socket }}>{children}</SocketContext.Provider>
  );
};
