import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      username: null,
      loginToken: null,
      isLoggedIn: false,

      // Action to log in a user and save their session
      login: (username, loginToken) => set({
        username,
        loginToken,
        isLoggedIn: true
      }),

      // Action to log out and clear the session
      logout: () => set({
        username: null,
        loginToken: null,
        isLoggedIn: false
      }),

      // Helper to update balance etc separately if needed
      updateUser: (data) => set((state) => ({ ...state, ...data })),
    }),
    {
      name: 'skyexchange-auth-storage', // Key for localStorage
    }
  )
);
