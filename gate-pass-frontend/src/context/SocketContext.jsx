import { createContext, useContext, useEffect } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "./AuthContext";

// eslint-disable-next-line react-refresh/only-export-components
export const SocketContext = createContext();

export function SocketProvider({ children }) {
  const { user } = useContext(AuthContext);
  const socket = io(
    import.meta.env.VITE_API_URL || "https://your-backend.vercel.app",
    {
      auth: { token: localStorage.getItem("token") },
    }
  );

  useEffect(() => {
    if (user) {
      socket.emit("join", user.role);
    }
    return () => {
      socket.disconnect();
    };
  }, [socket, user]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}
