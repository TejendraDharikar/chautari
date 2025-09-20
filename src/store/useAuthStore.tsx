import { create } from "zustand";


export interface User{
  firstName: string;
  lastName: string;
  bio: string;
  location: string;
}
export interface AuthState {
  token: string | null;
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
  user:User|null;
  setUser: (user: User | null) => void;
}


export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token"),
  isLoggedIn: Boolean(localStorage.getItem("token")),

  login: (token: string) => {
    localStorage.setItem("token", token);
    set({ token, isLoggedIn: true });
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ token: null, isLoggedIn: false });
  },
   user: null,
  setUser: (user) => set({ user }),

}));
