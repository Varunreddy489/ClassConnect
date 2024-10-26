import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axiosInstance } from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";
import { StudentAuthTypes } from "@/types/Client-types";
import { Link } from "react-router-dom";

const SignUp = () => {
  const { toast } = useToast();

  const schema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    // ! Add to the deployement
    // .regex(/[a-z]/, {
    //   message: "Password must contain at least one lowercase letter",
    // })
    // .regex(/[A-Z]/, {
    //   message: "Password must contain at least one uppercase letter",
    // })
    // .regex(/[0-9]/, { message: "Password must contain at least one number" })
    // .regex(/[\W_]/, {
    //   message: "Password must contain at least one special character",
    // })
    phoneNumber: z
      .string()
      .regex(/^\d{10}$/, { message: "Phone number must be exactly 10 digits" }),

    studentId: z.string().min(1, { message: "Student ID is required" }),
    department: z.string().min(1, { message: "Department is required" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<StudentAuthTypes>({
    resolver: zodResolver(schema),
  });

  const queryClient = useQueryClient();

  const { mutate: signUp } = useMutation({
    mutationFn: async (data: StudentAuthTypes) => {
      const res = await axiosInstance.post("/student/register", data);
      console.log(res.data);
      return res.data;
    },
    onSuccess: () => {
      toast({
        title: "Success: Welcome to ClassConnect!",
        description: "Friday, February 10, 2023 at 5:57 PM",
      });

      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (err: any) => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          err?.response?.data.message ||
          "There was a problem with your request.",
      });

      console.log(err);
    },

    
  });

  const onSubmit = (data: StudentAuthTypes) => {
    console.log(data);
    signUp(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-5xl flex items-center h-screen bg-[#f9f9f9] dark:bg-[#121212] bg-[radial-gradient(rgba(0,0,0,0.05)_2px,transparent_0)] dark:bg-[radial-gradient(rgba(255,255,255,0.171)_2px,transparent_0)] bg-[length:30px_30px] bg-[position:-5px_-5px]"
    >
      <div className="max-w-md w-full mx-auto p-6 shadow-lg bg-slate-400 dark:bg-[#0e0e0f] rounded-none md:rounded-2xl">
        <h2 className="text-2xl font-bold text-center text-gray-950 dark:text-gray-100 mb-4">
          Welcome to ClassConnect
        </h2>
        <p className="text-sm text-center text-gray-600 dark:text-gray-400 max-w-sm mx-auto mt-2">
          Sign up to ClassConnect
        </p>

        <div className="mt-8 space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              {...register("name", { required: true })}
              placeholder="John Doe"
              type="text"
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-100 focus:outline-none"
            />
            {errors.name && (
              <div className="text-red-600">{errors.name.message}</div>
            )}
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email Address
            </label>
            <input
              {...register("email", { required: true })}
              placeholder="johndoe@example.com"
              type="email"
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-100 focus:outline-none"
            />
            {errors.email && (
              <div className="text-red-600">{errors.email.message}</div>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              {...register("password", { required: true })}
              placeholder="••••••••"
              type="password"
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-100 focus:outline-none"
            />
            {errors.password && (
              <div className="text-red-600">{errors.password.message}</div>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Phone Number
            </label>
            <input
              {...register("phoneNumber", { required: true })}
              placeholder="+1 234 567 890"
              type="tel"
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-100 focus:outline-none"
            />
            {errors.phoneNumber && (
              <div className="text-red-600">{errors.phoneNumber.message}</div>
            )}
          </div>

          {/* Student ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Student ID
            </label>
            <input
              {...register("studentId", { required: true })}
              placeholder="STU12345"
              type="text"
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-100 focus:outline-none"
            />
            {errors.studentId && (
              <div className="text-red-600">{errors.studentId.message}</div>
            )}
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Department
            </label>
            <input
              {...register("department", { required: true })}
              placeholder="Computer Science"
              type="text"
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-100 focus:outline-none"
            />
            {errors.department && (
              <div className="text-red-600">{errors.department.message}</div>
            )}
          </div>

          <button
            className={`w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-500 focus:outline-none ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            type="submit"
            disabled={isSubmitting}
          >
            Submit
          </button>
        </div>
        <div className="flex m-2 justify-center items-center">
          <Link
            to="/login"
            className="text-blue-500 hover:text-blue-800 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Already have an account? Log in"
          >
            Have an Account? Login Here !!!
          </Link>
        </div>
      </div>
    </form>
  );
};

export default SignUp;
