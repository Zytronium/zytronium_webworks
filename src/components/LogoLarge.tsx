export default function LogoLarge() {
    return (
        <div className="w-fit [clip-path:polygon(0_0,100%_0,100%_calc(100%-48px),calc(100%-48px)_100%,0_100%)] bg-linear-to-tl from-primary via-secondary to-tertiary p-0.5">
            <h1 className="bg-linear-to-tl from-logo-bg-start to-logo-bg-end px-9 pt-7 pb-1.5 [clip-path:polygon(0_0,100%_0,100%_calc(100%-48px),calc(100%-48px)_100%,0_100%)]">
                <span className="sr-only">Zytronium WebWorks</span>

                <svg
                    viewBox="0 0 1200 290"
                    className="block h-[105px] w-auto overflow-visible text-background"
                    aria-hidden="true"
                >
                    <defs>
                        <linearGradient id="zytronium-neon-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#00f4ff" />
                            <stop offset="50%" stopColor="#c800ff" />
                            <stop offset="100%" stopColor="#ff0454" />
                        </linearGradient>

                        <mask id="zytronium-outline-mask" maskUnits="userSpaceOnUse">
                            <rect width="1200" height="260" fill="black" />
                            <text
                                x="600"
                                y="128"
                                textAnchor="middle"
                                fontFamily="Aquire, sans-serif"
                                fontSize="180"
                                fontWeight="400"
                                letterSpacing="0.03em"
                                fill="black"
                                stroke="white"
                                strokeWidth="8"
                                paintOrder="stroke"
                            >
                                Zytronium
                            </text>
                            <text
                                x="600"
                                y="218"
                                textAnchor="middle"
                                fontFamily="Aquire, sans-serif"
                                fontSize="56"
                                fontWeight="400"
                                letterSpacing="0.45em"
                                fill="black"
                                stroke="white"
                                strokeWidth="4"
                                paintOrder="stroke"
                            >
                                WebWorks
                            </text>
                        </mask>
                    </defs>

                    <rect width="1200" height="260" fill="url(#zytronium-neon-gradient)" mask="url(#zytronium-outline-mask)" />

                    <text
                        x="600"
                        y="128"
                        textAnchor="middle"
                        fontFamily="Aquire, sans-serif"
                        fontSize="180"
                        fontWeight="400"
                        letterSpacing="0.03em"
                        fill="currentColor"
                    >
                        Zytronium
                    </text>

                    <text
                        x="600"
                        y="218"
                        textAnchor="middle"
                        fontFamily="Aquire, sans-serif"
                        fontSize="56"
                        fontWeight="400"
                        letterSpacing="0.45em"
                        fill="currentColor"
                    >
                        WebWorks
                    </text>
                </svg>
            </h1>
        </div>
    );
}