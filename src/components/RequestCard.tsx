import { Button } from "./ui/button";
import { Student } from "@/types/Client-types";
import { Avatar, AvatarImage } from "./ui/avatar";
import { UserPlus } from "lucide-react";
import { useConnectionStore } from "@/stores/useConnectionStore";

const RequestCard = ({ user }: { user: Student }) => {
  const { sendConnection } = useConnectionStore();

  const handleConnection = async () => {
    if (user.id) {
      await sendConnection(user.id);
    } else {
      console.error("User ID is undefined");
    }
  };

  return (
    <div
      key={user.id}
      className="flex z-10 justify-between w-[400px] h-16 items-center p-3 dark:bg-zinc-900 bg-400 shadow rounded-lg"
    >
      <div>
        <Avatar>
          <AvatarImage
            src={
              user.profilePic
                ? `http://localhost:5000/images/${user.profilePic}`
                : "/placeholder.jpeg"
            }
            alt={"User Avatar"}
          />
        </Avatar>
      </div>
      <div className="ms-3 text-sm flex flex-col font-normal text-center space-x-2">
        <span>{user.name}</span>
        <span className="">{user.email}</span>
      </div>

      <Button onClick={handleConnection} className="flex" variant={"ghost"}>
        <UserPlus />
      </Button>
    </div>
  );
};

export default RequestCard;
