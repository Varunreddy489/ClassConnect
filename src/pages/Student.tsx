import { useStudentStore } from "@/stores/useStudentStore";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const StudentProfile = () => {
  const { studentId } = useParams();
  const { student, getStudentById } = useStudentStore();

  useEffect(() => {
    studentId && getStudentById(studentId);
  }, [studentId]);

  if (!student) {
    return <p>Loading...</p>;
  }

  return (
    <div className=" min-h-screen p-8">
      <div
        className="w-full  flex items-center justify-between bg-purple-500 rounded-md p-10"
        id="main"
      >
        <div>
          <img
            src={
              student.profilePic
                ? `http://localhost:5000/images/${student.profilePic}`
                : "/dashboard.jpg"
            }
            alt="Profile"
            className="w-48 h-44 rounded-md object-cover bg-purple-500 mix-blend-multiply"
          />
        </div>
        <div className="text-center">
          <h1 className="text-5xl  font-semibold ">{student.name}</h1>
          <p className="">{student.email}</p>
        </div>

        <div className="shadow-lg rounded-lg p-6   dark:text-gray-100">
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          <ul>
            <li>
              <span className="font-medium">Student ID:</span>{" "}
              {student.studentId}
            </li>
            <li>
              <span className="font-medium">Phone Number:</span>{" "}
              {student.phoneNumber || "Not Provided"}
            </li>
            <li>
              <span className="font-medium">Year:</span> {student.year}
            </li>
            <li>
              <span className="font-medium">Department:</span>{" "}
              {student.department || "Not Assigned"}
            </li>
            <li>
              <span className="font-medium">Semester:</span>{" "}
              {student.semester || "Not Assigned"}
            </li>
            <li>
              <span className="font-medium">Course:</span>{" "}
              {student.course || "Not Assigned"}
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="shadow-lg rounded-lg p-6 bg-emerald-100 dark:bg-cyan-800 text-gray-800 dark:text-gray-100">
          <h2 className="text-xl font-semibold mb-4">Clubs</h2>
          {student.clubs.length > 0 ? (
            student.clubs.map((club) => (
              <div
                key={club.id}
                className="flex items-center mb-4 p-4 border rounded-lg bg-white dark:bg-gray-700"
              >
                <img
                  src={
                    club.profilePic
                      ? `http://localhost:5000/images/${club.profilePic}`
                      : "/clubDefault.png"
                  }
                  alt={club.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="text-lg font-medium">{club.name}</h3>
                  <p>{club.description}</p>
                </div>
              </div>
            ))
          ) : (
            <p>Not part of any clubs.</p>
          )}
        </div>

        <div className="mt-8 shadow-lg rounded-lg p-6 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300">
          <h2 className="text-xl font-semibold mb-4">Connections</h2>
          {student.connections.length > 0 ? (
            student.connections.map((connection: any) => (
              <p key={connection.id} className="">
                Connection ID: {connection.id}
              </p>
            ))
          ) : (
            <p>No connections found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
