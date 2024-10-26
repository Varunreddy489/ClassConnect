import Spinner from "@/components/Spinner";
import { axiosInstance } from "@/lib/axios";
import { MessageTypes, UserClubsResponse } from "@/types/Client-types";
import { useQuery } from "@tanstack/react-query";
import MessageSkeleton from "./MessageSkeleton";
import Message from "./Message";

const Messages = ({ clubData }: { clubData: UserClubsResponse }) => {
  const currentUserId = localStorage.getItem("num");

  const fetchClubById = async () => {
    try {
      const response = await axiosInstance.get(`/club/message/${clubData.id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("error in Conversation:", error);
      throw new Error("Failed to fetch club details");
    }
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["club", clubData.id],
    queryFn: fetchClubById,
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (error instanceof Error) {
    return (
      <div className="flex items-center justify-center">
        Error: {error.message}
      </div>
    );
  }
  return (
    <div className="px-4 mt-1 overflow-auto" id="back">
      {isLoading &&
        [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

      {data.messages.map((message: MessageTypes) => (
        <Message
          key={message.id}
          message={message}
          currentUserId={currentUserId || ""}
        />
      ))}

      {!isLoading && data.messages.length === 0 && (
        <p className="flex justify-center items-center h-full text-white">
          Send a message to start the conversation
        </p>
      )}
    </div>
  );
};

export default Messages;
