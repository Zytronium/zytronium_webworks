export default function GridOverlay() {
    return (
        <div
            className="pointer-events-none absolute inset-0"
            style={{background: "repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(0,178,255,0.015) 40px, rgba(0,178,255,0.015) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(0,178,255,0.01) 40px, rgba(0,178,255,0.01) 41px)"}}
        />
    );
}
