import { Check, MailCheck, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { useNotificationStore } from "@/stores/useNotificationStore";

const NotificationCard = ({ data }: { data: any }) => {
  console.log(data.connectionId);
  const clubId = data.clubId;
  const requestId = data.joinRequestId;

  const { isLoading, error, markAsRead, deleteNotification } =
    useNotificationStore();

  isLoading && <span>Loading...</span>;

  error && <span>Error: {error}</span>;

  const { mutate: acceptRequest } = useMutation({
    mutationFn: async (clubId: string) => {
      const response = await axiosInstance.post(`/club/accept/${clubId}`, {
        requestId,
      });
      console.log(response.data);
      return response.data;
    },

    onError: (error: any) => {
      console.log(error.response.data);
    },
  });

  const { mutate: rejectRequest } = useMutation({
    mutationFn: async (clubId: string) => {
      const response = await axiosInstance.post(`/club/accept/${clubId}`, {
        requestId,
      });
      console.log(response.data);
      return response.data;
    },

    onError: (error: any) => {
      console.log(error.response.data);
    },
  });

  const { mutate: acceptFriendRequest } = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.put(
        `/connection/request/accept/${data.connectionId}`,
        {}
      );
      console.log(response.data);
      return response.data;
    },

    onError: (error: any) => {
      console.log(error.response.data);
    },
  });

  const { mutate: rejectFriendRequest } = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.put(
        `/connection/request/accept/${data.connectionId}`,
        {}
      );

      console.log(response.data);
      return response.data;
    },

    onError: (error: any) => {
      console.log(error.response.data);
    },
  });

  return (
    <div
      onClick={() => markAsRead(data.id)}
      className={`flex justify-between items-center p-3  ${
        data.isRead
          ? "dark:bg-gray-600 bg-400 "
          : "dark:bg-gray-800 bg-slate-500 "
      } shadow rounded-lg `}
    >
      <div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Avatar>
                <AvatarImage
                  src={`http://localhost:5000/images/${data.student?.profilePic}`}
                  alt={data.student?.name || "User Avatar"}
                />
                <AvatarFallback>
                  {data.student?.name ? data.student.name[0] : "?"}
                </AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent className="text-md dark:bg-black dark:text-white bg-slate-300">
              <p className="text-md dark:bg-black bg-slate-300">
                {data.student?.name} ({data.student?.studentId}){" "}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div>
        <div className="ms-3 text-sm  font-normal flex-1">{data.content}</div>
        {data.type === "JOIN_REQUEST" && (
          <div className="flex space-x-3 items-center justify-center ">
            <Button onClick={() => acceptRequest(clubId)}>
              <Check />
              Accept
            </Button>
            <Button
              onClick={() => rejectRequest(clubId)}
              variant={"destructive"}
            >
              <X />
              Reject
            </Button>
          </div>
        )}

        {data.type === "FRIEND_REQUEST" && (
          <div className="flex space-x-3 items-center justify-center ">
            <Button onClick={() => acceptFriendRequest(data.connectionId)}>
              <Check />
              Accept
            </Button>
            <Button
              onClick={() => rejectFriendRequest(data.connectionId)}
              variant={"destructive"}
            >
              <X />
              Reject
            </Button>
          </div>
        )}
      </div>
      <div className="flex space-x-4">
        {data.isRead ? null : (
          <Button
            onClick={() => markAsRead(data.id)}
            type="button"
            className="ms-auto -mx-1.5 -my-1.5 text-gray-400 hover:text-gray-900 rounded-lg p-1.5 focus:ring-2 focus:ring-gray-300 hover:bg-gray-100 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            aria-label="Close"
          >
            <MailCheck />
          </Button>
        )}
        <Button
          onClick={() => deleteNotification(data.id)}
          type="button"
          variant={"destructive"}
          className="ms-auto -mx-1.5 -my-1.5 text-gray-400 hover:text-gray-900 rounded-lg p-1.5 focus:ring-2 focus:ring-gray-300 hover:bg-gray-100 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
          aria-label="Close"
        >
          <X />
        </Button>
      </div>
    </div>
  );
};

export default NotificationCard;
