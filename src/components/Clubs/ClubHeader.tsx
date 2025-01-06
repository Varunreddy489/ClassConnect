import { useEffect, useState } from "react";

import MenuBar from "./MenuBar";
import { useMessageStore } from "@/stores/useMessageStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ClubHeader = () => {
  const [, setShowMembers] = useState(false);
  const { selectedClub } = useMessageStore();
  const { clubData, fetchClubDetails } = useMessageStore();

  useEffect(() => {

    selectedClub && fetchClubDetails(selectedClub);
  }, [selectedClub, fetchClubDetails]);
  const toggleMembersList = () => {
    setShowMembers((prev) => !prev);
  };

  return (
    <div className="bg-slate-500  top-0  w-full z-10 flex justify-between px-4 py-2 ">
      <div className="flex space-x-3 items-center justify-center">
        <Avatar>
          <AvatarImage
            src={`http://localhost:5000/images/${clubData?.profilePic}`}
          />
          <AvatarFallback>{clubData?.name}</AvatarFallback>
        </Avatar>
        <span className="text-gray-900 font-bold">{clubData?.name}</span>{" "}
      </div>
      <div className="z-20">
        {clubData && (
          <button
            onClick={toggleMembersList}
            className="cursor-pointer group relative  flex gap-1  text-white text-sm rounded-full hover:bg-opacity-70 transition font-medium shadow-md"
          >
            <MenuBar clubData={clubData} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ClubHeader;
