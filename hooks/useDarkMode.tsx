import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface DarkModeState {
  isDarkMode: boolean;
  setMode: (colorScheme: "light" | "dark") => void;
  toggleMode: () => void;
}

export const useDarkMode = create<DarkModeState>((set, get) => ({
  isDarkMode: false,
  setMode: async (colorScheme) => {
    set({ isDarkMode: colorScheme === "dark" });
  },
  toggleMode: async () => {
    const { isDarkMode } = get();
    set({ isDarkMode: !isDarkMode });
  },
}));
