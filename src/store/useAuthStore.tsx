import { create } from 'zustand';


export interface AuthState
{
  isLoggedIn:boolean;
  login :()=>void;
  logout :()=>void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: Boolean(localStorage.getItem("token")),  // initialize from token presence
  login: () => set({ isLoggedIn: true }),
  logout: () => {
    localStorage.removeItem("token");  // clear token on logout
    set({ isLoggedIn: false });
  },
}));