import { useState } from "react";
import { MessageCircle } from "lucide-react";

import MenuBar from "../MenuBar";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { useAuth } from "@/context/AuthContext";
import { UserClubsResponse } from "@/types/Client-types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const MessageContainer = ({ clubData }: { clubData: UserClubsResponse }) => {
  const [showMembers, setShowMembers] = useState(false);
  if (!clubData) {
    return (
      <>
        <NoChatSelected />
      </>
    );
  }
  const toggleMembersList = () => {
    setShowMembers((prev) => !prev);
  };

  console.log(clubData);
  // ! useListenMessages();
  return (
    <div className="w-full flex flex-col">
      <div className="bg-slate-500  top-0  w-full z-10 flex justify-between px-4 py-2 ">
        <div className="flex space-x-3 items-center justify-center">
          <Avatar>
            <AvatarImage
              src={`http://localhost:5000/images/${clubData.profilePic}`}
            />
            <AvatarFallback>{clubData.name}</AvatarFallback>
          </Avatar>
          <span className="text-gray-900 font-bold">{clubData.name}</span>{" "}
        </div>
        <div className="z-20">
          <button
            onClick={toggleMembersList}
            className="cursor-pointer group relative  flex gap-1  text-white text-sm rounded-full hover:bg-opacity-70 transition font-medium shadow-md"
          >
            <MenuBar clubData={clubData} />
          </button>
        </div>
      </div>
      {/* 
      {showMembers && (
        <div className="bg-gray-700 absolute right-0 top-0 mt-10 z-10  text-white p-4">
          <h3 className="text-lg text-ce font-bold mb-2">Club Members</h3>
          <ul className="space-y-2">
            {clubData?.members?.map((member) => (
              <li
                key={member.id}
                className="flex items-center gap-2 border-b border-gray-600 pb-2"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  {member.profilePic ? (
                    <img
                      src={`http://localhost:5000/images/${member.profilePic}`}
                      alt={`${member.name}`}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/9/91/Element_Desktop_1.10.1_Linux_Yaru_%28cropped%29.png"
                      alt="Default"
                      className="object-cover w-full h-full"
                    />
                  )}
                </div>
                <div className="flex space-x-2 justify-center items-center ">
                  <p className="font-semibold">{member.name}</p>
                  <p className="text-sm text-gray-300">
                    ( {member.studentId} )
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
       
      )} */}

      <div className="flex-1  flex flex-col justify-between">
        <Messages clubData={clubData} />
        <div className="fixed bottom-0 w-full ">
          <MessageInput clubData={clubData} />
        </div>
      </div>
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuth();
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {authUser?.isStudent.name} ❄</p>
        <p>Select a chat to start messaging</p>

        <MessageCircle className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
