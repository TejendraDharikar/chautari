import { useEffect} from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { updateProfile, type Profile } from "../api/pageapi";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Back from "../components/Back";


const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  bio: z.string().optional(),
  location: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;


const EditProfile = () => {
  const navi =useNavigate();
  const { user, setUser } = useAuthStore();


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      bio: "",
      location: "",
    },
  });

  // Populate form when user changes
  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        bio: user.bio || "",
        location: user.location || "",
      });
    }
  }, [user, reset]);

  const mutation = useMutation({
mutationFn: (data: ProfileFormData) => {
    const sanitized: Profile = {
      firstName: data.firstName,
      lastName: data.lastName??"",
      bio: data.bio ?? "",         
      location: data.location ?? "", 
    };
 return updateProfile(sanitized);
  },

    onSuccess: (updatedUser) => {
      setUser(updatedUser); 
      navi("/myprofile");
      console.log(" Profile updated");
    },
    onError: (error: Error) => {
      console.error(" Update failed:", error.message);
    },
  });

  const onsubmit = (formData: ProfileFormData) => {
     const sanitizedData = {
    ...formData,
    firstname: formData.firstName ?? "",
    lastname: formData.lastName ?? "",
    bio: formData.bio ?? "",
    location: formData.location ?? "",
  };

    mutation.mutate(sanitizedData);
  }

   
  
  return (
    <form
  onSubmit={handleSubmit(onsubmit)}
  className="max-w-md mx-auto space-y-6 bg-white p-8 rounded-lg shadow-lg mt-10"
>
  <Back/>
  

  <div className="flex flex-col">
    <label htmlFor="firstName" className="mb-1 font-semibold text-gray-700">
      First Name
    </label>
    <input
      id="firstName"
      type="text"
      {...register("firstName")}
      placeholder="First Name"
      className="input input-bordered rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {errors.firstName && (
      <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
    )}
  </div>

  <div className="flex flex-col">
    <label htmlFor="lastName" className="mb-1 font-semibold text-gray-700">
      Last Name
    </label>
    <input
      id="lastName"
      type="text"
      {...register("lastName")}
      placeholder="Last Name"
      className="input input-bordered rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {errors.lastName && (
      <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
    )}
  </div>

  <div className="flex flex-col">
    <label htmlFor="bio" className="mb-1 font-semibold text-gray-700">
      Bio
    </label>
    <textarea
      id="bio"
      {...register("bio")}
      placeholder="Bio"
      rows={4}
      className="textarea textarea-bordered rounded-md px-3 py-2 border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <div className="flex flex-col">
    <label htmlFor="location" className="mb-1 font-semibold text-gray-700">
      Location
    </label>
    <input
      id="location"
      type="text"
      {...register("location")}
      placeholder="Location"
      className="input input-bordered rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <button
    type="submit"
    disabled={isSubmitting || mutation.isPending}
    className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
  >
    {mutation.isPending ? "Updating..." : "Update Profile"}
  </button>

  {mutation.isError && (
    <p className="text-red-600 mt-2 text-center">{(mutation.error as Error).message}</p>
  )}
</form>

   
  );
};

export default EditProfile;