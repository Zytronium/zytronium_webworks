import LogoLarge from "@/components/LogoLarge";
import Link from "next/link";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full flex flex-row">
            <LogoLarge/>

            {/* Nav bar */}
            <div className="relative flex-1 h-24 flex items-center justify-end px-8 gap-1 overflow-hidden"
                 style={{background: "linear-gradient(90deg, #0d0925 0%, #1a0a3a 50%, #2a0520 100%)"}}>

                {/* Scanline shimmer */}
                <div className="pointer-events-none absolute top-0 h-px w-[60%]
                                bg-linear-to-r from-transparent via-primary/30 to-transparent
                                animate-[scan_6s_linear_infinite]"/>

                {/* Subtle horizontal grid lines */}
                <div className="pointer-events-none absolute inset-0"
                     style={{background: "repeating-linear-gradient(0deg, transparent, transparent 6px, rgba(0,178,255,0.012) 6px, rgba(0,178,255,0.012) 7px)"}}/>

                {/* Top edge line */}
                <div className="absolute top-0 left-0 right-0 h-px
                                bg-linear-to-r from-transparent via-primary/15 to-transparent"/>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-px opacity-50"
                     style={{background: "linear-gradient(90deg, transparent 0%, var(--primary) 30%, var(--secondary) 60%, var(--tertiary) 85%, transparent 100%)"}}/>

                {/* Nav links */}
                {[
                    {href: "/#about", label: "About"},
                    {href: "/#showcase", label: "Showcase"},
                    {href: "/#testimonials", label: "Testimonials"},
                    {href: "/#faq", label: "FAQ"},
                ].map(({href, label}, i) => (
                    <div key={href} className="flex items-center">
                        {i > 0 && (
                            <span className="w-px h-3.5 bg-secondary/30 mx-1"/>
                        )}
                        <Link
                            href={href}
                            className="relative group px-3 py-2
                                       text-md font-semibold tracking-[2px] uppercase
                                       text-foreground/50 hover:text-foreground
                                       transition-colors duration-200"
                        >
                            {label}
                            {/* Underline reveal */}
                            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-px
                                             bg-linear-to-r from-transparent via-primary to-transparent
                                             scale-x-0 group-hover:scale-x-100
                                             transition-transform duration-300 ease-out"/>
                        </Link>
                    </div>
                ))}

                {/* CTA - clipped-corner button */}
                <a
                    href="/order"
                    className="relative group ml-4 px-5 py-2.5
                text-md font-bold tracking-[2.5px] uppercase text-primary
                transition-colors duration-200"
                    style={{clipPath: "polygon(8px 0%,100% 0%,100% calc(100% - 8px),calc(100% - 8px) 100%,0% 100%,0% 8px)"}}
                >
                    {/* Pulsing left dot */}
                    <span className="absolute left-[-13px] top-1/2 -translate-y-1/2
                                     w-1 h-1 rounded-full bg-primary animate-pulse"/>

                    {/* Fill on hover */}
                    <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-250"
                          style={{
                              background: "linear-gradient(135deg, rgba(0,178,255,0.1), rgba(97,7,187,0.1))",
                              clipPath: "inherit"
                          }}/>

                    {/* Border */}
                    <span className="absolute inset-0 border border-primary/40 group-hover:border-primary/85
                                     transition-colors duration-250"
                          style={{clipPath: "inherit"}}/>

                    {/* Corner ticks - top-left primary, bottom-right tertiary */}
                    <span className="absolute -top-px -left-px w-2 h-2
                                     border-l-[1.5px] border-t-[1.5px] border-primary"/>
                    <span className="absolute -bottom-px -right-px w-2 h-2
                                     border-r-[1.5px] border-b-[1.5px] border-tertiary"/>

                    <span className="relative z-10">Order</span>
                </a>
            </div>
        </header>
    );
}
