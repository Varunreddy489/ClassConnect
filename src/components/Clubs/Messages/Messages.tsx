import Message from "./Message";
import MessageSkeleton from "./MessageSkeleton";
import { MessageTypes } from "@/types/Client-types";
import { useMessageStore } from "@/stores/useMessageStore";
import { Button } from "@/components/ui/button";
import { MoveDown } from "lucide-react";
import { useEffect, useRef } from "react";

const Messages = () => {
  const { isLoading } = useMessageStore();
  const { messages } = useMessageStore();
  console.log(messages);

  const user = localStorage.getItem("user");

  const userId = user ? JSON.parse(user).id : null;

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div  className="w-full h-fit bg-cover bg-no-repeat"
    style={{ backgroundImage: "url('/chat_background.jpg')" }}>
      <div
        ref={messagesContainerRef}
        className="relative px-4  overflow-y-auto h-[90vh]"
      >
        {isLoading &&
          [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

        {messages.map((message: MessageTypes) => (
          <Message
            key={message.id}
            message={message}
            currentUserId={userId || ""}
          />
        ))}

        {!isLoading && messages.length === 0 && (
          <p className="flex justify-center items-center h-full text-white">
            Send a message to start the conversation
          </p>
        )}
      </div>
      <div className="fixed bottom-16 right-4 z-50">
        <Button className="bg-red-950" onClick={scrollToBottom}>
          <MoveDown />
        </Button>
      </div>
    </div>
  );
};

export default Messages;
