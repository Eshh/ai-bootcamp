import { useEffect, useState } from "react";

interface HeaderProps {
    onMenuToggle: () => void;
    sidebarOpen: boolean;
}

export default function Header({ onMenuToggle, sidebarOpen }: HeaderProps) {
    const [theme, setTheme] = useState<"light" | "dark">(() => {
        const saved = localStorage.getItem("theme");
        return (saved as "light" | "dark") || "light";
    });

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    return (
        <header className="app-header">
            <div className="header-left">
                <button
                    className={`menu-toggle ${sidebarOpen ? "active" : ""}`}
                    onClick={onMenuToggle}
                    title="Toggle sidebar"
                    aria-label="Toggle sidebar"
                >
                    <span className="hamburger-line" />
                    <span className="hamburger-line" />
                    <span className="hamburger-line" />
                </button>
                <div className="header-title-group">
                    <h1>📚 AI Bootcamp — Study Materials</h1>
                    <span className="header-subtitle">by Eswar Prasad Kona</span>
                </div>
            </div>
            <div className="header-actions">
                <button
                    className="theme-toggle"
                    onClick={toggleTheme}
                    title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
                >
                    {theme === "light" ? "🌙" : "☀️"}
                </button>
            </div>
        </header>
    );
}
