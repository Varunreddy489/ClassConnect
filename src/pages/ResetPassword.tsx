import { z } from "zod";
import { MoveLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";

const ResetPassword = () => {
  type ResetPassword = {
    newPassword: string;
    confirmPassword: string;
  };

  const schema = z
    .object({
      newPassword: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" }),
      confirmPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPassword>({
    resolver: zodResolver(schema),
  });

  const { token } = useParams();
  const { toast } = useToast();

  const { mutate: resetPassword } = useMutation({
    mutationFn: async (data: ResetPassword) => {
      const response = await axiosInstance.post(
        `/student/changePassword/${token}`,
        data
      );
      return response.data;
      console.log(response.data);
    },
    onSuccess: (data) => {
      toast({
        title: data.message || "Success: Password recovery email sent!",
      });
    },
    onError: (err: any) => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          err?.response?.data.message ||
          "There was a problem with your request.",
      });

      console.error("Login error:", err);
    },
  });

  const onSubmit = (data: ResetPassword) => {
    resetPassword(data);
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-5xl flex items-center h-screen bg-[#f9f9f9] dark:bg-[#121212] bg-[radial-gradient(rgba(0,0,0,0.05)_2px,transparent_0)] dark:bg-[radial-gradient(rgba(255,255,255,0.171)_2px,transparent_0)] bg-[length:30px_30px] bg-[position:-5px_-5px]"
    >
      <div className="max-w-md w-full mx-auto p-6 shadow-lg bg-slate-400 dark:bg-[#0e0e0f] rounded-none md:rounded-2xl">
        <div className="flex items-center justify-center">
          <Link to="/login">
            <MoveLeft />
          </Link>
          <p className="text-3xl font-bold text-center text-black dark:text-white max-w-sm mx-auto mt-2">
            Reset Your Password
          </p>
        </div>

        <div className="mb-3"></div>
        <hr />

        {/* Password Field */}
        <div className="mt-7">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            New Password
          </label>
          <input
            {...register("newPassword")}
            placeholder="Enter your new password"
            type="password"
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-100 focus:outline-none"
          />
          {errors.newPassword && (
            <div className="text-red-600">{errors.newPassword.message}</div>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="mt-7">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Confirm Password
          </label>
          <input
            {...register("confirmPassword")}
            placeholder="Confirm your new password"
            type="password"
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-100 focus:outline-none"
          />
          {errors.confirmPassword && (
            <div className="text-red-600">{errors.confirmPassword.message}</div>
          )}
        </div>

        {/* Submit Button */}
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

export default ResetPassword;
