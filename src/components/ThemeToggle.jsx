import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

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
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            className="w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200 cursor-pointer"
            style={{
                background: "rgba(108,99,255,0.1)",
                border: "1px solid var(--c-border)",
                color: isDarkMode ? "#f59e0b" : "#6C63FF",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(108,99,255,0.2)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(108,99,255,0.1)"; }}
        >
            {isDarkMode ? (
                <Sun size={16} />
            ) : (
                <Moon size={16} />
            )} 
        </button>
    );
};