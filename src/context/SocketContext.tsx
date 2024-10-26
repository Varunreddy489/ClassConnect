import {createContext, useContext, useEffect, useState} from "react";
import {io, Socket} from "socket.io-client";

const SocketContext = createContext<{ socket: Socket | null }>({
    socket: null,
});

export const useSocketContext = () => useContext(SocketContext);

export const SocketContextProvider = ({children}: { children: React.ReactNode }) => {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const socketConnection = io("http://localhost:5000");

        setSocket(socketConnection);

        return () => {
            socketConnection.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={{socket}}>
            {children}
        </SocketContext.Provider>
    );
};
