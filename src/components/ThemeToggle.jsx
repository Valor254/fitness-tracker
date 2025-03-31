import { useEffect } from "react";
import useThemeStore from "../store/themeStore";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeStore();

  // Ensure theme applies on page load
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full transition-all bg-gray-200 dark:bg-gray-800"
    >
      {theme === "dark" ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-600" />}
    </button>
  );
};

export default ThemeToggle;
