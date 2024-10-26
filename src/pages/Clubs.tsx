import { useQuery } from "@tanstack/react-query";

import { ClubTypes } from "@/types/Client-types";
import Spinner from "@/components/Spinner";
import { axiosInstance } from "@/lib/axios";
import ClubCard from "@/components/Clubs/ClubCard";
import CreateClub from "@/components/Clubs/CreateClub";

const Clubs = () => {
  const fetchClubs = async () => {
    try {
      const response = await axiosInstance.get("/club");
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("error in Clubs:", error);
    }
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["clubs"],
    queryFn: fetchClubs,
  });

  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <div>Error loading clubs: {error.message}</div>;
  }
  return (
    <div>
      <div className=" mt-10   ">
        <CreateClub />
      </div>
      <div className="grid gap-6 p-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 sm:grid-cols-1">
        {data?.map((club: ClubTypes) => (
          <div
            key={club.id}
            className="p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg"
          >
            <ClubCard club={club} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Clubs;
