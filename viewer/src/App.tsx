import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Home from "./pages/Home";
import StudyMaterial from "./pages/StudyMaterial";

function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}

function AppContent() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const location = useLocation();

    // Auto-close sidebar on navigation (mobile only)
    useEffect(() => {
        if (window.innerWidth <= 768) {
            setSidebarOpen(false);
        }
    }, [location.pathname]);

    // Close sidebar on Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && sidebarOpen) {
                setSidebarOpen(false);
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [sidebarOpen]);

    return (
        <div className={`app-layout ${sidebarOpen ? "sidebar-open" : ""}`}>
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            {sidebarOpen && (
                <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
            )}
            <div className="main-content">
                <Header onMenuToggle={() => setSidebarOpen((prev) => !prev)} sidebarOpen={sidebarOpen} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/:weekSlug/:daySlug" element={<StudyMaterial />} />
                </Routes>
            </div>
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <AppContent />
        </BrowserRouter>
    );
}

export default App;
