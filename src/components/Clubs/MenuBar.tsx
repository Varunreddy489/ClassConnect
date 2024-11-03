import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  EllipsisVertical,
  Info,
  LogOut,
  Trash2,
  UsersRound,
} from "lucide-react";
import { UserClubsResponse } from "@/types/Client-types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { axiosInstance } from "@/lib/axios";

const MenuBar = ({ clubData }: { clubData: UserClubsResponse }) => {
  
  const removeClubMember=async()=>{
    try {
      const response=await axiosInstance.delete(`/clubs`)
    } catch (error) {
      console.error("error in removeClubMember:",error);
    }
  }

  return (
    <div className="text-center  ">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="bg-transparent">
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56">
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="flex items-center space-x-2 hover:bg-gray-900 w-full">
                <Info />
                <span>Overview</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="w-full">
                <span className="text-gray-300 text-lg font-bold text-center ">
                  Club Created By
                </span>
                <DropdownMenuItem>
                  name: {clubData.creator?.name}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  email: {clubData.creator?.email}
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>

            <Separator />

            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="flex items-center space-x-2 hover:bg-gray-900 w-full">
                <UsersRound />
                <span>Members</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="w-full">
                {clubData.members && clubData.members.length > 0 ? (
                  clubData.members.map((member, index) => (
                    <DropdownMenuItem
                      className="flex justify-between space-x-3"
                      key={index}
                    >
                      <div className="flex items-center space-x-2">
                        <Avatar>
                          <AvatarImage
                            src={`http://localhost:5000/images/${member.profilePic}`}
                          />
                          <AvatarFallback>{clubData.name}</AvatarFallback>
                        </Avatar>
                        <span>{member.name}</span>
                      </div>
                      <Button variant={"destructive"}>
                        <Trash2 />
                      </Button>
                    </DropdownMenuItem>
                  ))
                ) : (
                  <DropdownMenuItem>No members found</DropdownMenuItem>
                )}
              </DropdownMenuSubContent>
            </DropdownMenuSub>

            <Separator />

            <DropdownMenuItem className="flex items-center space-x-2 hover:bg-gray-900 w-full">
              <LogOut />
              <span>Leave Club</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MenuBar;
