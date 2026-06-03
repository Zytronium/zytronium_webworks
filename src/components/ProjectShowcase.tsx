"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Project {
    id: string;
    title: string;
    category: string;
    description: string;
    tags: string[];
    accent: string;       // CSS color used for glow / border accents
    accentVar: string;    // CSS variable name (for inline style access)
    featured: boolean;
    href: string;
    screenshot?: string;
    gradient: string;
}

// ─── Placeholder project data ─────────────────────────────────────────────────
// Replace `gradient` with a real <img> src when you have screenshots.

const PROJECTS: Project[] = [
    {
        id: "stellicast",
        title: "Stellicast",
        category: "Personal Project",
        description: "A YouTube-like video sharing platform that doesn't invade user privacy, sell user data, bombard users with too many ads, or block users with a VPN or ad-blocker.",
        tags: ["Next.js", "React", "TailwindCSS", "TypeScript", "JavaScript", "Supabase"],
        accent: "#00b2ff",
        accentVar: "--primary",
        featured: true,
        href: "https://stellicast.com/",
        gradient: "linear-gradient(135deg, #001a2e 0%, #003355 40%, #00b2ff22 100%)",
        screenshot: "/images/projects/stellicast.webp"
    },
    {
        id: "luminous",
        title: "Luminous",
        category: "Personal Project",
        description: "An online chat app for students and graduates of Atlas School. Built-in cross-platform messaging between the Luminous client and a Discord server.",
        tags: ["Next.js", "React", "TailwindCSS", "TypeScript", "Electron", "Python"],
        accent: "#09e1ba",
        accentVar: "--primary",
        featured: true,
        href: "https://lmns.vercel.app",
        screenshot: "/images/projects/luminous.webp",
        gradient: "linear-gradient(135deg, #001a1a 0%, #003333 40%, #09e1ba22 100%)",
    },
    {
        id: "star-trek-battle-engine",
        title: "Star Trek Battle Engine",
        category: "Personal Project",
        description: "A Star Trek inspired battle simulator with a web interface, smart CPU opponents, multiplayer battles, and live spectating.",
        tags: ["HTML", "Express.js", "Node.js", "SQL", "WebSockets"],
        accent: "#078bff",
        accentVar: "--primary",
        featured: true,
        href: "https://startrekbattlesim.zytronium.dev/",
        screenshot: "/images/projects/star-trek-battle-engine.webp",
        gradient: "linear-gradient(135deg, #001120 0%, #002240 40%, #0088ff22 100%)",
    },
    {
        id: "satire-dev-blog",
        title: "Satire Developer Blog",
        category: "Personal Project",
        description: "console.blog(\"Personal satire dev blog with a futuristic theme and a lot of totally good advice, like how to fix bugs with duct tape.\");",
        tags: ["Next.js", "Resend", "Framer Motion"],
        accent: "#7f09f6",
        accentVar: "--secondary",
        featured: false,
        href: "https://satire.zytronium.dev/",
        screenshot: "/images/projects/satire_dev_blog.webp",
        gradient: "linear-gradient(135deg, #0e0518 0%, #200a35 40%, #7f09f622 100%)",
    },
    {
        id: "tgd-remaster",
        title: "Tulsa Glue Dobbers Remaster",
        category: "Concept Project",
        description: "A modern, revamped website concept of the Tulsa Glue Dobbers RC flight club's website.",
        tags: ["Next.js", "React", "TailwindCSS", "JavaScript"],
        accent: "#8be2ff",
        accentVar: "--primary",
        featured: false,
        href: "https://tulsagluedobbers-remaster.zytronium.dev/",
        screenshot: "/images/projects/tgd-remaster.webp",
        gradient: "linear-gradient(135deg, #001a2e 0%, #003855 40%, #6ddbff18 100%)",
    },
    {
        id: "oktia-website",
        title: "OKTIA Website Prototype",
        category: "Client Project",
        description: "An early WIP prototype of the Oklahoma Technology and Innovation Association's website. Not in production yet.",
        tags: ["Next.js", "React", "TailwindCSS", "TypeScript"],
        accent: "#28b240",
        accentVar: "--tertiary",
        featured: false,
        href: "https://www.oktia.org/",
        gradient: "linear-gradient(135deg, #001a0a 0%, #003320 40%, #28b24018 100%)",
    },
];

