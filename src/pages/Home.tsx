import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchPosts } from "../api/pageapi";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { IoLogInOutline , IoLogOutOutline } from "react-icons/io5";

const Home = () => {
const {isLoggedIn,token,login}=useAuthStore();
 const logout = useAuthStore((state) => state.logout);
const navigate=useNavigate();
   const queryClient = useQueryClient();

const handleLogin=()=>{
  // Replace 'yourTokenHere' with the actual token value you want to use
  login(token ?? "")
  navigate("/login");
};

const handleLogout=()=>{
  logout();
   queryClient.clear();
  navigate("/");
}

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isLoading)
    return <div className="text-center mt-10">Loading posts...</div>;
  if (isError)
    return (
      <div className="text-center mt-10 text-red-500">
        Error: {error.message}
      </div>
    );

  return (
   
    <div className="min-h-screen bg-gray-50">
       
       <div className="flex justify-between   text-white bg-gray-300 shadow-md">
        <Sidebar/>
      <div className=" h-20 w-15 p-4 ">
 {!isLoggedIn?(
        <button 
        onClick={handleLogin}
       className="px-1 py-3  text-black text-3xl hover:bg-blue-500 rounded-md"
        title="Login"
        > <IoLogInOutline /></button>
      ) : (
        <button
          onClick={handleLogout}
          className="px-1 py-3 text-black text-3xl hover:bg-red-500 rounded-md"
          title="Logout"
        >
         <IoLogOutOutline />
        </button>
      )}
      </div>
       </div>
     

      <h1 className="text-2xl font-bold text-center"> Latest Posts</h1>

      {data.length === 0 ? (
        <div className="text-center text-gray-500">No posts available</div>
      ) : (
        data.map((post: any) => (
          <div key={post._id} className="p-4 bg-white shadow rounded">
            <h2 className="text-lg font-semibold">{post.title}</h2>
            <img src="{post.coverImage}" alt="#"></img>

            <p className="text-sm text-gray-700 mt-2">{post.content}</p>

            <div className="text-xs text-gray-500 mt-1">
              Posted by {post.author?.firstName} {post.author?.lastName}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
