import {useEffect} from "react";
import {MessageCircle} from "lucide-react";

import Messages from "./Messages";
import ClubHeader from "../ClubHeader";
import MessageInput from "./MessageInput";
import Spinner from "@/components/Spinner";
import {useAuth} from "@/context/AuthContext";
import {ScrollArea} from "@/components/ui/scroll-area";
import {useMessageStore} from "@/stores/useMessageStore";

const MessageContainer = () => {
  const {selectedClub, isLoading, error, fetchClubById} = useMessageStore();

  const {authUser} = useAuth();

  useEffect(() => {
    if (selectedClub) {
      fetchClubById(selectedClub);
    }
  }, [selectedClub, fetchClubById]);

  if (!selectedClub) {
    return <NoChatSelected authUser={authUser}/>;
  }

  isLoading && <Spinner/>;

  error && (
      <div className="flex items-center justify-center">Error: {error}</div>
  );

  return (
      <div className="flex flex-col relative h-full">
        <ClubHeader/>
        <ScrollArea>
          <Messages/>
        </ScrollArea>
        <MessageInput selectedClub={selectedClub}/>
      </div>
  );
};

export default MessageContainer;

const NoChatSelected = ({authUser}: { authUser: any }) => (
    <div className="flex items-center justify-center w-full h-screen">
      <div
          className="px-4 text-center sm:text-lg md:text-xl dark:text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {authUser?.isStudent?.name} ❄</p>
        <p>Select a chat to start messaging</p>
        <MessageCircle className="text-3xl md:text-6xl text-center"/>
      </div>
    </div>
);
