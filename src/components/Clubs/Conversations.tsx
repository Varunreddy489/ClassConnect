import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

import Spinner from "../Spinner";
import SearchBar from "../SearchBar";
import Conversation from "./Conversation";
import { UserClubsResponse } from "@/types/Client-types";

const Conversations = ({ setSelectedClub }: { setSelectedClub: any }) => {
  const fetchUserClubs = async () => {
    try {
      const response = await axiosInstance.get("/user/club");
      // console.log(response.data.clubs);
      return response.data.clubs;
    } catch (error) {
      console.error("error in UserClubs: ", error);
    }
  };

  const { data, isLoading, error } = useQuery({
    queryFn: fetchUserClubs,
    queryKey: ["userClubs"],
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center">
        Error: {error.message}
      </div>
    );
  }
  return (
    <div className="text-black  h-screen overflow-y-auto dark:text-white">
      <SearchBar />
      {data.map((club: UserClubsResponse) => (
        <div key={club.id} onClick={() => setSelectedClub(club)}>
          <Conversation data={club} />
        </div>
      ))}
    </div>
  );
};

export default Conversations;
