import { z } from "zod";
import { Link } from "react-router-dom";
import { MoveLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axiosInstance } from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";

const ForgotPassword = () => {
  type ForgotPassword = {
    email: string;
  };

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const schema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
  });

  const {
    register: email,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPassword>({
    resolver: zodResolver(schema),
  });

  const { mutate: forgotPassword } = useMutation({
    mutationFn: async (data: ForgotPassword) => {
      const res = await axiosInstance.post("/student/forgotPassword", data);
      return res.data;
      console.log(res.data);
    },
    onSuccess: (data) => {
      toast({
        title: data.message || "Success: Password recovery email sent!",
      });

      // Invalidate queries to refetch user data
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          error?.response?.data.message ||
          "There was a problem with your request.",
      });

      console.error("Login error:", error);
    },
  });

  const onSubmit = (data: ForgotPassword) => {
    console.log(data);
    forgotPassword(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-5xl flex items-center h-screen bg-[#f9f9f9] dark:bg-[#121212] bg-[radial-gradient(rgba(0,0,0,0.05)_2px,transparent_0)] dark:bg-[radial-gradient(rgba(255,255,255,0.171)_2px,transparent_0)] bg-[length:30px_30px] bg-[position:-5px_-5px]"
    >
      <div className="max-w-md w-full mx-auto p-6 shadow-lg bg-slate-400 dark:bg-[#0e0e0f] rounded-none md:rounded-2xl">
        <div className=" flex items-center justify-center">
          <Link to="/login">
            <MoveLeft />
          </Link>
          <p className="text-3xl font-bold text-center text-black dark:text-white max-w-sm mx-auto mt-2">
            Recover Your Password
          </p>
        </div>

        <div className="mb-3"></div>
        <hr />
        <div className="mt-7">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email Address
          </label>
          <input
            {...email("email", { required: true })}
            placeholder="johndoe@example.com"
            type="email"
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-100 focus:outline-none"
          />
          {errors.email && (
            <div className="text-red-600">{errors.email.message}</div>
          )}
        </div>
        <div className="flex items-center justify-center mt-3">
          <button
            className={`w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-500 focus:outline-none mt-4 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            type="submit"
            disabled={isSubmitting}
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default ForgotPassword;
