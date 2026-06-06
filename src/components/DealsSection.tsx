"use client";

import { useEffect, useRef, useState } from "react";
import SectionLabel from "@/components/SectionLabel";

// ─── Tier data ────────────────────────────────────────────────────────────────

interface Tier {
    id: string;
    label: string;
    discount: string;
    description: string;
    slots: number | null;       // null = unlimited
    slotsLabel: string;
    accent: string;
    accentHex: string;
    icon: React.ReactNode;
    stackable?: boolean;
    stackNote?: string;
}

const TIERS: Tier[] = [
    {
        id: "founding",
        label: "Founding Client",
        discount: "25% OFF",
        description: "The first 3 clients to sign a project agreement lock in the biggest launch discount for being the first customers.",
        slots: 3,
        slotsLabel: "3 Spots",
        accent: "var(--primary)",
        accentHex: "#00b2ff",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>
        ),
    },
    {
        id: "early",
        label: "Early Adopter",
        discount: "15% OFF",
        description: "The 4th and 5th clients to sign a project agreement earn a meaningful discount for being one of the first few customers.",
        slots: 2,
        slotsLabel: "2 Spots",
        accent: "var(--secondary)",
        accentHex: "#7f09f6",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    },
    {
        id: "nonprofit",
        label: "Non-Profit",
        discount: "10% OFF",
        description: "Registered non-profit organizations qualify for a 10% discount regardless of if they are one fo the first 5 clients. This stacks with any other active discount and never expires.",
        slots: null,
        slotsLabel: "Always Available",
        accent: "var(--tertiary)",
        accentHex: "#e00447",
        stackable: true,
        stackNote: "Stacks with Founding & Early Adopter discounts",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
        ),
    },
];

// ─── Slot pip row ─────────────────────────────────────────────────────────────

function SlotPips({ count, accentHex }: { count: number; accentHex: string }) {
    return (
        <div className="flex items-center gap-1.5 mt-3">
            {Array.from({ length: count }).map((_, i) => (
                <span
                    key={i}
                    className="w-2 h-2 rounded-full transition-transform duration-300"
                    style={{ background: accentHex, boxShadow: `0 0 6px ${accentHex}99` }}
                />
            ))}
        </div>
    );
}

// ─── Individual tier card ─────────────────────────────────────────────────────

