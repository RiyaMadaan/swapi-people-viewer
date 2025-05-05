import {create} from 'zustand';

interface AuthState {
  user: string | null;
  login: (username: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  // Check if there's a user in localStorage
  const storedUser = localStorage.getItem('user');

  return {
    user: storedUser ? storedUser : null, // If found, set the user from localStorage, else null
    login: (username) => {
      set({ user: username });
      localStorage.setItem('user', username); // Save the user to localStorage
    },
    logout: () => {
      set({ user: null });
      localStorage.removeItem('user'); // Remove the user from localStorage
    }
  };
});