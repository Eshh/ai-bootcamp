import { useParams, Link } from "react-router-dom";
import { curriculum } from "../data/curriculum";

export default function StudyMaterial() {
    const { weekSlug, daySlug } = useParams<{
        weekSlug: string;
        daySlug: string;
    }>();

    const week = curriculum.find((w) => w.slug === weekSlug);
    const day = week?.days.find((d) => d.slug === daySlug);

    if (!week || !day) {
        return (
            <div className="not-found">
                <h1>404</h1>
                <p>Study material not found.</p>
                <Link to="/">← Back to Home</Link>
            </div>
        );
    }

    return (
        <div className="content-viewer">
            <div className="content-breadcrumb">
                <Link to="/">Home</Link>
                <span className="sep">›</span>
                <span>Week {week.week}</span>
                <span className="sep">›</span>
                <span className="current">
                    {day.day} — {day.title}
                </span>
            </div>
            <div className="content-iframe-container">
                <iframe
                    className="content-iframe"
                    src={day.contentPath}
                    title={`${day.day} — ${day.title}`}
                />
            </div>
        </div>
    );
}
