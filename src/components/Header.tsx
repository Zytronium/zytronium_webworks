 "use client";

import LogoLarge from "@/components/LogoLarge";
import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
    { href: "/#about", label: "About" },
    { href: "/#showcase", label: "Showcase" },
    { href: "/#testimonials", label: "Testimonials" },
    { href: "/pricing", label: "Pricing" },
];

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full">
            {/* Main bar */}
            <div className="flex flex-row">
                <LogoLarge />

                {/* Nav bar - desktop only */}
                <div
                    className="relative hidden sm:flex flex-1 h-24 items-center justify-end px-8 gap-1 overflow-hidden"
                    style={{ background: "linear-gradient(90deg, #0d0925 0%, #1a0a3a 50%, #2a0520 100%)" }}
                >
                    {/* Scanline shimmer */}
                    <div className="pointer-events-none absolute top-0 h-px w-[60%] bg-linear-to-r from-transparent via-primary/30 to-transparent animate-[scan_6s_linear_infinite]" />

                    {/* Subtle horizontal grid lines */}
                    <div
                        className="pointer-events-none absolute inset-0"
                        style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 6px, rgba(0,178,255,0.012) 6px, rgba(0,178,255,0.012) 7px)" }}
                    />

                    {/* Top edge line */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/15 to-transparent" />

                    {/* Bottom accent line */}
                    <div
                        className="absolute bottom-0 left-0 right-0 h-px opacity-50"
                        style={{ background: "linear-gradient(90deg, transparent 0%, var(--primary) 30%, var(--secondary) 60%, var(--tertiary) 85%, transparent 100%)" }}
                    />

                    {/* Nav links */}
                    {NAV_LINKS.map(({ href, label }, i) => (
                        <div key={href} className="flex items-center">
                            {i > 0 && <span className="w-px h-3.5 bg-secondary/30 mx-1" />}
                            <Link
                                href={href}
                                className="relative group px-3 py-2 text-md font-semibold tracking-[2px] uppercase text-foreground/50 hover:text-foreground transition-colors duration-200">
                                {label}
                                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-px bg-linear-to-r from-transparent via-primary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                            </Link>
                        </div>
                    ))}

                    {/* CTA - clipped-corner button */}
                    <a
                        href="/order"
                        className="relative group ml-4 px-5 py-2.5 text-md font-bold tracking-[2.5px] uppercase text-primary transition-colors duration-200"
                        style={{ clipPath: "polygon(8px 0%,100% 0%,100% calc(100% - 8px),calc(100% - 8px) 100%,0% 100%,0% 8px)" }}
                    >
                        <span className="absolute left-[-13px] top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-primary animate-pulse" />
                        <span
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-250"
                            style={{
                                background: "linear-gradient(135deg, rgba(0,178,255,0.1), rgba(97,7,187,0.1))",
                                clipPath: "inherit",
                            }}
                        />
                        <span
                            className="absolute inset-0 border border-primary/40 group-hover:border-primary/85 transition-colors duration-250"
                            style={{ clipPath: "inherit" }}
                        />
                        <span className="absolute -top-px -left-px w-2 h-2 border-l-[1.5px] border-t-[1.5px] border-primary" />
                        <span className="absolute -bottom-px -right-px w-2 h-2 border-r-[1.5px] border-b-[1.5px] border-tertiary" />
                        <span className="relative z-10">Order</span>
                    </a>
                </div>

                {/* Hamburger button - mobile only, sits beside the logo */}
                <button
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen((v) => !v)}
                    className="sm:hidden flex-1 flex items-center justify-end px-5 text-foreground/70 hover:text-foreground transition-colors"
                    style={{ background: "linear-gradient(90deg, #0d0925 0%, #1a0a3a 50%, #2a0520 100%)" }}
                >
                    {/* Animated hamburger → X */}
                    <span className="relative w-6 h-5 flex flex-col justify-between">
                        <span
                            className={`block h-px bg-current transition-all duration-300 origin-center
                                        ${menuOpen ? "rotate-45 translate-y-[10px]" : ""}`}
                        />
                        <span
                            className={`block h-px bg-current transition-all duration-300
                                        ${menuOpen ? "opacity-0 scale-x-0" : ""}`}
                        />
                        <span
                            className={`block h-px bg-current transition-all duration-300 origin-center
                                        ${menuOpen ? "-rotate-45 -translate-y-[10px]" : ""}`}
                        />
                    </span>
                </button>
            </div>

            {/* ── Mobile dropdown menu ── */}
            <div
                className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out
                            ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
                style={{ background: "linear-gradient(180deg, #1a0a3a 0%, #2a0520 100%)" }}
            >
                {/* Bottom accent line at top of dropdown */}
                <div
                    className="h-px opacity-60"
                    style={{ background: "linear-gradient(90deg, transparent 0%, var(--primary) 30%, var(--secondary) 60%, var(--tertiary) 85%, transparent 100%)" }}
                />

                <nav className="flex flex-col py-2">
                    {NAV_LINKS.map(({ href, label }) => (
                        <Link
                            key={href}
                            href={href}
                            onClick={() => setMenuOpen(false)}
                            className="px-6 py-3.5 text-sm font-semibold tracking-[2px] uppercase text-foreground/50 hover:text-foreground hover:bg-primary/5 border-b border-primary/10 last:border-b-0 transition-colors duration-150"
                        >
                            {label}
                        </Link>
                    ))}

                    {/* CTA in mobile menu */}
                    <a
                        href="/order"
                        onClick={() => setMenuOpen(false)}
                        className="mx-6 my-3 px-5 py-2.5 flex items-center justify-center gap-2 text-sm font-bold tracking-[2.5px] uppercase text-primary border border-primary/40 hover:border-primary/85 hover:bg-primary/5 transition-colors duration-200"
                        style={{ clipPath: "polygon(8px 0%,100% 0%,100% calc(100% - 8px),calc(100% - 8px) 100%,0% 100%,0% 8px)" }}
                    >
                        <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                        Order
                    </a>
                </nav>

                {/* Bottom accent line */}
                <div
                    className="h-px opacity-60"
                    style={{ background: "linear-gradient(90deg, transparent 0%, var(--tertiary) 15%, var(--secondary) 40%, var(--primary) 70%, transparent 100%)" }}
                />
            </div>
        </header>
    );
}