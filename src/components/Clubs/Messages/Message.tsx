import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { extractTime } from "@/lib/extractTime";
import { MessageTypes } from "@/types/Client-types";

const Message = ({
  message,
  currentUserId,
}: {
  message: MessageTypes;
  currentUserId: string;
}) => {
  console.log(message.sender);
  const fromMe = message.sender.id == currentUserId;

  const img = message.sender.profilePic
    ? `http://localhost:5000/images/${message.sender.profilePic}`
    : "https://upload.wikimedia.org/wikipedia/commons/9/91/Element_Desktop_1.10.1_Linux_Yaru_%28cropped%29.png";

  const user = fromMe ? "hidden" : "text-white";
  const textAlign = fromMe ? "text-right" : "text-left";
  const bubbleBg = fromMe ? "bg-blue-500" : "bg-gray-500";
  const messagePadding = fromMe ? "pl-4 pr-4" : "pr-4 pl-4";
  const chatAlignment = fromMe ? "justify-end" : "justify-start";

  return (
    <div className="mb-3">
      <div className={`flex space-x-2 ${chatAlignment}`}>
        {!fromMe && (
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full flex-shrink-0">
            <Avatar>
              <AvatarImage src={img} alt={message.sender.name} />
              <AvatarFallback>{message.sender.name}</AvatarFallback>
            </Avatar>
            {/* <img
             
              alt=
              className="rounded-full object-cover w-full h-full"
            /> */}
          </div>
        )}

        <div className={`max-w-xs md:max-w-md ${textAlign}`}>
          <p
            className={`text-sm text-left md:text-base text-white py-2  rounded-lg  ${bubbleBg} ${messagePadding}`}
          >
            {message.body}
          </p>
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
