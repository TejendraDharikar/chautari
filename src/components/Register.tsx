import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import z from "zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../api/formapi";

export const registerSchema = z.object({
  username: z.string().min(3, "Username is required"),
  email: z.email("Invalid email address"),
  password: z.string().min(5, "Password should be at least 5 characters"),
  role: z.enum(["USER", "ADMIN"]),
});

export type RegisterFormData = z.infer<typeof registerSchema>;

const Register = () => {
  const navigate = useNavigate();
  const [isPending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const { mutate } = useMutation({
    mutationFn:registerUser ,
    onSuccess: (data) => {
      console.log("Login success:", data);
       navigate("/login");
    },
    onError: (error: Error) => {
      console.error("Login error:", error.message);
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    mutate(data);
    console.log("Form Data:", data);
    localStorage.setItem("user", JSON.stringify(data));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 space-y-6">
        <h2 className="text-2xl font-semibold text-center text-blue-700">Register</h2>


        <form className="space-y-4" onSubmit={handleSubmit(onSubmit as any)}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              {...register("username")}
              placeholder="username"
              className="w-full px-4 py-1 border rounded-md border-gray-300"
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register("email")}
              placeholder="email"
              className="w-full px-4 py-1 border rounded-md border-gray-300"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              {...register("password")}
              placeholder="password"
              className="w-full px-4 py-1 border rounded-md border-gray-300"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
            <select
              id="role"
              {...register("role")}
              defaultValue="USER"
              className="w-full px-4 py-1 border rounded-md border-gray-300 text-gray-500"
            >
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
            {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
          >
            {isPending ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="flex justify-center gap-2 text-sm">
          <p>Already have an account?</p>
          <p
            onClick={() => navigate("/login")}
            className="hover:underline text-blue-600 cursor-pointer"
          >
            Login
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;