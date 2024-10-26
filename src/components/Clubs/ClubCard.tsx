import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { useState } from "react";
import { Info } from "lucide-react";

import { Button } from "../ui/button";
import ClubDetails from "../ClubDetails";
import { ClubTypes } from "@/types/Client-types";
import { axiosInstance } from "@/lib/axios";

const ClubCard = ({ club }: { club: ClubTypes }) => {
  const [joinRequestMessage, setJoinRequestMessage] = useState<string | null>(
    null
  );

  const joinClub = async () => {
    try {
      const response = await axiosInstance.post(`/club/join/${club.id}`);
      console.log(response.data);
      setJoinRequestMessage(response.data.message || "Join request sent");
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        setJoinRequestMessage("You have already requested to join this club.");
      } else {
        console.error("error in joinClub: ", error);
        setJoinRequestMessage("An error occurred while joining the club.");
      }
    }
  };

  return (
    <div className="max-w-sm max-h-96 min-h-80 w-64  border rounded-lg shadow">
      <>
        <img
          className="rounded-t-lg aspect-[5/3]"
          src={`http://localhost:5000/images/${club.profilePic}`}
          alt={club.name}
        />
      </>

      <div className="p-5">
        <div className="flex justify-between">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-black dark:text-white">
              {club.name}
            </h5>
          </a>
          <Popover>
            <PopoverTrigger asChild>
              <button className="hover:text-blue-500">
                <Info />
              </button>
            </PopoverTrigger>
            <PopoverContent>
              <ClubDetails clubId={club.id} />
            </PopoverContent>
          </Popover>
        </div>
        <p className="font-normal max-h-16 overflow-y-auto text-gray-700 dark:text-gray-400">
          {club.description}p smvmvnj
        </p>
        {joinRequestMessage && (
          <div className="text-red-500">{joinRequestMessage}</div>
        )}
      </div>

      <div className="m-2 flex justify-center items-center">
        <Button className="bg-blue-600" onClick={joinClub}>
          Request To Join
        </Button>
      </div>
    </div>
  );
};

export default ClubCard;