const FEATURED = PROJECTS.filter((p) => p.featured);
const ALL      = PROJECTS;

// ─── Glitch Carousel ──────────────────────────────────────────────────────────

function GlitchCarousel() {
    const [current, setCurrent]     = useState(0);
    const [next,    setNext]        = useState<number | null>(null);
    const [glitching, setGlitching] = useState(false);
    const autoTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const goTo = useCallback((target: number) => {
        if (glitching || target === current) return;
        setGlitching(true);
        setNext(target);

        // After glitch completes, swap to new slide
        setTimeout(() => {
            setCurrent(target);
            setNext(null);
            setGlitching(false);
        }, 600);
    }, [glitching, current]);

    const advance = useCallback(() => {
        goTo((current + 1) % FEATURED.length);
    }, [current, goTo]);

    // Auto-advance
    useEffect(() => {
        autoTimer.current = setTimeout(advance, 5000);
        return () => { if (autoTimer.current) clearTimeout(autoTimer.current); };
    }, [advance]);

    const project = FEATURED[current];
    const nextProject = next !== null ? FEATURED[next] : null;

    return (
        <div className="relative w-full">
            {/* Main card */}
            <div
                className="relative overflow-hidden w-full"
                style={{
                    minHeight: "420px",
                    clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 32px), calc(100% - 32px) 100%, 0 100%)",
                    border: `1px solid ${project.accent}30`,
                }}
            >
                {/* Background gradient / screenshot placeholder */}
                <div
                    className="absolute inset-0 transition-none"
                    style={{
                        background: project.screenshot
                            ? `url(${project.screenshot}) center/cover no-repeat`
                            : project.gradient
                    }}
                />
                {/* Dark gradient overlay for text readability */}
                {project.screenshot && (
                    <div
                        className="absolute inset-0 transition-none"
                        style={{
                            background: "linear-gradient(to top, rgba(0,0,0,0.7) 10%, rgba(0,0,0,0.4) 50%, transparent 80%)"
                        }}
                    />
                )}

                {/* Glitch layers — only rendered during transition */}
                {glitching && nextProject && (
                    <>
                        {/* RGB channel splits */}
                        <div className="absolute inset-0 pointer-events-none glitch-r"
                             style={{
                                 background: nextProject.screenshot
                                     ? `url(${nextProject.screenshot}) center/cover no-repeat`
                                     : nextProject.gradient,
                                 mixBlendMode: "screen",
                                 opacity: 0.7
                             }}/>
                        <div className="absolute inset-0 pointer-events-none glitch-g"
                             style={{
                                 background: nextProject.screenshot
                                     ? `url(${nextProject.screenshot}) center/cover no-repeat`
                                     : nextProject.gradient,
                                 mixBlendMode: "screen",
                                 opacity: 0.7
                             }}/>
                        <div className="absolute inset-0 pointer-events-none glitch-b"
                             style={{
                                 background: nextProject.screenshot
                                     ? `url(${nextProject.screenshot}) center/cover no-repeat`
                                     : nextProject.gradient,
                                 mixBlendMode: "screen",
                                 opacity: 0.7
                             }}/>
                        {/* Horizontal scan tears */}
                        <div className="absolute inset-0 pointer-events-none glitch-tears" />
                        {/* Static noise overlay */}
                        <div className="absolute inset-0 pointer-events-none glitch-noise" />
                    </>
                )}

                {/* Scanline overlay — always present, subtle */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px)" }}
                />

                {/* Glow corner accent */}
                <div
                    className="absolute top-0 right-0 w-48 h-48 pointer-events-none"
                    style={{ background: `radial-gradient(circle at top right, ${project.accent}20, transparent 70%)` }}
                />

                {/* Content */}
                <div className={`relative z-10 flex flex-col justify-end h-full p-6 sm:p-10 ${glitching ? "glitch-content" : ""}`}
                     style={{ minHeight: "420px" }}>

                    {/* Category pill */}
                    <div className="mb-3 flex items-center gap-2">
                        <span
                            className="px-3 py-0.5 text-xs font-bold tracking-[2.5px] uppercase"
                            style={{
                                color: project.accent,
                                border: `1px solid ${project.accent}50`,
                                clipPath: "polygon(4px 0%,100% 0%,100% calc(100% - 4px),calc(100% - 4px) 100%,0% 100%,0% 4px)",
                            }}
                        >
                            {project.category}
                        </span>
                    </div>

                    <h3
                        className="text-3xl sm:text-4xl font-bold tracking-tight mb-3 text-foreground"
                        style={{ fontFamily: "Aquire, sans-serif" }}
                    >
                        {project.title}
                    </h3>

                    <p className="text-sm sm:text-base text-foreground/80 max-w-xl mb-5 leading-relaxed">
                        {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-2.5 py-0.5 text-xs text-foreground/50 border border-foreground/10"
                                style={{ clipPath: "polygon(3px 0%,100% 0%,100% calc(100% - 3px),calc(100% - 3px) 100%,0% 100%,0% 3px)" }}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* CTA */}
                    <a
                        href={project.href}
                        className="self-start relative group flex items-center gap-2 px-6 py-2.5 text-xs font-bold tracking-[2.5px] uppercase transition-colors duration-200"
                        style={{
                            color: project.accent,
                            clipPath: "polygon(8px 0%,100% 0%,100% calc(100% - 8px),calc(100% - 8px) 100%,0% 100%,0% 8px)",
                        }}
                    >
                        <span className="w-1 h-1 rounded-full animate-pulse flex-shrink-0"
                              style={{ background: project.accent }} />
                        <span
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                            style={{ background: `${project.accent}12`, clipPath: "inherit" }}
                        />
                        <span
                            className="absolute inset-0 border transition-colors duration-200"
                            style={{
                                borderColor: `${project.accent}45`,
                                clipPath: "inherit",
                            }}
                        />
                        <span className="absolute -top-px -left-px w-2 h-2 border-l-[1.5px] border-t-[1.5px]"
                              style={{ borderColor: project.accent }} />
                        <span className="absolute -bottom-px -right-px w-2 h-2 border-r-[1.5px] border-b-[1.5px]"
                              style={{ borderColor: project.accent }} />
                        <span className="relative z-10">View Project</span>
                    </a>
                </div>

                {/* Bottom accent line */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-px"
                    style={{ background: `linear-gradient(90deg, transparent, ${project.accent}80, transparent)` }}
                />
            </div>

            {/* ── Controls ── */}
            <div className="flex items-center justify-between mt-4">
                {/* Dot indicators */}
                <div className="flex items-center gap-2">
                    {FEATURED.map((p, i) => (
                        <button
                            key={p.id}
                            aria-label={`Go to ${p.title}`}
                            onClick={() => goTo(i)}
                            className="relative h-px transition-all duration-300 overflow-hidden"
                            style={{ width: i === current ? "32px" : "16px" }}
                        >
                            <span
                                className="absolute inset-0"
                                style={{ background: i === current ? project.accent : `${project.accent}30` }}
                            />
                            {i === current && (
                                <span
                                    className="absolute inset-0 carousel-progress"
                                    style={{ background: `${project.accent}60` }}
                                />
                            )}
                        </button>
                    ))}
                </div>

                {/* Prev / Next */}
                <div className="flex items-center gap-2">
                    {[
                        { dir: -1, label: "Previous" },
                        { dir:  1, label: "Next" },
                    ].map(({ dir, label }) => (
                        <button
                            key={label}
                            aria-label={label}
                            onClick={() => goTo((current + dir + FEATURED.length) % FEATURED.length)}
                            className="group flex items-center justify-center w-8 h-8 border border-foreground/15 hover:border-primary/60 text-foreground/40 hover:text-primary transition-all duration-200"
                            style={{ clipPath: "polygon(4px 0%,100% 0%,100% calc(100% - 4px),calc(100% - 4px) 100%,0% 100%,0% 4px)" }}
                        >
                            <svg viewBox="0 0 12 12" className="w-3 h-3 fill-none stroke-current" strokeWidth="1.5">
                                {dir === -1
                                    ? <polyline points="8,2 4,6 8,10" />
                                    : <polyline points="4,2 8,6 4,10" />
                                }
                            </svg>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ─── Project Grid Card ────────────────────────────────────────────────────────

function ProjectCard({ project, index }: { project: Project; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
            { threshold: 0.15 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className="group relative overflow-hidden flex flex-col"
            style={{
                clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)",
                border: `1px solid ${project.accent}25`,
                background: project.gradient,
                opacity:   visible ? 1 : 0,
                transform: visible ? "translateY(0px)" : "translateY(30px)",
                transition: `opacity 600ms cubic-bezier(0.22,1,0.36,1) ${index * 80}ms, transform 600ms cubic-bezier(0.22,1,0.36,1) ${index * 80}ms`,
            }}
        >
            {/* Hover glow */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: `radial-gradient(circle at 50% 0%, ${project.accent}15, transparent 70%)` }}
            />

            {/* Scanlines */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px)" }}
            />

            <div className="relative z-10 flex flex-col flex-1 p-5 sm:p-6">
                {/* Category + featured badge */}
                <div className="flex items-center justify-between mb-3">
                    <span
                        className="px-2.5 py-0.5 text-xs font-bold tracking-[2px] uppercase"
                        style={{
                            color: project.accent,
                            border: `1px solid ${project.accent}45`,
                            clipPath: "polygon(3px 0%,100% 0%,100% calc(100% - 3px),calc(100% - 3px) 100%,0% 100%,0% 3px)",
                        }}
                    >
                        {project.category}
                    </span>
                </div>

                <h4
                    className="text-lg sm:text-xl font-bold tracking-tight text-foreground mb-2 group-hover:text-white transition-colors duration-200"
                    style={{ fontFamily: "Aquire, sans-serif" }}
                >
                    {project.title}
                </h4>

                <p className="text-sm text-foreground/50 leading-relaxed mb-4 flex-1">
                    {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-2 py-0.5 text-xs text-foreground/40 border border-foreground/10"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Link */}
                <a
                    href={project.href}
                    className="self-start flex items-center gap-1.5 text-xs font-bold tracking-[2px] uppercase transition-colors duration-200"
                    style={{ color: `${project.accent}80` }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = project.accent)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = `${project.accent}80`)}
                >
                    View Project
                    <svg viewBox="0 0 12 12" className="w-3 h-3 fill-none stroke-current" strokeWidth="1.5">
                        <polyline points="2,6 10,6 7,3 10,6 7,9" />
                    </svg>
                </a>
            </div>

            {/* Bottom accent */}
            <div
                className="h-px w-0 group-hover:w-full transition-all duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${project.accent}80, transparent)` }}
            />
        </div>
    );
}

// ─── Section header ───────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex items-center gap-3 mb-2">
            <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-bold tracking-[3px] uppercase text-primary/60">{children}</span>
            <div className="flex-1 h-px bg-gradient-to-r from-primary/20 to-transparent" />
        </div>
    );
}

