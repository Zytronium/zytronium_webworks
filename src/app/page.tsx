import HeroSection from "@/components/HeroSection";
import ProjectShowcase from "@/components/ProjectShowcase";
import TestimonialsSection from "@/components/TestimonialsSection";

export default function Home() {
    return (
        <main className="flex min-h-full w-full flex-col p-8 gap-8">
            <HeroSection/>

            <ProjectShowcase/>

            <TestimonialsSection/>
        </main>
    );
}
