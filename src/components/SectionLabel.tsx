export default function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex items-center gap-3 mb-2">
            <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-bold tracking-[3px] uppercase text-primary/60">{children}</span>
            <div className="flex-1 h-px bg-gradient-to-r from-primary/20 to-transparent" />
        </div>
    );
}
