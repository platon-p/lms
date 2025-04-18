import { create } from "zustand";

interface AuthStore {
  isAuth: boolean;
  signIn(email: string, password: string): Promise<void>;
  role?: string | null;
  logout(): Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuth: true, // FIXME:
  role: null,
  async signIn(email): Promise<void> {
    const okPrefixes = ["student", "teacher", "admin"];
    let ok = false;
    okPrefixes.forEach((prefix) => {
      if (email.startsWith(prefix)) {
        ok = true;
        set({ isAuth: true, role: prefix });
      }
    });
    if (!ok) {
      set({ isAuth: false });
      throw new Error("Неверный логин или пароль");
    }
  },
  async logout(): Promise<void> {
    set({ isAuth: false });
  },
}));
