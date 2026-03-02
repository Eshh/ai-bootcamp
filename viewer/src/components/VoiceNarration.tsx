import { useState, useEffect, useRef, useCallback } from "react";

interface VoiceNarrationProps {
    summary: string;
    dayTitle: string;
}

type NarrationState = "idle" | "playing" | "paused";

export default function VoiceNarration({ summary, dayTitle }: VoiceNarrationProps) {
    const [state, setState] = useState<NarrationState>("idle");
    const [showText, setShowText] = useState(false);
    const [supported, setSupported] = useState(true);
    const [progress, setProgress] = useState(0);
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        if (!window.speechSynthesis) {
            setSupported(false);
        }
        return () => {
            window.speechSynthesis?.cancel();
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    // Reset when summary changes (navigating between days)
    useEffect(() => {
        window.speechSynthesis?.cancel();
        setState("idle");
        setProgress(0);
        if (intervalRef.current) clearInterval(intervalRef.current);
    }, [summary]);

    const startProgressTracking = useCallback((estimatedDuration: number) => {
        const startTime = Date.now();
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const pct = Math.min((elapsed / estimatedDuration) * 100, 99);
            setProgress(pct);
        }, 200);
    }, []);

    const handlePlay = useCallback(() => {
        if (!window.speechSynthesis) return;

        if (state === "paused") {
            window.speechSynthesis.resume();
            setState("playing");
            return;
        }

        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(summary);
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;

        // Pick a good voice
        const voices = window.speechSynthesis.getVoices();
        const preferred = voices.find(
            (v) => v.lang.startsWith("en") && v.name.includes("Google")
        ) ?? voices.find((v) => v.lang.startsWith("en"));
        if (preferred) utterance.voice = preferred;

        utterance.onstart = () => {
            setState("playing");
            // Estimate ~130 words per minute
            const wordCount = summary.split(/\s+/).length;
            const estimatedMs = (wordCount / 130) * 60 * 1000;
            startProgressTracking(estimatedMs);
        };

        utterance.onend = () => {
            setState("idle");
            setProgress(100);
            if (intervalRef.current) clearInterval(intervalRef.current);
            setTimeout(() => setProgress(0), 1500);
        };

        utterance.onerror = () => {
            setState("idle");
            setProgress(0);
            if (intervalRef.current) clearInterval(intervalRef.current);
        };

        utteranceRef.current = utterance;
        window.speechSynthesis.speak(utterance);
    }, [state, summary, startProgressTracking]);

    const handlePause = useCallback(() => {
        window.speechSynthesis?.pause();
        setState("paused");
        if (intervalRef.current) clearInterval(intervalRef.current);
    }, []);

    const handleStop = useCallback(() => {
        window.speechSynthesis?.cancel();
        setState("idle");
        setProgress(0);
        if (intervalRef.current) clearInterval(intervalRef.current);
    }, []);

    if (!supported) return null;

    return (
        <div className="voice-narration">
            <div className="voice-narration-inner">
                <div className="voice-header">
                    <div className="voice-info">
                        <span className={`voice-icon ${state === "playing" ? "playing" : ""}`}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                {state === "playing" ? (
                                    <>
                                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" className="voice-wave voice-wave-1" />
                                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" className="voice-wave voice-wave-2" />
                                    </>
                                ) : (
                                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                                )}
                            </svg>
                        </span>
                        <div className="voice-label">
                            <span className="voice-title">Quick Audio Summary</span>
                            <span className="voice-subtitle">{dayTitle}</span>
                        </div>
                    </div>
                    <div className="voice-controls">
                        {state === "idle" && (
                            <button className="voice-btn voice-btn-play" onClick={handlePlay} title="Play summary">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <polygon points="5 3 19 12 5 21 5 3" />
                                </svg>
                                <span>Listen</span>
                            </button>
                        )}
                        {state === "playing" && (
                            <>
                                <button className="voice-btn voice-btn-pause" onClick={handlePause} title="Pause">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                        <rect x="6" y="4" width="4" height="16" />
                                        <rect x="14" y="4" width="4" height="16" />
                                    </svg>
                                </button>
                                <button className="voice-btn voice-btn-stop" onClick={handleStop} title="Stop">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                        <rect x="4" y="4" width="16" height="16" rx="2" />
                                    </svg>
                                </button>
                            </>
                        )}
                        {state === "paused" && (
                            <>
                                <button className="voice-btn voice-btn-play" onClick={handlePlay} title="Resume">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                        <polygon points="5 3 19 12 5 21 5 3" />
                                    </svg>
                                    <span>Resume</span>
                                </button>
                                <button className="voice-btn voice-btn-stop" onClick={handleStop} title="Stop">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                        <rect x="4" y="4" width="16" height="16" rx="2" />
                                    </svg>
                                </button>
                            </>
                        )}
                        <button
                            className={`voice-btn voice-btn-text ${showText ? "active" : ""}`}
                            onClick={() => setShowText((v) => !v)}
                            title={showText ? "Hide text" : "Read summary"}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                                <line x1="16" y1="13" x2="8" y2="13" />
                                <line x1="16" y1="17" x2="8" y2="17" />
                            </svg>
                        </button>
                    </div>
                </div>

                {(state === "playing" || state === "paused") && (
                    <div className="voice-progress">
                        <div className="voice-progress-bar" style={{ width: `${progress}%` }} />
                    </div>
                )}

                {showText && (
                    <div className="voice-text-preview">
                        {summary.split("\n\n").map((para, i) => (
                            <p key={i}>{para}</p>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
