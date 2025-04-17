import { Role } from "@/domain/user";
import { create } from "zustand";

interface AuthStore {
  isAuth: boolean;
  signIn(): Promise<void>;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  isAuth: false,
  async signIn(): Promise<void> {
    set({ isAuth: true });
  },
}));

interface UserInfoStore {
  role: Role;
}