function TierCard({ tier, index, visible }: { tier: Tier; index: number; visible: boolean }) {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            className="relative flex flex-col"
            style={{
                opacity:   visible ? 1 : 0,
                transform: visible ? "translateY(0px)" : "translateY(32px)",
                transition: `opacity 600ms cubic-bezier(0.22,1,0.36,1) ${index * 120}ms, transform 600ms cubic-bezier(0.22,1,0.36,1) ${index * 120}ms`,
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Outer glow border */}
            <div
                className="relative flex flex-col h-full"
                style={{
                    clipPath: "polygon(0 0,100% 0,100% calc(100% - 18px),calc(100% - 18px) 100%,0 100%)",
                    padding: "1px",
                    background: hovered
                        ? `linear-gradient(135deg, ${tier.accentHex}80, ${tier.accentHex}18)`
                        : `linear-gradient(135deg, ${tier.accentHex}30, ${tier.accentHex}08)`,
                    transition: "background 350ms ease",
                }}
            >
                {/* Card body */}
                <div
                    className="relative flex flex-col h-full px-6 py-6"
                    style={{
                        clipPath: "inherit",
                        background: hovered
                            ? `linear-gradient(145deg, #0d0925, #12082e)`
                            : "linear-gradient(145deg, #0d0925, #0f0722)",
                        transition: "background 350ms ease",
                    }}
                >
                    {/* Corner accent — top-right */}
                    <span
                        className="absolute top-0 right-0 w-6 h-6 pointer-events-none"
                        style={{
                            background: `linear-gradient(225deg, ${tier.accentHex}60 0%, transparent 60%)`,
                        }}
                    />

                    {/* Icon + Label row */}
                    <div className="flex items-center gap-3 mb-4">
                        <span
                            className="flex items-center justify-center w-8 h-8 shrink-0"
                            style={{
                                color: tier.accentHex,
                                clipPath: "polygon(4px 0%,100% 0%,100% calc(100% - 4px),calc(100% - 4px) 100%,0% 100%,0% 4px)",
                                background: `${tier.accentHex}15`,
                            }}
                        >
                            {tier.icon}
                        </span>
                        <span
                            className="text-xs font-bold tracking-[2.5px] uppercase"
                            style={{ color: `${tier.accentHex}` }}
                        >
                            {tier.label}
                        </span>
                    </div>

                    {/* Discount headline */}
                    <div
                        className="text-3xl sm:text-4xl font-bold mb-1 tracking-tight"
                        style={{
                            fontFamily: "Aquire, sans-serif",
                            background: `linear-gradient(90deg, ${tier.accentHex} 0%, ${tier.accentHex}99 100%)`,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                        }}
                    >
                        {tier.discount}
                    </div>

                    {/* Slot indicator */}
                    {tier.slots !== null ? (
                        <>
                            <span className="text-xs tracking-[2px] uppercase mb-1" style={{ color: `${tier.accentHex}aa` }}>
                                {tier.slotsLabel}
                            </span>
                            <SlotPips count={tier.slots} accentHex={tier.accentHex} />
                        </>
                    ) : (
                        <span
                            className="inline-flex items-center gap-1.5 text-xs tracking-[2px] uppercase mb-1"
                            style={{ color: `${tier.accentHex}aa` }}
                        >
                            <span
                                className="inline-block w-1.5 h-1.5 rounded-full animate-pulse"
                                style={{ background: tier.accentHex }}
                            />
                            {tier.slotsLabel}
                        </span>
                    )}

                    {/* Divider */}
                    <div
                        className="my-5 h-px"
                        style={{ background: `linear-gradient(to right, ${tier.accentHex}30, transparent)` }}
                    />

                    {/* Description */}
                    <p className="text-sm text-foreground/55 leading-relaxed flex-1">
                        {tier.description}
                    </p>

                    {/* Stack badge */}
                    {tier.stackable && (
                        <div
                            className="mt-5 flex items-center gap-2 px-3 py-2 text-xs font-bold tracking-[1.5px] uppercase"
                            style={{
                                color: `${tier.accentHex}90`,
                                background: `${tier.accentHex}0f`,
                                clipPath: "polygon(4px 0%,100% 0%,100% calc(100% - 4px),calc(100% - 4px) 100%,0% 100%,0% 4px)",
                                border: `1px solid ${tier.accentHex}25`,
                            }}
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 shrink-0">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                            {tier.stackNote}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// ─── Holiday banner ───────────────────────────────────────────────────────────

function HolidayBanner({ visible }: { visible: boolean }) {
    return (
        <div
            className="relative overflow-hidden"
            style={{
                opacity:   visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 700ms cubic-bezier(0.22,1,0.36,1) 500ms, transform 700ms cubic-bezier(0.22,1,0.36,1) 500ms",
            }}
        >
            {/* Outer glow border */}
            <div
                className="relative"
                style={{
                    clipPath: "polygon(0 0,100% 0,100% calc(100% - 14px),calc(100% - 14px) 100%,0 100%)",
                    padding: "1px",
                    background: "linear-gradient(90deg, #00b2ff28, #7f09f628, #e0044728)",
                }}
            >
                <div
                    className="relative px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-4"
                    style={{
                        clipPath: "inherit",
                        background: "linear-gradient(135deg, #0d0925 0%, #100825 100%)",
                    }}
                >
                    {/* Scan-line shimmer */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
                        <div
                            className="absolute top-0 bottom-0 w-20"
                            style={{
                                background: "linear-gradient(90deg, transparent, rgba(0,178,255,0.04), transparent)",
                                animation: "dealsScan 5s ease-in-out infinite",
                            }}
                        />
                    </div>

                    {/* Icon */}
                    <div
                        className="shrink-0 flex items-center justify-center w-10 h-10"
                        style={{
                            clipPath: "polygon(5px 0%,100% 0%,100% calc(100% - 5px),calc(100% - 5px) 100%,0% 100%,0% 5px)",
                            background: "linear-gradient(135deg, #00b2ff18, #7f09f618)",
                        }}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="url(#holiday-grad)" strokeWidth="1.5" className="w-5 h-5">
                            <defs>
                                <linearGradient id="holiday-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#00f4ff" />
                                    <stop offset="50%" stopColor="#c800ff" />
                                    <stop offset="100%" stopColor="#ff0454" />
                                </linearGradient>
                            </defs>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
                        </svg>
                    </div>

                    <div className="flex-1">
                        <p className="text-xs font-bold tracking-[2.5px] uppercase text-foreground/40 mb-1">Seasonal Offers</p>
                        <p className="text-sm text-foreground/60 leading-relaxed">
                            Occasional holiday discounts may be available throughout the year.{" "}
                            Refer back to this page to see if a seasonal promotion is currently active. Any live deals will appear here.
                        </p>
                    </div>

                    {/* Right decoration: "no active deal" state */}
                    <div
                        className="shrink-0 flex items-center gap-2 px-4 py-2 text-xs font-bold tracking-[2px] uppercase text-foreground/25"
                        style={{
                            clipPath: "polygon(4px 0%,100% 0%,100% calc(100% - 4px),calc(100% - 4px) 100%,0% 100%,0% 4px)",
                            border: "1px solid rgba(255,255,255,0.06)",
                        }}
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-foreground/20" />
                        No active holiday deal
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Main section ─────────────────────────────────────────────────────────────

export default function DealsSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const [visible, setVisible] = useState(false);
    const triggered = useRef(false);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !triggered.current) {
                    triggered.current = true;
                    setVisible(true);
                }
            },
            { threshold: 0.1 }
        );
        observer.observe(section);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="deals"
            className="relative w-full py-20 sm:py-28 overflow-hidden"
        >
            {/* Ambient background glows */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <div className="absolute top-1/2 left-1/4 w-80 h-80 -translate-y-1/2 rounded-full opacity-[0.04]"
                     style={{ background: "radial-gradient(circle, #00b2ff 0%, transparent 70%)" }} />
                <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full opacity-[0.04]"
                     style={{ background: "radial-gradient(circle, #7f09f6 0%, transparent 70%)" }} />
                <div className="absolute bottom-1/4 left-1/2 w-56 h-56 rounded-full opacity-[0.03]"
                     style={{ background: "radial-gradient(circle, #e00447 0%, transparent 70%)" }} />
            </div>

            {/* Top separator line */}
            <div className="absolute top-0 left-0 right-0 h-px"
                 style={{ background: "linear-gradient(to right, transparent, rgba(0,178,255,0.2) 30%, rgba(127,9,246,0.2) 70%, transparent)" }} />

            <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

                {/* ── Header ── */}
                <div
                    style={{
                        opacity:   visible ? 1 : 0,
                        transform: visible ? "translateY(0)" : "translateY(20px)",
                        transition: "opacity 600ms cubic-bezier(0.22,1,0.36,1), transform 600ms cubic-bezier(0.22,1,0.36,1)",
                    }}
                >
                    <SectionLabel>Deals &amp; Discounts</SectionLabel>
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-3">
                        <h2
                            className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground"
                            style={{ fontFamily: "Aquire, sans-serif" }}
                        >
                            Deals
                        </h2>
                        <p className="text-sm text-foreground/40 max-w-xs text-right hidden sm:block">
                            Discounts applied automatically at signing.
                        </p>
                    </div>

                    {/* Underline */}
                    <div className="flex items-center gap-3 mb-12">
                        <div className="h-px w-10 bg-primary/50" />
                        <div className="h-px flex-1" style={{ background: "linear-gradient(to right, rgba(0,178,255,0.15), transparent)" }} />
                    </div>
                </div>

                {/* ── Tier cards ── */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
                    {TIERS.map((tier, i) => (
                        <TierCard key={tier.id} tier={tier} index={i} visible={visible} />
                    ))}
                </div>

                {/* ── Stacking callout ── */}
                <div
                    className="mb-8 flex items-start sm:items-center gap-3 px-5 py-4 text-sm text-foreground/50"
                    style={{
                        background: "linear-gradient(90deg, rgba(0,178,255,0.04), transparent)",
                        borderLeft: "2px solid rgba(0,178,255,0.25)",
                        opacity:   visible ? 1 : 0,
                        transform: visible ? "translateX(0)" : "translateX(-12px)",
                        transition: "opacity 600ms cubic-bezier(0.22,1,0.36,1) 400ms, transform 600ms cubic-bezier(0.22,1,0.36,1) 400ms",
                    }}
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 shrink-0 text-primary/60 mt-0.5 sm:mt-0">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                    </svg>
                    <span>
                        A qualifying non-profit signing within the first 5 client spots receives{" "}
                        <span className="text-primary/80 font-bold">both</span> discounts. For example, a non-profit founding client saves{" "}
                        <span className="font-bold text-foreground/70">35%</span> (25% + 10%). The non-profit discount has no expiration.
                    </span>
                </div>

                {/* ── Holiday banner ── */}
                <HolidayBanner visible={visible} />

                {/* ── CTA ── */}
                <div
                    className="mt-14 flex justify-center"
                    style={{
                        opacity:   visible ? 1 : 0,
                        transform: visible ? "translateY(0)" : "translateY(16px)",
                        transition: "opacity 700ms cubic-bezier(0.22,1,0.36,1) 600ms, transform 700ms cubic-bezier(0.22,1,0.36,1) 600ms",
                    }}
                >
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
                        <span className="relative z-10">Claim Your Discount</span>
                    </a>
                </div>
            </div>

            {/* Scanline animation keyframe */}
            <style>{`
                @keyframes dealsScan {
                    0%   { left: -10%; }
                    100% { left: 110%; }
                }
            `}</style>
        </section>
    );
}