import LogoLarge from "@/components/LogoLarge";
import Link from "next/link";

const NAV_LINKS = [
    { href: "/#about", label: "About" },
    { href: "/#showcase", label: "Showcase" },
    { href: "/#testimonials", label: "Testimonials" },
    { href: "/pricing", label: "Pricing" },
    { href: "/order", label: "Order" },
];

const SOCIAL_LINKS = [
    {
        href: "https://github.com/zytronium",
        label: "GitHub",
        icon: (
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.2 22 16.447 22 12.021 22 6.484 17.522 2 12 2z"/>
            </svg>
        ),
    },
    {
        href: "mailto:webworks@zytronium.dev",
        label: "Email",
        icon: (
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth="1.75" aria-hidden="true">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <polyline points="2,4 12,13 22,4"/>
            </svg>
        ),
    },
];

export default function Footer() {
    return (
        <footer className="mt-auto w-full">
            {/* Top accent bar */}
            <div
                className="h-px w-full"
                style={{ background: "linear-gradient(90deg, transparent 0%, var(--primary) 25%, var(--secondary) 55%, var(--tertiary) 80%, transparent 100%)" }}
            />

            <div
                className="w-full"
                style={{ background: "linear-gradient(180deg, #0d0925 0%, #130720 40%, #1a0520 100%)" }}
            >

                <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-10 pb-6">

                    {/* ── Main grid ── */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-10">

                        {/* Column 1 — Logo + tagline */}
                        <div className="sm:col-span-2 lg:col-span-1">
                            <div className="scale-[0.8] sm:scale-[0.6] origin-top-left -mb-2 sm:-mb-10">
                                <LogoLarge />
                            </div>
                            <p className="text-foreground/55 text-sm leading-relaxed max-w-xs">
                                Affordable modern websites built for the future of the internet.
                            </p>
                            {/* Social icons */}
                            <div className="flex items-center gap-3 mt-5">
                                {SOCIAL_LINKS.map(({ href, label, icon }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        aria-label={label}
                                        className="group relative flex items-center justify-center w-8 h-8
                                                   text-foreground/40 hover:text-primary
                                                   border border-primary/20 hover:border-primary/60
                                                   transition-all duration-200"
                                        style={{ clipPath: "polygon(4px 0%,100% 0%,100% calc(100% - 4px),calc(100% - 4px) 100%,0% 100%,0% 4px)" }}
                                    >
                                        <span
                                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                            style={{ background: "rgba(0,178,255,0.06)" }}
                                        />
                                        <span className="relative z-10">{icon}</span>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Column 2 — Navigation */}
                        <div>
                            <h3 className="text-xs font-bold tracking-[3px] uppercase text-primary/70 mb-4">
                                Navigation
                            </h3>
                            <ul className="space-y-2.5">
                                {NAV_LINKS.map(({ href, label }) => (
                                    <li key={href}>
                                        <Link
                                            href={href}
                                            className="group flex items-center gap-2 text-sm text-foreground/50 hover:text-foreground transition-colors duration-200"
                                        >
                                            <span className="w-3 h-px bg-primary/30 group-hover:w-5 group-hover:bg-primary transition-all duration-200" />
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 3 — Contact / CTA */}
                        <div>
                            <h3 className="text-xs font-bold tracking-[3px] uppercase text-primary/70 mb-4">
                                Get In Touch
                            </h3>
                            <p className="text-sm text-foreground/50 mb-4 leading-relaxed">
                                Ready to build something great? Let's talk about your project.
                            </p>
                            <a
                                href="mailto:webworks@zytronium.dev"
                                className="block text-sm text-foreground/60 hover:text-primary transition-colors duration-200 mb-5 break-all"
                            >
                                webworks@zytronium.dev
                            </a>

                            {/* CTA button */}
                            <a
                                href="/order"
                                className="relative group inline-flex items-center gap-2 px-5 py-2.5
                                           text-xs font-bold tracking-[2.5px] uppercase text-primary
                                           transition-colors duration-200"
                                style={{ clipPath: "polygon(8px 0%,100% 0%,100% calc(100% - 8px),calc(100% - 8px) 100%,0% 100%,0% 8px)" }}
                            >
                                {/* Pulsing dot */}
                                <span className="w-1 h-1 rounded-full bg-primary animate-pulse flex-shrink-0" />

                                {/* Hover fill */}
                                <span
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                    style={{ background: "linear-gradient(135deg, rgba(0,178,255,0.1), rgba(97,7,187,0.1))" }}
                                />

                                {/* Border */}
                                <span
                                    className="absolute inset-0 border border-primary/40 group-hover:border-primary/80 transition-colors duration-200"
                                    style={{ clipPath: "polygon(8px 0%,100% 0%,100% calc(100% - 8px),calc(100% - 8px) 100%,0% 100%,0% 8px)" }}
                                />

                                {/* Corner ticks */}
                                <span className="absolute -top-px -left-px w-2 h-2 border-l-[1.5px] border-t-[1.5px] border-primary" />
                                <span className="absolute -bottom-px -right-px w-2 h-2 border-r-[1.5px] border-b-[1.5px] border-tertiary" />

                                <span className="relative z-10">Start a Project</span>
                            </a>
                        </div>
                    </div>

                    {/* ── Bottom bar ── */}
                    <div
                        className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-3"
                        style={{ borderTop: "1px solid rgba(97,7,187,0.2)" }}
                    >
                        <p className="text-foreground/35 text-xs tracking-wide order-2 sm:order-1">
                            © {new Date().getFullYear()} Zytronium. All rights reserved.
                        </p>
                        <div className="flex items-center gap-1 order-1 sm:order-2">
                            <span className="w-1 h-1 rounded-full bg-primary/50 animate-pulse" />
                            <span className="text-foreground/30 text-xs tracking-widest uppercase ml-1">
                                Built for the future
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}