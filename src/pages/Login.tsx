import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axiosInstance } from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";
import { StudentLoginTypes } from "@/types/Client-types";

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const schema = z.object({
    email: z
      .string()
      .email({ message: "Invalid email address" })
      .default("12345678"),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .default("12345678"),
  });

  const {
    register: loginField,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<StudentLoginTypes>({
    resolver: zodResolver(schema),
  });

  const { mutate: login } = useMutation({
    mutationFn: async (data: StudentLoginTypes) => {
      const res = await axiosInstance.post("/student/login", data);
      return res.data;
    },
    onSuccess: () => {
      navigate("/home");
      toast({
        title: "Success: Welcome to ClassConnect!",
        description: "You have logged in successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (err: any) => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          err?.response?.data.error || "There was a problem with your request.",
      });

      console.error("Login error:", err);
    },
  });

  const onSubmit = async (data: StudentLoginTypes) => {
    // Call the mutate function to perform the login
    await login(data);
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
          {/* Email Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email Address
            </label>
            <input
              {...loginField("email", { required: true })} // Using renamed register
              placeholder="johndoe@example.com"
              type="email"
              // value={"varunsannapureddy@gmail.com"}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-100 focus:outline-none"
            />
            {errors.email && (
              <div className="text-red-600">{errors.email.message}</div>
            )}
          </div>

          {/* Password */}
          <div className="dark:text-white text-black ">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="relative">
                {" "}
                {/* Step 3: Wrap input and icons in a relative div */}
                <input
                  {...loginField("password", { required: true })}
                  placeholder="••••••••"
                  // value={"12345678"}
                  type={isPasswordVisible ? "text" : "password"} // Change type based on visibility
                  className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-100 focus:outline-none"
                />
                {errors.password && (
                  <div className="text-red-600">{errors.password.message}</div>
                )}
                {/* Step 4: Add icons and attach the toggle function to the onClick event */}
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {isPasswordVisible ? (
                    <EyeOff className="dark:text-white text-black " />
                  ) : (
                    <Eye className="dark:text-white text-black " />
                  )}{" "}
                  {/* Show/hide based on visibility state */}
                </button>
              </div>
            </div>
            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-blue-500  hover:text-blue-800 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Forgot your password? Click to reset."
              >
                Forgot Password?
              </Link>
            </div>
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
        <div className="text-center mt-5">
          <Link
            to="/signup"
            className="text-blue-500 hover:text-blue-800 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Already have an account? Log in"
          >
            New To ClassConnect? Register Here !!!
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Login;
