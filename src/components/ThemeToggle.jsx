import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils";

export const ThemeToggle = () => {

    const [isDarkMode, setIsDarkMode] = useState(true); // True for Default to dark mode otherwise false for light mode

    // useEffect(() => {
    //     const savedTheme = localStorage.getItem("theme");
    //     if (savedTheme === "dark") {
    //         setIsDarkMode(true);
    //         document.documentElement.classList.add("dark");
    //     } else {
    //         localStorage.setItem("theme", "light");
    //         setIsDarkMode(false);
    //     }
    // }, []);

    useEffect(() => {
        // Always start in dark mode
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
        setIsDarkMode(true);
    }, []);

    const toggleTheme = () => {
        if (isDarkMode) {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
            setIsDarkMode(false);
        } else {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
            setIsDarkMode(true);
        }
    }

    return (
        <button 
            onClick={toggleTheme} 
            className={cn(
                "fixed max-sm:right-0 max-sm:top-0 top-1 right-5 z-50 p-2 rounded-full transition-colors duration-300",
                "focus:outline-hidden"
            )}
        >
            {isDarkMode ? (
                <Sun className="h-6 w-6 text-yellow-300"/>
            ) : (
                <Moon className="h-6 w-6 text-blue-900"/>
            )} 
        </button>
    );
};