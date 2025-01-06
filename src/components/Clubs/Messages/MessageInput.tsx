// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { ChangeEvent, useEffect, useRef } from "react";
// import { Paperclip, Send } from "lucide-react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useMutation, useQueryClient } from "@tanstack/react-query";

// import { axiosInstance } from "@/lib/axios";
// import { useToast } from "@/hooks/use-toast";
// import { Button } from "@/components/ui/button";
// import { getSocket } from "@/socket/ClientSocket";
// import { UserClubsResponse } from "@/types/Client-types";
// const MessageInput = ({ clubData }: { clubData: UserClubsResponse }) => {
//   const { toast } = useToast();
//   const socket = getSocket();

//   const queryClient = useQueryClient();

//   const fileInputRef = useRef<HTMLInputElement | null>(null);

//   const schema = z.object({
//     content: z.string().min(1, { message: "Message cannot be empty!" }),
//   });

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm<{ content: string }>({
//     resolver: zodResolver(schema),
//   });

//   const { mutate: sendMessage } = useMutation({
//     mutationFn: async (content: string) => {
//       const response = await axiosInstance.post(
//         `/club/message/${clubData.id}`,
//         {
//           content,
//         }
//       );

//       return response.data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["messages", clubData.id] });
//       reset();
//     },
//     onError: (error: any) => {
//       toast({
//         variant: "destructive",
//         title: "Uh oh! Something went wrong.",
//         description:
//           error?.response?.data.error ||
//           "There was a problem with your request.",
//       });
//       console.error("Send message error:", error);
//     },
//   });

//   const { mutate: uploadFile } = useMutation({
//     mutationFn: async (file: File) => {
//       const formData = new FormData();
//       formData.append("file", file);

//       const response = await axiosInstance.post(
//         `club/file/${clubData.id}`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       return response.data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["messages", clubData.id] });
//       reset();
//     },

//     onError: (error: any) => {
//       toast({
//         variant: "destructive",
//         title: "Uh oh! File upload failed.",
//         description:
//           error?.response?.data.error ||
//           "There was a problem with the file upload.",
//       });
//     },
//   });

//   const onSubmit = (data: { content: string }) => {
//     sendMessage(data.content);
//     if (socket) {
//       socket.emit("new_message", {
//         clubId: clubData.id,
//         message: data.content,
//       });
//       console.log("socket-send-activeted");
//     }
//   };

//   const handleFileButtonClick = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.click();
//     }
//   };

//   const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       uploadFile(file);
//     }
//   };

//   useEffect(() => {
//     if (socket) {
//       socket.on("new_message", (newMessage) => {
//         queryClient.setQueryData(
//           ["messages", clubData.id],
//           (oldMessages: any) => [...(oldMessages || []), newMessage]
//         );
//       });
//     }

//     console.log("reload");
//     return () => {
//       if (socket) {
//         socket.off("new_message");
//       }
//     };
//   }, [socket, queryClient, clubData.id]);

//   return (
//     <form
//       className="flex justify-end align-bottom space-x-4  bg-gray-700 items-center"
//       onSubmit={handleSubmit(onSubmit)}
//     >
//       <Button
//         variant="ghost"
//         size="icon"
//         type="button"
//         className="ml-2"
//         onClick={handleFileButtonClick}
//       >
//         <Paperclip />
//       </Button>
//       <input
//         type="file"
//         ref={fileInputRef}
//         className="hidden"
//         onChange={handleFileChange}
//         accept="*"
//       />
//       <div className="w-full relative">
//         <input
//           type="text"
//           {...register("content")}
//           className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
//           placeholder="Send a message"
//         />

//         {errors.content && (
//           <p className="text-red-500 text-xs">{errors.content.message}</p>
//         )}
//         <button
//           type="submit"
//           className="absolute inset-y-0 end-0 flex items-center pe-3"
//         >
//           <Send className="w-6 h-6 text-white" />
//         </button>
//       </div>
//     </form>
//   );
// };

// export default MessageInput;

import { z } from "zod";
import { useForm } from "react-hook-form";
import { ChangeEvent, useRef } from "react";
import { Paperclip, Send } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { useMessageStore } from "@/stores/useMessageStore";

const MessageInput = ({ selectedClub }: { selectedClub: string }) => {
  const { sendMessage, uploadFile } = useMessageStore();

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

  const onSubmit = ({ content }: { content: string }) => {
    sendMessage(selectedClub, content);
    reset();
  };

  const handleFileButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadFile(selectedClub, file);
    }
  };

  return (
    <form
      className="flex absolute w-full bottom-0 justify-end align-bottom space-x-4 bg-gray-700 items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Button
        variant="ghost"
        size="icon"
        type="button"
        className="ml-2"
        onClick={handleFileButtonClick}
        aria-label="Attach a file"
      >
        <Paperclip />
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
        accept="*"
      />
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
