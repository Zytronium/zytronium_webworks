"use client";

import { useEffect, useRef, useState } from "react";

const CHUNK_DURATION = 600;  // ms each chunk animates in
const CHUNK_GAP      = 300;  // ms between first two chunks
const DRAMATIC_PAUSE = 500;  // ms pause before final chunk

export default function HeroSection() {
    const sectionRef  = useRef<HTMLElement>(null);
    const [visibleChunks, setVisibleChunks] = useState<number>(0);
    const [subtextVisible, setSubtextVisible] = useState(false);
    const triggered = useRef(false);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !triggered.current) {
                    triggered.current = true;
                    runAnimation();
                }
            },
            { threshold: 0.25 }
        );

        observer.observe(section);
        return () => observer.disconnect();
    }, []);

    function runAnimation() {
        // Chunk 1: "Affordable."
        setTimeout(() => setVisibleChunks(1), 200);
        // Chunk 2: "Modern."
        setTimeout(() => setVisibleChunks(2), 200 + CHUNK_DURATION + CHUNK_GAP);
        // Dramatic pause, then Chunk 3: "Built for the Future."
        setTimeout(() => setVisibleChunks(3), 200 + CHUNK_DURATION + CHUNK_GAP + CHUNK_DURATION + DRAMATIC_PAUSE);
        // Subtext + CTA slide in after final chunk settles
        setTimeout(() => setSubtextVisible(true), 200 + CHUNK_DURATION + CHUNK_GAP + CHUNK_DURATION + DRAMATIC_PAUSE + CHUNK_DURATION + 200);
    }

    return (
        <section
            ref={sectionRef}
            className="relative w-full overflow-hidden flex flex-col items-center justify-center -mt-64"
            style={{ minHeight: "115vh" }}
        >
            {/* ── Drifting grid background ── */}
            <div className="absolute inset-0 z-0" aria-hidden="true">
                <div className="hero-grid absolute inset-[-20%]" />
                {/* Radial vignette to fade the grid at edges */}
                <div
                    className="absolute inset-0"
                    style={{ background: "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 30%, #0a0618 80%)" }}
                />
            </div>

            {/* ── Ghost logo ── */}
            <div
                className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none blur-md mt-[80vh]"
                aria-hidden="true"
            >
                <svg
                    viewBox="0 0 1200 290"
                    className="w-[140%] max-w-none opacity-[0.1]"
                    style={{ filter: "blur(1px)" }}
                >
                    <defs>
                        <linearGradient id="ghost-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#00f4ff" />
                            <stop offset="50%" stopColor="#c800ff" />
                            <stop offset="100%" stopColor="#ff0454" />
                        </linearGradient>
                    </defs>
                    <text
                        x="600" y="128"
                        textAnchor="middle"
                        fontFamily="Aquire, sans-serif"
                        fontSize="180"
                        fontWeight="400"
                        letterSpacing="0.03em"
                        fill="url(#ghost-gradient)"
                    >
                        Zytronium
                    </text>
                    <text
                        x="600" y="218"
                        textAnchor="middle"
                        fontFamily="Aquire, sans-serif"
                        fontSize="56"
                        fontWeight="400"
                        letterSpacing="0.45em"
                        fill="url(#ghost-gradient)"
                    >
                        WebWorks
                    </text>
                </svg>
            </div>

            {/* ── Ambient glow blobs ── */}
            <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-[0.07]"
                     style={{ background: "radial-gradient(circle, #00b2ff 0%, transparent 70%)" }} />
                <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full opacity-[0.06]"
                     style={{ background: "radial-gradient(circle, #c800ff 0%, transparent 70%)" }} />
                <div className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full opacity-[0.05]"
                     style={{ background: "radial-gradient(circle, #ff0454 0%, transparent 70%)" }} />
            </div>

            {/* ── Content ── */}
            <div className="relative z-10 flex flex-col items-center text-center px-5 sm:px-10 max-w-5xl mx-auto">

                {/* Eyebrow label */}
                <div
                    className="mb-8 flex items-center gap-2 px-4 py-1.5 text-xs font-bold tracking-[3px] uppercase text-primary/70 border border-primary/20"
                    style={{ clipPath: "polygon(6px 0%,100% 0%,100% calc(100% - 6px),calc(100% - 6px) 100%,0% 100%,0% 6px)" }}
                >
                    Zytronium WebWorks
                </div>

                {/* Headline chunks */}
                <h2 className="mb-2 flex flex-col items-center gap-1 sm:gap-2">
                    {/* Line 1: "Affordable. Modern." */}
                    <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
                        {["Affordable.", "Modern."].map((chunk, i) => (
                            <span
                                key={chunk}
                                className="hero-chunk text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground"
                                style={{
                                    fontFamily: "Gltp Starion, sans-serif",
                                    opacity:    visibleChunks > i ? 1 : 0,
                                    transform:  visibleChunks > i ? "translateY(0) skewY(0deg)" : "translateY(28px) skewY(1deg)",
                                    transition: `opacity ${CHUNK_DURATION}ms cubic-bezier(0.22,1,0.36,1), transform ${CHUNK_DURATION}ms cubic-bezier(0.22,1,0.36,1)`,
                                }}
                            >
                                {chunk}
                            </span>
                        ))}
                    </div>

                    {/* Line 2: "Built for the Future." — gradient, larger */}
                    <span
                        className="block text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight"
                        style={{
                            fontFamily: "Aquire, sans-serif",
                            background: "linear-gradient(90deg, #00f4ff 0%, #c800ff 55%, #ff0454 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            opacity:   visibleChunks > 2 ? 1 : 0,
                            transform: visibleChunks > 2 ? "translateY(0) skewY(0deg)" : "translateY(32px) skewY(1deg)",
                            transition: `opacity ${CHUNK_DURATION}ms cubic-bezier(0.22,1,0.36,1), transform ${CHUNK_DURATION}ms cubic-bezier(0.22,1,0.36,1)`,
                        }}
                    >
                        Built for the Future.
                    </span>
                </h2>

                {/* Subtext + CTA — slide up together */}
                <div
                    style={{
                        opacity:   subtextVisible ? 1 : 0,
                        transform: subtextVisible ? "translateY(0px)" : "translateY(24px)",
                        transition: "opacity 700ms cubic-bezier(0.22,1,0.36,1), transform 700ms cubic-bezier(0.22,1,0.36,1)",
                    }}
                >
                    <p className="mt-7 text-base sm:text-lg text-foreground/55 max-w-xl mx-auto leading-relaxed tracking-wide">
                        Affordable, modern websites for the internet of tomorrow.
                    </p>

                    {/* CTA */}
                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href="/#showcase"
                            className="relative group px-8 py-3.5
                                       text-sm font-bold tracking-[2.5px] uppercase text-primary
                                       transition-colors duration-200"
                            style={{ clipPath: "polygon(10px 0%,100% 0%,100% calc(100% - 10px),calc(100% - 10px) 100%,0% 100%,0% 10px)" }}
                        >
                            {/* Pulsing dot */}
                            <span className="absolute left-[-14px] top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-primary animate-pulse" />

                            {/* Hover fill */}
                            <span
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-250"
                                style={{ background: "linear-gradient(135deg, rgba(0,178,255,0.12), rgba(97,7,187,0.12))", clipPath: "inherit" }}
                            />

                            {/* Border */}
                            <span
                                className="absolute inset-0 border border-primary/40 group-hover:border-primary/85 transition-colors duration-250"
                                style={{ clipPath: "inherit" }}
                            />

                            {/* Corner ticks */}
                            <span className="absolute -top-px -left-px w-2.5 h-2.5 border-l-[1.5px] border-t-[1.5px] border-primary" />
                            <span className="absolute -bottom-px -right-px w-2.5 h-2.5 border-r-[1.5px] border-b-[1.5px] border-tertiary" />

                            <span className="relative z-10">See Our Work</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* ── Scroll indicator ── */}
            <div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
                style={{
                    opacity:   subtextVisible ? 1 : 0,
                    transition: "opacity 800ms ease 400ms",
                }}
                aria-hidden="true"
            >
                <span className="text-foreground/25 text-xs tracking-[3px] uppercase">Scroll</span>
                <div className="relative w-px h-10 overflow-hidden">
                    <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-transparent via-primary to-transparent animate-[scrollbar_2s_ease-in-out_infinite]" />
                </div>
            </div>

            {/* ── Bottom fade into next section ── */}
            <div
                className="absolute bottom-0 left-0 right-0 h-32 z-10 pointer-events-none"
                style={{ background: "linear-gradient(to bottom, transparent, var(--background))" }}
            />

            <style>{`
                .hero-grid {
                    background-image:
                        linear-gradient(rgba(0,178,255,0.07) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0,178,255,0.07) 1px, transparent 1px);
                    background-size: 60px 60px;
                    animation: gridDrift 20s linear infinite;
                }
                @keyframes gridDrift {
                    0%   { transform: translate(0, 0); }
                    100% { transform: translate(60px, 60px); }
                }
                @keyframes scrollbar {
                    0%   { transform: translateY(-100%); opacity: 0; }
                    30%  { opacity: 1; }
                    70%  { opacity: 1; }
                    100% { transform: translateY(100%); opacity: 0; }
                }
            `}</style>
        </section>
    );
}