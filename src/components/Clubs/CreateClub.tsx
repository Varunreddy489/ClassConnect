import { z } from "zod";
import { FC } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { useForm } from "react-hook-form";
import { MessageCirclePlus } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { axiosInstance } from "@/lib/axios";
import { CreateClubTypes, Student } from "@/types/Client-types";

const CreateClub: FC = () => {
  const schema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    members: z
      .array(z.string())
      .min(1, { message: "At least one member is required" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateClubTypes>({
    resolver: zodResolver(schema),
  });

  const fetchMembers = async (): Promise<Student> => {
    const response = await axiosInstance.get("/student/all");
    console.log(response.data);
    return response.data;
  };

  const { data, isLoading, error } = useQuery<Student>({
    queryKey: ["members"],
    queryFn: fetchMembers,
  });

  const { mutate: createClub } = useMutation({
    mutationFn: async (membersData: CreateClubTypes) => {
      const response = await axiosInstance.post("/club/create", {
        membersData,
      });
      return response.data;
    },
    onSuccess: () => {
      console.log("Club successfully created!");
    },
    onError: (error) => {
      console.error("Error in CreateClub:", error);
    },
  });

  const onSubmit = (data: CreateClubTypes) => {
    console.log(data);
    createClub(data);
  };

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none flex items-center">
            <MessageCirclePlus className="mr-2" /> Create Your Club
          </Button>
        </PopoverTrigger>

        <PopoverContent className="p-4 bg-slate-950 shadow-lg rounded-md z-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-96 ">
            <div className="flex justify-center"></div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="clubName" className="text-white">
                Club Name
              </label>
              <Input {...register("name")} placeholder="Enter club name" />
              {errors.name && (
                <div className="text-red-600">{errors.name.message}</div>
              )}
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="clubDescription" className="text-white">
                Club Description
              </label>
              <Input
                {...register("description")}
                placeholder="Enter club description"
                type="text"
              />
              {errors.description && (
                <div className="text-red-600">{errors.description.message}</div>
              )}
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-white">Add Members</label>
              {isLoading ? (
                <p>Loading members...</p>
              ) : error ? (
                <p className="text-red-600">Error loading members.</p>
              ) : (
                data?.students.map((student:Student) => (
                  <div
                    key={student.email}
                    className="flex items-center space-x-2"
                  >
                    <input
                      type="checkbox"
                      id={student.id}
                      className="form-checkbox h-5 w-5 text-blue-600"
                      value={student.id} // Pass the email as the value
                      {...register("members")}
                    />
                    <label htmlFor={student.email} className="text-white">
                      {student.name}
                    </label>
                  </div>
                ))
              )}
            </div>
            <Button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Create Club
            </Button>
          </form>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CreateClub;