// ─── Main Showcase Section ────────────────────────────────────────────────────

export default function ProjectShowcase() {
    return (
        <section
            id="showcase"
            className="relative w-full py-20 sm:py-28 overflow-hidden"
        >
            {/* Background treatment */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <div style={{ background: "radial-gradient(ellipse 60% 40% at 80% 20%, rgba(127,9,246,0.06), transparent)" }} className="absolute inset-0" />
                <div style={{ background: "radial-gradient(ellipse 50% 40% at 20% 80%, rgba(0,178,255,0.05), transparent)" }} className="absolute inset-0" />
                <div
                    className="absolute inset-0 opacity-30"
                    style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(0,178,255,0.012) 40px, rgba(0,178,255,0.012) 41px), repeating-linear-gradient(90deg, transparent, transparent 80px, rgba(0,178,255,0.008) 80px, rgba(0,178,255,0.008) 81px)" }}
                />
            </div>

            <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

                {/* ── Section heading ── */}
                <div className="mb-12">
                    <SectionLabel>Portfolio</SectionLabel>
                    <h2
                        className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground"
                        style={{ fontFamily: "Aquire, sans-serif" }}
                    >
                        Portfolio
                    </h2>
                    <p className="mt-3 text-foreground/50 text-sm sm:text-base max-w-xl">
                        A showcase of past work, featuring a wide range of projects.
                    </p>
                </div>

                {/* ── Carousel + sidebar layout ── */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
                    {/* Carousel — takes 2/3 width on desktop */}
                    <div className="lg:col-span-2">
                        <SectionLabel>Featured</SectionLabel>
                        <GlitchCarousel />
                    </div>

                    {/* Sidebar: quick-links to all featured on desktop */}
                    <div className="hidden lg:flex flex-col gap-3 pt-6">
                        {FEATURED.map((p, i) => (
                            <div
                                key={p.id}
                                className="group flex flex-col gap-1 px-4 py-3 border border-foreground/8 hover:border-opacity-40 cursor-pointer transition-all duration-200"
                                style={{
                                    clipPath: "polygon(0 0,100% 0,100% calc(100% - 10px),calc(100% - 10px) 100%,0 100%)",
                                    borderColor: `${p.accent}15`,
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${p.accent}45`)}
                                onMouseLeave={(e) => (e.currentTarget.style.borderColor = `${p.accent}15`)}
                            >
                                <span
                                    className="text-xs font-bold tracking-[2px] uppercase"
                                    style={{ color: `${p.accent}70` }}
                                >
                                    {p.category}
                                </span>
                                <span
                                    className="text-sm font-bold text-foreground/70 group-hover:text-foreground transition-colors duration-200"
                                    style={{ fontFamily: "Aquire, sans-serif" }}
                                >
                                    {p.title}
                                </span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                    {p.tags.map((t) => (
                                        <span key={t} className="text-xs text-foreground/30">{t}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Divider ── */}
                <div className="flex items-center gap-4 mb-10">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />
                    <span className="text-xs tracking-[3px] uppercase text-foreground/25">More Projects</span>
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />
                </div>

                {/* ── Project grid ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {ALL.map((project, i) => (
                        <ProjectCard key={project.id} project={project} index={i} />
                    ))}
                </div>

                {/* ── Bottom CTA ── */}
                <div className="mt-14 flex justify-center">
                    <a
                        href="/order"
                        className="relative group flex items-center gap-2 px-8 py-3.5 text-sm font-bold tracking-[2.5px] uppercase text-primary transition-colors duration-200"
                        style={{ clipPath: "polygon(10px 0%,100% 0%,100% calc(100% - 10px),calc(100% - 10px) 100%,0% 100%,0% 10px)" }}
                    >
                        <span className="absolute left-[-14px] top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-primary animate-pulse" />
                        <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                              style={{ background: "linear-gradient(135deg, rgba(0,178,255,0.1), rgba(97,7,187,0.1))", clipPath: "inherit" }} />
                        <span className="absolute inset-0 border border-primary/40 group-hover:border-primary/80 transition-colors duration-200"
                              style={{ clipPath: "inherit" }} />
                        <span className="absolute -top-px -left-px w-2.5 h-2.5 border-l-[1.5px] border-t-[1.5px] border-primary" />
                        <span className="absolute -bottom-px -right-px w-2.5 h-2.5 border-r-[1.5px] border-b-[1.5px] border-tertiary" />
                        <span className="relative z-10">Start Your Project</span>
                    </a>
                </div>
            </div>

            {/* ── Glitch keyframes ── */}
            <style>{`
                @keyframes glitch-r {
                    0%   { transform: translate(0); opacity: 0; }
                    10%  { transform: translate(-4px, 1px); opacity: 0.8; clip-path: inset(20% 0 60% 0); }
                    20%  { transform: translate(3px, -2px); opacity: 0.6; clip-path: inset(55% 0 10% 0); }
                    30%  { transform: translate(-2px, 0); opacity: 0.9; clip-path: inset(5% 0 80% 0); }
                    45%  { transform: translate(4px, 1px); opacity: 0.5; clip-path: inset(70% 0 5% 0); }
                    60%  { transform: translate(0, -1px); opacity: 0.7; clip-path: inset(30% 0 40% 0); }
                    80%  { transform: translate(-3px, 2px); opacity: 0.4; clip-path: inset(10% 0 70% 0); }
                    100% { transform: translate(0); opacity: 0; }
                }
                @keyframes glitch-g {
                    0%   { transform: translate(0); opacity: 0; }
                    10%  { transform: translate(3px, -1px); opacity: 0.7; clip-path: inset(60% 0 15% 0); }
                    25%  { transform: translate(-3px, 2px); opacity: 0.8; clip-path: inset(10% 0 55% 0); }
                    40%  { transform: translate(2px, 0); opacity: 0.5; clip-path: inset(80% 0 5% 0); }
                    55%  { transform: translate(-4px, -1px); opacity: 0.9; clip-path: inset(25% 0 45% 0); }
                    75%  { transform: translate(1px, 2px); opacity: 0.6; clip-path: inset(50% 0 25% 0); }
                    100% { transform: translate(0); opacity: 0; }
                }
                @keyframes glitch-b {
                    0%   { transform: translate(0); opacity: 0; }
                    15%  { transform: translate(2px, 2px); opacity: 0.8; clip-path: inset(40% 0 30% 0); }
                    30%  { transform: translate(-4px, -1px); opacity: 0.6; clip-path: inset(75% 0 8% 0); }
                    50%  { transform: translate(3px, 1px); opacity: 0.9; clip-path: inset(15% 0 60% 0); }
                    65%  { transform: translate(-1px, -2px); opacity: 0.4; clip-path: inset(85% 0 2% 0); }
                    85%  { transform: translate(2px, 0); opacity: 0.7; clip-path: inset(35% 0 35% 0); }
                    100% { transform: translate(0); opacity: 0; }
                }
                @keyframes glitch-tears {
                    0%, 100% { opacity: 0; }
                    8%  { opacity: 1; background: repeating-linear-gradient(0deg, transparent 0px, transparent 18px, rgba(0,178,255,0.15) 18px, rgba(0,178,255,0.15) 20px, transparent 20px, transparent 60px, rgba(200,0,255,0.12) 60px, rgba(200,0,255,0.12) 61px); }
                    18% { opacity: 1; background: repeating-linear-gradient(0deg, transparent 0px, transparent 40px, rgba(224,4,71,0.12) 40px, rgba(224,4,71,0.12) 42px, transparent 42px, transparent 90px, rgba(0,178,255,0.10) 90px, rgba(0,178,255,0.10) 91px); }
                    30% { opacity: 1; background: repeating-linear-gradient(0deg, transparent 0px, transparent 5px,  rgba(0,178,255,0.20) 5px,  rgba(0,178,255,0.20) 6px); }
                    50% { opacity: 0.5; background: repeating-linear-gradient(0deg, transparent 0px, transparent 28px, rgba(127,9,246,0.15) 28px, rgba(127,9,246,0.15) 29px); }
                    70% { opacity: 0; }
                }
                @keyframes glitch-noise {
                    0%, 100% { opacity: 0; }
                    5%  { opacity: 0.08; background-position: 0 0; }
                    10% { opacity: 0.12; background-position: -5px 3px; }
                    20% { opacity: 0.06; background-position: 4px -2px; }
                    35% { opacity: 0.10; background-position: -3px 5px; }
                    50% { opacity: 0.04; background-position: 2px -4px; }
                    65% { opacity: 0.08; background-position: -4px 1px; }
                    80% { opacity: 0.03; background-position: 3px 3px; }
                }
                .glitch-r    { animation: glitch-r    0.6s steps(1) forwards; filter: hue-rotate(0deg); }
                .glitch-g    { animation: glitch-g    0.6s steps(1) forwards; filter: hue-rotate(120deg); }
                .glitch-b    { animation: glitch-b    0.6s steps(1) forwards; filter: hue-rotate(240deg); }
                .glitch-tears { animation: glitch-tears 0.6s steps(1) forwards; }
                .glitch-noise {
                    animation: glitch-noise 0.6s steps(1) forwards;
                    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
                    background-size: 150px 150px;
                    mix-blend-mode: overlay;
                }
                .glitch-content {
                    animation: glitch-content-shake 0.6s steps(2) forwards;
                }
                @keyframes glitch-content-shake {
                    0%   { transform: translate(0); }
                    15%  { transform: translate(-3px, 1px); }
                    30%  { transform: translate(2px, -1px); }
                    45%  { transform: translate(-1px, 2px); }
                    60%  { transform: translate(3px, 0); }
                    75%  { transform: translate(-2px, -1px); }
                    90%  { transform: translate(1px, 1px); }
                    100% { transform: translate(0); }
                }
                @keyframes carousel-progress {
                    from { transform: scaleX(0); transform-origin: left; }
                    to   { transform: scaleX(1); transform-origin: left; }
                }
                .carousel-progress {
                    animation: carousel-progress 5s linear forwards;
                }
            `}</style>
        </section>
    );
}