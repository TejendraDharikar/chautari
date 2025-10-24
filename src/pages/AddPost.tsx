import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../api/postapi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Back from "../components/Back";

const AddPost = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm();
  const [tags, setTags] = useState<string[]>([]);

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      reset();
      navigate("/mypost");
      alert("Post created successfully!");
    },
    onError: (err: Error) => alert(err.message),
  });

  const onSubmit = (data: any) => {
    const formData = new FormData();
    formData.append("content", data.content);

    tags.forEach((tag, i) => {
      formData.append(`tags[${i}]`, tag);
    });

    (Array.from(data.images) as File[]).slice(0, 6).forEach((file: File) => {
      formData.append("images", file);
    });

    mutation.mutate(formData);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-6 bg-white shadow rounded space-y-4"
    >
      <Back />
      <h2 className="text-xl font-bold text-center">Create Post</h2>
      <label className="block text-sm font-medium text-gray-700">Content</label>
      <input
        {...register("content")}
        placeholder=" content"
        className="input input-bordered w-full"
      />

      <label className="block text-sm font-medium text-gray-700">Tags</label>
      <input
        type="text"
        placeholder="tags"
        onChange={(e) =>
          setTags(e.target.value.split(",").map((tag) => tag.trim()))
        }
        className="input input-bordered w-full"
      />

      <label className="block text-sm font-medium text-gray-700">Images</label>
      <input
        type="file"
        multiple
        accept="image/*"
        {...register("images")}
        className="file-input file-input-bordered w-full"
      />

      <button type="submit" className="btn btn-primary w-full">
        {mutation.isPending ? "Posting..." : "Add Post"}
      </button>
    </form>
  );
};

export default AddPost;
