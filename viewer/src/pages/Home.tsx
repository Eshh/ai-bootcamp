import { Link } from "react-router-dom";
import { curriculum } from "../data/curriculum";

export default function Home() {
    return (
        <div className="home-page">
            <div className="home-hero">
                <h1>AI Bootcamp</h1>
                <p>
                    Your comprehensive study materials — Python fundamentals, data
                    structures, Pandas, and everything you need for your AI/ML journey.
                    Browse by week and day below.
                </p>
            </div>

            <div className="weeks-grid">
                {curriculum.map((week) => (
                    <div className="week-card" key={week.slug}>
                        <div className="week-card-header">
                            <h2>Week {week.week} — {week.title}</h2>
                            <p>{week.description}</p>
                        </div>
                        <div className="week-card-body">
                            {week.days.map((day) => (
                                <Link
                                    key={`${week.slug}-${day.slug}`}
                                    to={`/${week.slug}/${day.slug}`}
                                    className="day-card"
                                >
                                    <div className="day-card-header">
                                        <span className="day-badge">
                                            {day.day === "Tuesday" ? "📘" : "📗"} {day.day}
                                        </span>
                                    </div>
                                    <h3>{day.title}</h3>
                                    <p>{day.subtitle}</p>
                                    <div className="day-topics">
                                        {day.topics.map((topic) => (
                                            <span className="topic-tag" key={topic}>
                                                {topic}
                                            </span>
                                        ))}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
