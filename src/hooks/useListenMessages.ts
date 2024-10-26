import { useEffect } from "react";
import { useSocketContext } from "@/context/SocketContext";
import useConversation from "@/zustand/useConversation";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    if (!socket) return;

    socket.on("receiveMessage", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // socket.on("receiveMessage", (newMessage) => {
    //   setMessages([...messages, newMessage]);
    // });

    return () => {
      socket.off("newMessage");
    };
  }, [socket, messages, setMessages]);
};

export default useListenMessages;
