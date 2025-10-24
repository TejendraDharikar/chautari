import { useQuery } from "@tanstack/react-query";
import { fetchMyProfile } from "../api/pageapi";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/navbar";
import Back from "../components/Back";

const MyProfile = () => {
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["myProfile"],
    queryFn: fetchMyProfile,
  });

  if (isLoading) return <p className="text-center mt-10">Loading profile...</p>;
  if (isError)
    return <p className="text-center text-red-500">Error: {error.message} </p>;

  const profile = data?.data;

  return (
    <div>
      <Sidebar />
      <div className="max-w-3xl mx-auto mt-10 space-y-6">
        {/* Cover Image */}
        <div className="relative">
          <img
            src={profile?.coverImage || "../t-image.jpg"}
            alt="Cover"
            className="w-full h-48 rounded-lg bg-orange-400 shadow-md"
          />
          <img
            src={
              profile?.account?.avatar?.url
                ? "../t-image.jpg"
                : profile.account.avatar.url
            }
            alt="Avatar"
            className="absolute left-4 bottom-[-30px] h-20 w-20 rounded-full border-4 border-white bg-yellow-400 shadow-lg"
          />
        </div>

        {/* Profile Info */}
        <div className="mt-12 text-black text-center bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-2xl font-bold">
            {profile?.firstName ? profile.firstName : "Peter"}{" "}
            {profile?.lastName ? profile.lastName : "Parker"}
          </h2>

          <p className="mt-2 text-lg text-black">
            {profile?.bio || "Hello, I'm a mysterious web developer!"}
          </p>

          <div className="flex  justify-center gap-4 mt-5 mb-5 text-md text-black font-semibold">
            <h1>Following:{profile?.followingCount}</h1>
            <h1 className="ml-4">Followers:{profile?.followersCount}</h1>
          </div>

          <p className="mt-2 text-md text-black">
            Location: {profile?.location || "Unknown Location"}
          </p>

          <p className="text-black mt-5 mb-[-15px]">
            Updated:
            {profile?.updatedAt
              ? new Date(profile.updatedAt).toLocaleString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                  hour: "2-digit",
                  hour12: true,
                })
              : "No update time available"}
          </p>

          <button
            onClick={() => navigate("/editprofile")}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Edit Profile
          </button>
        </div>
      </div>
      <div className="max-w-3xl mx-auto mt-10">
        <Back />
      </div>
    </div>
  );
};

export default MyProfile;
