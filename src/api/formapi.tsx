import type { LoginFormData } from "../components/Login";

export const loginUser = async (data: LoginFormData) => {
  const res = await fetch("https://api.freeapi.app/api/v1/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Login failed");
  }



 const result= await res.json(); 
  localStorage.setItem("token", JSON.stringify(result.data.accessToken));
  return result; 
};

