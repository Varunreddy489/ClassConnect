import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableCaption,
} from "@/components/ui/table";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import UpdateProfile from "@/components/UpdateProfile";


const Profile = () => {
  const { authUser } = useAuth();

  const user = authUser?.isStudent;

  return (
    <div className="flex flex-col   m-4 ">
      <div className="flex space-x-10">
        <div className="flex flex-col ml-10  justify-center space-y-4 ">
          <img
            className="rounded-xl size-56 "
            src={`http://localhost:5000/images/${user?.profilePic}`}
          />
          <Button className=" hover:bg-gray-900 hover:text-white ">
            Update Image
          </Button>
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
        <div>User Created Clubs</div>
      </div>
    </div>
  );
};

export default Profile;
