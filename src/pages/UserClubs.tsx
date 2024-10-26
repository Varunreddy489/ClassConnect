import { useState } from "react";

import { Separator } from "@/components/ui/separator";
import Conversations from "@/components/Clubs/Conversations";
import MessageContainer from "@/components/Clubs/Messages/MessageContainer";

const UserClubs = () => {
  const [selectedClub, setSelectedClub] = useState(null);
  return (
    <div className="flex h-screen  ">
      <div className="w-2/5 h-full overflow-auto m-3">
        <Conversations setSelectedClub={setSelectedClub} />
      </div>
      <Separator orientation="vertical" className="h-screen  " />
      <div className="w-full h-full flex flex-col " >
        <MessageContainer clubData={selectedClub} />
      </div>
    </div>
  );
};

export default UserClubs;
