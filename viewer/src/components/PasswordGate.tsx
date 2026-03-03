import { useState, useEffect, useRef } from "react";

const STORAGE_KEY = "bootcamp_auth";
const PASSCODE = "katyperry";

export default function PasswordGate({ children }: { children: React.ReactNode }) {
    const [authenticated, setAuthenticated] = useState(false);
    const [value, setValue] = useState("");
    const [error, setError] = useState(false);
    const [checking, setChecking] = useState(true);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === PASSCODE) {
            setAuthenticated(true);
        }
        setChecking(false);
    }, []);

    useEffect(() => {
        if (!authenticated && !checking && inputRef.current) {
            inputRef.current.focus();
        }
    }, [authenticated, checking]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (value.trim() === PASSCODE) {
            localStorage.setItem(STORAGE_KEY, PASSCODE);
            setAuthenticated(true);
            setError(false);
        } else {
            setError(true);
            setValue("");
            inputRef.current?.focus();
        }
    };

    if (checking) return null;
    if (authenticated) return <>{children}</>;

    return (
        <div className="gate-backdrop">
            <form className="gate-card" onSubmit={handleSubmit}>
                <div className="gate-icon">🔒</div>
                <h2 className="gate-title">AI Bootcamp</h2>
                <p className="gate-subtitle">Enter the passcode to continue</p>

                <div className={`gate-input-wrap ${error ? "gate-shake" : ""}`}>
                    <input
                        ref={inputRef}
                        className={`gate-input ${error ? "gate-input-error" : ""}`}
                        type="password"
                        placeholder="Passcode"
                        value={value}
                        onChange={(e) => {
                            setValue(e.target.value);
                            if (error) setError(false);
                        }}
                        autoComplete="off"
                    />
                </div>

                {error && <p className="gate-error">Incorrect passcode. Try again.</p>}

                <button className="gate-btn" type="submit">
                    Unlock
                </button>

                <p className="gate-brand">Curated by <span>Eswar Prasad Kona</span></p>
            </form>
        </div>
    );
}
