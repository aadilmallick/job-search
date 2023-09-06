import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "nativewind";

type ColorScheme = "light" | "dark";

interface IDarkModeContext {
  isDarkMode: boolean;
  toggleMode: () => void;
}

export const DarkModeContext = createContext<IDarkModeContext | null>(null);

export const useDarkModeContext = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error(
      "useDarkModeContext has to be used within <DarkModeContext.Provider>"
    );
  }
  return context;
};

export const DarkModeProvider = ({ children }: { children: ReactNode }) => {
  const { colorScheme, setColorScheme, toggleColorScheme } = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(colorScheme === "dark");

  const toggleMode = async () => {
    toggleColorScheme();
    await AsyncStorage.setItem("colorScheme", isDarkMode ? "light" : "dark");
    setIsDarkMode((prev) => !prev);
  };

  useEffect(() => {
    async function fetchStore() {
      const stored = await AsyncStorage.getItem("colorScheme");
      if (stored) {
        setColorScheme(stored as ColorScheme);
        setIsDarkMode(stored === "dark");
      }
    }

    fetchStore();
  }, []);

  return (
    <DarkModeContext.Provider
      value={{
        isDarkMode,
        toggleMode,
      }}
    >
      {children}
    </DarkModeContext.Provider>
  );
};
