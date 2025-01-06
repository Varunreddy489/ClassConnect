import { useEffect } from "react";

import Spinner from "../Spinner";
import SearchBar from "../SearchBar";
import Conversation from "./Conversation";
import { useMessageStore } from "@/stores/useMessageStore";

const Conversations = () => {
  const { userClubs, isLoading, error, fetchUserClubs } = useMessageStore();

  useEffect(() => {
    fetchUserClubs();
  }, [fetchUserClubs]);

  if (isLoading) return <Spinner />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="text-black h-screen overflow-y-auto dark:text-white">
      <SearchBar />
      {userClubs ? (
        <>
          {userClubs.clubs?.length > 0 &&
            userClubs.clubs.map((club) => (
              <div key={club.id}>
                <Conversation data={club} />
              </div>
            ))}
        </>
      ) : (
        <div>No data found.</div>
      )}
    </div>
  );
};

export default Conversations;
