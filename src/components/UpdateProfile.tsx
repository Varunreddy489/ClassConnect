import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { axiosInstance } from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Student } from "@/types/Client-types";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";

const UpdateProfile = () => {
  const { toast } = useToast();

  const schema = z.object({
    name: z.string().min(2).max(50),
    phoneNumber: z.string().min(10).max(10),
    semester: z.string().min(1).max(10),
    year: z.string().min(1).max(10),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const updateProfile = async (data: Student) => {
    try {
      const response = await axiosInstance.put(`/student/profile`, data);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("error in UpdateProfile: ", error);
    }
  };

  const example = () => {
    console.log("button");
  };

  const mutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      toast({
        title: data.message || "Success: Profile updated!",
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          error?.response?.data.message ||
          "There was a problem with your request.",
      });

      console.error("Profile update error:", error);
    },
  });

  const onSubmit = (data: Student) => {
    console.log("Form data submitted: ", data); // Debug log
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <Sheet>
        <SheetTrigger asChild>
          <Button className="bg-slate-200" variant="outline">
            Update Profile
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when you're done.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                {...register("name", { required: true })}
                placeholder="Enter Your Name"
                className="col-span-3"
              />
              {errors.name && (
                <div className="text-red-600">
                  {typeof errors.name.message === "string" &&
                    errors.name.message}
                </div>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phoneNumber" className="text-right">
                Phone Number
              </Label>
              <Input
                id="phoneNumber"
                {...register("phoneNumber", { required: true })}
                placeholder="Enter Your Phone Number"
                className="col-span-3"
              />
              {errors.phoneNumber && (
                <div className="text-red-600">
                  {typeof errors.phoneNumber.message === "string" &&
                    errors.phoneNumber.message}
                </div>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="semester" className="text-right">
                Semester
              </Label>
              <Input
                id="semester"
                {...register("semester", { required: true })}
                placeholder="Enter Your Semester"
                className="col-span-3"
              />
              {errors.semester && (
                <div className="text-red-600">
                  {typeof errors.semester.message === "string" &&
                    errors.semester.message}
                </div>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="year" className="text-right">
                Year
              </Label>
              <Input
                id="year"
                {...register("year", { required: true })}
                placeholder="Enter Your Year"
                className="col-span-3"
              />
              {errors.year && (
                <div className="text-red-600">
                  {typeof errors.year.message === "string" &&
                    errors.year.message}
                </div>
              )}
            </div>
          </div>
          <SheetFooter>
            <Button onClick={example} className="w-full" type="submit">
              Save changes
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </form>
  );
};

export default UpdateProfile;
