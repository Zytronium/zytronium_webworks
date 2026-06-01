import LogoLarge from "@/components/LogoLarge";
import Link from "next/link";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full flex flex-row">
            <LogoLarge/>
            <div className="h-32 w-full bg-gradient-to-bl from-tertiary via-secondary to-primary p-0.5">
                <div
                    className="h-31 w-full bg-gradient-to-tr from-logo-bg-start to-logo-bg-end p-4 flex items-center justify-end">
                    <nav className="flex gap-8">
                        <Link
                            href="/#about"
                            className="text-primary hover:text-foreground transition-colors duration-300 text-lg font-semibold tracking-wide mt-3"
                        >
                            About
                        </Link>
                        <Link
                            href="/#showcase"
                            className="text-primary hover:text-foreground transition-colors duration-300 text-lg font-semibold tracking-wide mt-3"
                        >
                            Showcase
                        </Link>
                        <Link
                            href="/#testimonials"
                            className="text-primary hover:text-foreground transition-colors duration-300 text-lg font-semibold tracking-wide mt-3"
                        >
                            Testimonials
                        </Link>
                        <Link
                            href="/#faq"
                            className="text-primary hover:text-foreground transition-colors duration-300 text-lg font-semibold tracking-wide mt-3"
                        >
                            FAQ
                        </Link>
                        <a
                            href="/order"
                            className="text-primary transition-colors duration-300 text-lg font-semibold tracking-wide px-6 py-2 border-2 border-primary hover:bg-primary hover:text-background rounded"
                        >
                            Order
                        </a>
                    </nav>
                </div>
            </div>
        </header>
    );
}