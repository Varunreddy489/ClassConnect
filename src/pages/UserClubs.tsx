import { Separator } from "@/components/ui/separator";
import Conversations from "@/components/Clubs/Conversations";
import MessageContainer from "@/components/Clubs/Messages/MessageContainer";

const UserClubs = () => {
  return (
    <div className="flex h-screen  ">
      <div className="w-2/5 h-full overflow-auto m-3">
        <Conversations />
      </div>
      <Separator orientation="vertical" className="h-screen  " />
      <div className="w-full h-full flex flex-col ">
        <MessageContainer />
      </div>
    </div>
  );
};

export default UserClubs;
