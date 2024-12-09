import { UserPlus } from "lucide-react";

import { Button } from "./ui/button";
import { Student } from "@/types/Client-types";
import { useConnectionStore } from "@/stores/useConnectionStore";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const SuggestedFriends = ({ data }: { data: Student }) => {
  const { sendConnection } = useConnectionStore();

  const handleConnection = async () => {
    if (data.id) {
      await sendConnection(data.id);
      toast({
        title: "Success",
        description: "Connection request sent successfully",
      });
    } else {
      console.error("User ID is undefined");
    }
  };
  return (
    <div className="w-full p-10 h-16 dark:bg-black bg-emerald-100 m-1 rounded-xl  flex justify-between items-center  ">
      <Avatar>
        <AvatarImage
          src={
            data.profilePic
              ? `http://localhost:5000/images/${data.profilePic}`
              : "/dashboard.jpg"
          }
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <Link to={`/profile/${data.studentId}`} className="text-xl  ">
        {data.name}{" "}
      </Link>

      <Button className="flex space-x-2" onClick={handleConnection}>
        <span>Connect</span>
        <UserPlus />
      </Button>
    </div>
  );
};

export default SuggestedFriends;
