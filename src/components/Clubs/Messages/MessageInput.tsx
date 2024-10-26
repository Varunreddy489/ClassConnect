import { z } from "zod";
import { useForm } from "react-hook-form";
import { Paperclip, Send } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axiosInstance } from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";
import { UserClubsResponse } from "@/types/Client-types";

const MessageInput = ({ clubData }: { clubData: UserClubsResponse }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const schema = z.object({
    content: z.string().min(1, { message: "Message cannot be empty!" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ content: string }>({
    resolver: zodResolver(schema),
  });

  const { mutate: sendMessage } = useMutation({
    mutationFn: async (content: string) => {
      const response = await axiosInstance.post(
        `/club/message/${clubData.id}`,
        {
          content,
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages", clubData.id] });
      reset();
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          error?.response?.data.error ||
          "There was a problem with your request.",
      });
      console.error("Send message error:", error);
    },
  });

  const onSubmit = (data: { content: string }) => {
    sendMessage(data.content);
  };

  return (
    <form
      className="flex justify-end align-bottom space-x-4  bg-gray-700 items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="ml-2">
        <Paperclip />
      </div>
      <div className="w-full relative">
        <input
          type="text"
          {...register("content")}
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message"
        />

        {errors.content && (
          <p className="text-red-500 text-xs">{errors.content.message}</p>
        )}
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
          <Send className="w-6 h-6 text-white" />
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
