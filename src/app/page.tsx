import HeroSection from "@/components/HeroSection";
import ProjectShowcase from "@/components/ProjectShowcase";
import DealsSection from "@/components/DealsSection";

export default function Home() {
    return (
        <main className="flex min-h-full w-full flex-col">
            <HeroSection/>

            <ProjectShowcase/>

            <DealsSection/>
        </main>
    );
}
