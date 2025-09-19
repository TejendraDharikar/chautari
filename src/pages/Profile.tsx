import { useQuery } from "@tanstack/react-query";
import { fetchMyProfile } from "../api/pageapi";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const Profile = () => {
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["myProfile"],
    queryFn: fetchMyProfile,
  });

  if (isLoading) return <p className="text-center mt-10">Loading profile...</p>;
  if (isError) return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-6">

      {/* Cover Image */}
      <div className="relative">
        
        <img
          src={data.avatar}
          alt="Avatar"
          className="absolute left-4 bottom-[-30px] h-20 w-20 rounded-full border-4 border-white shadow-lg"
        />
      </div>

      {/* Profile Info */}
      <div className="mt-10 text-center">
        <h2 className="text-2xl font-bold">{data.name}</h2>
        <p className="text-gray-600">{data.bio}</p>
        <button
          onClick={() => navigate("/settings")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );

}

export default Profile
