import HeroSection from "@/components/HeroSection";
import ProjectShowcase from "@/components/ProjectShowcase";
import TestimonialsSection from "@/components/TestimonialsSection";

export default function Home() {
    return (
        <main className="flex min-h-full w-full flex-col">
            <HeroSection/>

            <section
                className="relative w-full my-4 py-24 px-4 bg-linear-to-r from-secondary/20 to-tertiary/20 border-y border-secondary/30 before:absolute before:top-0 before:left-0 before:w-full before:h-4 before:bg-[repeating-linear-gradient(45deg,#000_0,#000_20px,#ffd700_20px,#ffd700_40px)] after:absolute after:bottom-0 after:left-0 after:w-full after:h-4 after:bg-[repeating-linear-gradient(-45deg,#000_0,#000_20px,#ffd700_20px,#ffd700_40px)]">
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-yellow-500">
                    Website Under Construction
                    </h2>
                    <p className="text-lg md:text-xl text-foreground/80">
                        Working hard to bring you an amazing experience. Stay tuned!
                    </p>
                </div>
            </section>

            {/*<ProjectShowcase/>*/}

            {/*<TestimonialsSection/>*/}
        </main>
    );
}
