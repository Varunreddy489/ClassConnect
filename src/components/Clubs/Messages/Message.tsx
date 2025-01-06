import { extractTime } from "@/lib/extractTime";
import { MessageTypes } from "@/types/Client-types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCheck } from "lucide-react";

const Message = ({
  message,
  currentUserId,
}: {
  message: MessageTypes;
  currentUserId: string;
}) => {
  const fromMe = message.sender.id == currentUserId;
  const img = message.sender.profilePic
    ? `http://localhost:5000/images/${message.sender.profilePic}`
    : "https://upload.wikimedia.org/wikipedia/commons/9/91/Element_Desktop_1.10.1_Linux_Yaru_%28cropped%29.png";
  const isRead = true;
  const user = fromMe ? "hidden" : "text-white";
  const checkColor = isRead ? "text-white" : "text-blue-400";
  const textAlign = fromMe ? " text-left" : "text-right";
  const bubbleBg = fromMe ? "bg-green-500" : "bg-gray-500";
  const messagePadding = fromMe ? "pl-4 pr-4" : "pr-4 pl-4";
  const chatAlignment = fromMe ? "justify-end" : "justify-start";
  const isImage = message.fileType && message.fileType.startsWith("image");


  console.log(message);

  return (
    <div className="mb-3">
      <div className={`flex space-x-2 ${chatAlignment}`}>
        {!fromMe && (
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full flex-shrink-0">
            <Avatar>
              <AvatarImage src={img} alt={message.sender.name} />
              <AvatarFallback>{message.sender.name}</AvatarFallback>
            </Avatar>
          </div>
        )}
        <div>
          <div
            className={`max-w-xs flex place-items-end md:max-w-md ${textAlign} ${bubbleBg} rounded-md`}
          >
            {message.body !== "" && (
              <p
                className={`text-sm text-left md:text-base text-white py-2  rounded-lg  ${messagePadding}`}
              >
                {message.body}
              </p>
            )}
            <CheckCheck className="ml-2 text-blue-900" />
          </div>

          {message.fileType && (
            <div className="mt-2">
              {isImage ? (
                <div className="flex">
                  <CheckCheck className={`absolute bottom-2 right-2 text-blue-900 ${checkColor}`} />
                  <img
                    src={`http://localhost:5000/files/${message.fileUrl}`}
                    alt="Image"
                    className="  rounded-lg cursor-pointer max-w-[400px] h-auto"
                    onClick={() =>
                      window.open(
                        `http://localhost:5000/files/${message.fileUrl}`,
                        "_blank"
                      )
                    }
                  />
                </div>
              ) : (
                <div>
                  <iframe
                    src={`http://localhost:5000/files/${message.fileUrl}`}
                    className="w-full h-96 rounded-lg border"
                    title="PDF Preview"
                  />
                  <a
                    href={`http://localhost:5000/files/${message.fileUrl}`}
                    download
                    target="_blank"
                    className="text-blue-500 underline mt-2 block"
                  >
                    View Doc
                  </a>
                </div>
              )}
            </div>
          )}

          <div className="mt-1 text-xs text-gray-400 flex items-center">
            <span className={`${user}`}>{message.sender.name}</span>
            <span className={`${user} mx-2 `}>•</span>
            <span className="flex justify-end">
              {extractTime(message.createdAt)}
            </span>
          </div>
        </div>

        {fromMe && (
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full flex-shrink-0">
            <Avatar>
              <AvatarImage src={img} alt="@shadcn" />
              <AvatarFallback>{message.sender.name}</AvatarFallback>
            </Avatar>
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
