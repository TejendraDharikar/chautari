import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import z from "zod";
import type { LoginFormData } from "./Login";
import { useForm } from "react-hook-form";

export const registerSchema = z.object({
  username: z.string().min(3, "username is required"),
  email: z.email("invalid email address"),
  password: z.string().min(5, "password should be atleast 5 characters"),
  role: z.enum(["USER", "ADMIN"]).default("USER"),
});

const Register = () => {
  const navigate = useNavigate();

  const{register,handleSubmit,formState:{errors}}=useForm<LoginFormData>({resolver:zodResolver(registerSchema)});



  handleSubmit((data) => {  }
  );
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 space-y-6">
        <h2 className="text-2xl font-semibold text-center text-blue-700">Register</h2>
        <form className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            placeholder="username"
            className="w-full px-4 py-1 border-1 rounded-md border-gray-300"
          ></input>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            placeholder="email"
            className="w-full px-4 py-1 border-1 rounded-md border-gray-300"
          ></input>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            {...register("password")}
            placeholder="password"
            className="w-full px-4 py-1 border-1 rounded-md border-gray-300"
          ></input>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
          <select
            id="role"
            name="role"
            className="w-full px-4 py-1 border-1 rounded-md border-gray-300 text-gray-500"
          >
            <option defaultValue={"Select your role"} disabled selected>
              __Select your role__
            </option>
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
          <button
          onClick={handleSubmit()}
            type="submit"
            disabled={ispending}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
          >
           {isPending ? "Registering..." : "Register"}
          </button>
        </form>
        <div className="flex">
          <p>Already have an account?</p>
          <p
            onClick={() => {
              navigate("/login");
            }}
            className="hover:underline text-blue-600 cursor-pointer "
          >
            Login
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
