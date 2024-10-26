import Spinner from "./Spinner";
import { axiosInstance } from "@/lib/axios";

import { useQuery } from "@tanstack/react-query";

const ClubDetails = ({ clubId }: { clubId: string }) => {
  const fetchClubDetails = async () => {
    try {
      const response = await axiosInstance.get(`/club/details/${clubId}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw new Error("Error fetching club details.");
      console.error("error in ClubDetails:  ", error);
    }
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["clubDetails", clubId],
    queryFn: fetchClubDetails,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        Error loading club details:{" "}
        {error instanceof Error ? error.message : "An error occurred"}
      </div>
    );
  }

  return (
    <div className="p-2 bg-gray-100 dark:bg-gray-900 text-white rounded-md shadow-lg">
      <h3 className="font-semibold text-lg">{data?.name}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {data?.description}
      </p>

      <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
        <strong>Members ( {data.members.length} )</strong>
        <ul className="list-disc pl-5 mt-2x flex-col  space-y-4 ">
          {data?.members.map(
            (member: { name: string; profilePic: string }, index: number) => (
              <li key={index} className="flex items-center gap-2">
                <img
                  src={
                    member.profilePic
                      ? `http://localhost:5000/images/${member.profilePic}`
                      : "https://thumbs.dreamstime.com/b/student-icon-vector-graduation-mortar-board-school-college-university-glyph-pictogram-male-person-profile-avatar-108392101.jpg"
                  }
                  alt={`${member.name}'s profile`}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span>{member.name}</span>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default ClubDetails;
