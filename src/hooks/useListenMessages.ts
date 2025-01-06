// import { useEffect } from "react";
// import useConversation from "@/zustand/useConversation";
// import { useSocket } from "@/context/SocketContext";
// import { MessageTypes } from "@/types/Client-types";

// const useListenMessages = () => {
//   const socket = useSocket();
//   const { setMessages } = useConversation();

//   useEffect(() => {
//     if (!socket) return;

//     const handleNewMessage = (newMessage: MessageTypes) => {
//       setMessages((prevMessages) => [...prevMessages, newMessage]);
//     };

//     socket.on("receiveMessage", handleNewMessage);

//     return () => {
//       socket.off("receiveMessage", handleNewMessage);
//     };
//   }, [socket, setMessages]);
// };

export default useListenMessages;
