import { NavLink } from "react-router-dom";
import { curriculum } from "../data/curriculum";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    return (
        <aside className={`sidebar ${isOpen ? "open" : ""}`}>
            <div className="sidebar-brand">
                <div className="sidebar-brand-row">
                    <h2>🚀 AI Bootcamp</h2>
                    <button className="sidebar-close" onClick={onClose} aria-label="Close sidebar">
                        ✕
                    </button>
                </div>
                <p>Study Materials</p>
            </div>

            <nav className="sidebar-nav">
                <div className="sidebar-section">
                    <div className="sidebar-section-title">Navigation</div>
                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) =>
                            `sidebar-link ${isActive ? "active" : ""}`
                        }
                    >
                        <span className="sidebar-link-icon">🏠</span>
                        <span className="sidebar-link-text">Home</span>
                    </NavLink>
                </div>

                {curriculum.map((week) => (
                    <div className="sidebar-section" key={week.slug}>
                        <div className="sidebar-section-title">
                            Week {week.week} — {week.title}
                        </div>
                        {week.days.map((day) => (
                            <NavLink
                                key={`${week.slug}-${day.slug}`}
                                to={`/${week.slug}/${day.slug}`}
                                className={({ isActive }) =>
                                    `sidebar-link ${isActive ? "active" : ""}`
                                }
                            >
                                <span className="sidebar-link-icon">
                                    {day.day === "Tuesday" ? "📘" : "📗"}
                                </span>
                                <span className="sidebar-link-text">
                                    {day.day} — {day.title}
                                </span>
                            </NavLink>
                        ))}
                    </div>
                ))}
            </nav>

            <div className="sidebar-footer">
                <p className="sidebar-footer-name">Eswar Prasad Kona</p>
                <p>Built with ❤️ for learning</p>
            </div>
        </aside>
    );
}
