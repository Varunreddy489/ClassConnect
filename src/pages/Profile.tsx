import { ChangeEvent, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Info, SquarePen, Trash2 } from "lucide-react";

import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableCaption,
} from "@/components/ui/table";
import Spinner from "@/components/Spinner";
import { axiosInstance } from "@/lib/axios";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import ClubDetails from "@/components/ClubDetails";
import { Separator } from "@/components/ui/separator";
import UpdateProfile from "@/components/UpdateProfile";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { authUser } = useAuth();
  const user = authUser?.isStudent;

  const [isInput, setIsInput] = useState(false);
  const [pic, setPic] = useState<File | null>(null);

  const isUpdateImage = () => {
    setIsInput(!isInput);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPic(e.target.files[0]);
    }
  };

  const updateImage = async () => {
    if (!pic) {
      alert("Please select an image first");
      return;
    }

    const formData = new FormData();
    formData.append("profile", pic);

    try {
      const response = await axiosInstance.put("/student/pic", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data);
    } catch (error) {
      console.error("error in updateImage");
    }
  };

  const fetchUserClubs = async () => {
    try {
      const response = await axiosInstance.get("/club/user");
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("error in fetchUserClubs: ", error);
    }
  };

  const { data, isLoading, error } = useQuery({
    queryFn: fetchUserClubs,
    queryKey: ["userClubs"],
  });

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="flex flex-col   m-4 ">
      <div className="flex space-x-10">
        <div className="flex flex-col ml-10  justify-center space-y-4 ">
          <img
            className="rounded-xl size-56 "
            src={`http://localhost:5000/images/${user?.profilePic}`}
          />
          <Button
            onClick={isUpdateImage}
            className=" hover:bg-gray-900 hover:text-white "
          >
            Update Image
          </Button>
          {isInput ? (
            <div>
              <Input onChange={handleFileChange} type="file" />
              <Button className="w-full mt-2" onClick={updateImage}>
                Update
              </Button>
            </div>
          ) : (
            <p></p>
          )}
        </div>

        <Separator className=" h-[500px]  " orientation="vertical" />
        <div className="p-6  ">
          <Table className="max-w-full  rounded-lg shadow-md">
            <TableCaption className="text-lg font-semibold text-gray-700 mb-4">
              {/* Sheet Button */}
              <UpdateProfile />
            </TableCaption>
            <TableHeader>
              <TableRow className="">
                <TableHead className=" text-gray-600 font-semibold text-center py-3">
                  #
                </TableHead>
                <TableHead className="text-left text-gray-600 font-semibold py-3 pl-4">
                  User Details
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-center">
              <TableRow>
                <TableCell className="font-medium text-left pl-4 py-2">
                  Name
                </TableCell>
                <TableCell className="text-left py-2">{user?.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-left pl-4 py-2">
                  Email
                </TableCell>
                <TableCell className="text-left py-2">{user?.email}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-medium text-left pl-4 py-2">
                  Phone Number
                </TableCell>
                <TableCell className="text-left py-2">
                  {user?.phoneNumber}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-left pl-4 py-2">
                  Semester
                </TableCell>
                <TableCell className="text-left py-2">
                  {user?.semester}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-left pl-4 py-2">
                  Student ID
                </TableCell>
                <TableCell className="text-left py-2">
                  {user?.studentId}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-left pl-4 py-2">
                  Year
                </TableCell>
                <TableCell className="text-left py-2">{user?.year}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-left pl-4 py-2">
                  Course
                </TableCell>
                <TableCell className="text-left py-2">{user?.course}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-left pl-4 py-2">
                  Department
                </TableCell>
                <TableCell className="text-left py-2">
                  {user?.department}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
      <div>
        <div className="text-lg font-bold my-4">User Created Clubs</div>
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="flex flex-wrap gap-4">
            {data?.map((club: any) => (
              <Card key={club.id} data={club} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

const Card = ({ data }: { data: any }) => {
  const { toast } = useToast();
  const deleteClub = async () => {
    try {
      const response = await axiosInstance.delete(`/club/${data.id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("error in deleteClub:", error);
    }
  };

  const [isUpdate, setIsUpdate] = useState(false);
  const [pic, setPic] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPic(e.target.files[0]);
    }
  };

  const { mutate: updateClub } = useMutation({
    mutationFn: async (picture:File) => {
      const formData = new FormData();
      formData.append("profile", picture);

      try {
        const response = await axiosInstance.put(
          `club/update/${data.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error("Error in updateClub:", error);
      }
    },
    onSuccess: () => {
      toast({
        title: "Image Updated Successfully!",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Success: Welcome to ClassConnect!",
        description: "You have logged in successfully.",
      });
    },
  });

  return (
    <div className="max-w-sm max-h-96 min-h-80 w-64 border rounded-lg shadow">
      <img
        className="rounded-t-lg aspect-[5/3] w-full object-cover"
        src={`http://localhost:5000/images/${data.profilePic}`}
        alt={data.name}
      />
      <div className="p-5">
        <div className="flex justify-between items-center mb-2">
          <h5 className="text-2xl font-bold tracking-tight text-black dark:text-white">
            {data.name}
          </h5>
          <div className="flex items-center justify-between space-x-2 mt-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" className="p-1 hover:text-blue-500">
                  <Info />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <ClubDetails clubId={data.id} />
              </PopoverContent>
            </Popover>
            <Button
              onClick={() => {
                setIsUpdate(!isUpdate);
              }}
              variant="ghost"
              className="p-1 hover:text-blue-500"
            >
              <SquarePen />
            </Button>
            <Button
              onClick={deleteClub}
              variant="ghost"
              className="p-1 hover:text-red-500"
            >
              <Trash2 />
            </Button>
          </div>
        </div>
        <p className="font-normal max-h-16 overflow-y-auto text-gray-700 dark:text-gray-400 mb-4">
          {data.description}
        </p>

        {isUpdate && (
          <div>
            <Input
              onChange={handleFileChange}
              type="file"
              placeholder="Choose a pic"
            />

            <Button onClick={updateClub} >update Image</Button>
          </div>
        )}
      </div>
    </div>
  );
};
