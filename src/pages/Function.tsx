// import { useMutation, useQueryClient } from "@tanstack/react-query";

// import Post from "./Post";
// import { likePost } from "../api/pageapi";

// const Function = () => {
//   const queryClient = useQueryClient();
//   const likeMutation = useMutation({
//   mutationFn: (postId: string) => likePost(postId),
//   onSuccess: () => {
//     queryClient.invalidateQueries(["fetchPosts"]); // refetch posts to update like count
//   },
// });

//   return (
//     <div>
//       <button
//   onClick={() => likeMutation.mutate(Post.isLiked)}
//   disabled={likeMutation.isPending}
//   className="px-3 py-1 text-sm bg-blue-100 hover:bg-blue-200 rounded"
// >
//   👍 Like ({Post.likes ?? 0})
// </button>

//     </div>
//   )
// }

// export default Function
