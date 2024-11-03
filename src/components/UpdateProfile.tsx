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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { axiosInstance } from "@/lib/axios";

const UpdateProfile = () => {
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axiosInstance.put(`/student/profile`, {
        name,
        year,
        semester,
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("error in UpdateProfile: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
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
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Your Name"
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="semester" className="text-right">
                Semester
              </Label>
              <Input
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                id="semester"
                placeholder="Enter Your Semester"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="year" className="text-right">
                Year
              </Label>
              <Input
                id="year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="Enter Your Year"
                className="col-span-3"
              />
            </div>
          </div>
          <SheetFooter>
            <Button onClick={handleSubmit} className="w-full" type="submit">
              Save changes
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </form>
  );
};

export default UpdateProfile;
