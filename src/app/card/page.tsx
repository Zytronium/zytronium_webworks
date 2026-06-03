'use client';

import {useRef, useState} from 'react';
import LogoLarge from '@/components/LogoLarge';


export default function BusinessCard() {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const frontRef = useRef<HTMLDivElement>(null);
    const backRef = useRef<HTMLDivElement>(null);

    const services = ['Landing Pages', 'Small Business Websites', 'Custom Web Applications', 'Website Maintenance'];

    const exportImages = async () => {
        if (!frontRef.current || !backRef.current) return;
        setIsExporting(true);

        try {
            const { domToPng } = await import('modern-screenshot');
            const options = {
                width: 700,
                height: 400,
                scale: 3,
            };

            const front = frontRef.current;
            const back = backRef.current;

            // Capture front
            front.style.transform = 'none';
            front.style.backfaceVisibility = 'visible';
            const frontDataUrl = await domToPng(front, options);
            front.style.transform = '';
            front.style.backfaceVisibility = 'hidden';

            // Capture back
            back.style.transform = 'none';
            back.style.backfaceVisibility = 'visible';
            const backDataUrl = await domToPng(back, options);
            back.style.transform = 'rotateY(180deg)';
            back.style.backfaceVisibility = 'hidden';

            // Download front
            const frontLink = document.createElement('a');
            frontLink.download = 'business-card-front.png';
            frontLink.href = frontDataUrl;
            frontLink.click();

            // Short delay so browsers don't block the second download
            await new Promise(r => setTimeout(r, 300));

            // Download back
            const backLink = document.createElement('a');
            backLink.download = 'business-card-back.png';
            backLink.href = backDataUrl;
            backLink.click();
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-8">
            <div
                className="relative cursor-pointer"
                style={{width: '700px', height: '400px'}}
                onClick={() => setIsFlipped(!isFlipped)}
            >
                <div
                    className="w-full h-full transition-transform duration-700 preserve-3d"
                    style={{
                        transformStyle: 'preserve-3d',
                        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                    }}
                >
                    {/* Front Side */}
                    <div
                        ref={frontRef}
                        className="absolute w-full h-full backface-hidden bg-gradient-to-br from-logo-bg-start to-logo-bg-end border-2 border-logo-bg-start-border rounded-xl shadow-2xl p-8"
                        style={{backfaceVisibility: 'hidden'}}
                    >
                        <div className="flex flex-col h-full">
                            <div className="mb-4">
                                <LogoLarge/>
                            </div>

                            <div className="flex-1 flex flex-col justify-between pb-1">
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-foreground mb-2">Services</h3>
                                        <ul className="space-y-2">
                                            {services.map((skill) => (
                                                <li key={skill} className="text-foreground flex items-center">
                                                    <span className="w-2 h-2 bg-secondary-lighter rounded-full mr-3"></span>
                                                    {skill}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="flex flex-col items-center">
                                    <div className="flex items-center justify-center bg-foreground p-3 rounded-lg">
                                        <img
                                            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://webworks.zytronium.dev/pricing&color=0d0925&bgcolor=e3f0f0`}
                                            alt="QR Code to webworks.zytronium.dev"
                                            className="w-32 h-32"
                                            crossOrigin="anonymous"
                                        />
                                    </div>
                                    <span className="text-sm text-foreground/80 mt-1">Scan to view pricing</span>
                                    </div>
                                </div>

                                <p className="text-xl font-semibold text-foreground text-center -mt-7">Daniel Stelljes</p>
                                <p className="text-xs text-foreground/80 text-center">Freelance Web Developer</p>
                            </div>
                        </div>
                    </div>

                    {/* Back Side */}
                    <div
                        ref={backRef}
                        className="absolute w-full h-full backface-hidden bg-gradient-to-br from-logo-bg-end to-logo-bg-start border-2 border-logo-bg-end-border rounded-xl shadow-2xl p-8"
                        style={{
                            backfaceVisibility: 'hidden',
                            transform: 'rotateY(180deg)',
                        }}
                    >
                        <div className="flex flex-col h-full justify-center">
                            <h2 className="text-3xl font-bold text-foreground mb-8">Contact Information</h2>

                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-foreground/80 mb-1">Name</p>
                                    <p className="text-xl text-primary-lighter font-semibold">Daniel Stelljes</p>
                                </div>

                                <div>
                                    <p className="text-sm text-foreground/80 mb-1">Email</p>
                                    <p className="text-xl text-secondary-bright">webworks@zytronium.dev</p>
                                </div>

                                <div>
                                    <p className="text-sm text-foreground/80 mb-1">Website</p>
                                    <p className="text-xl text-tertiary-lighter">webworks.zytronium.dev</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Export Button */}
            <button
                onClick={exportImages}
                disabled={isExporting}
                className="px-6 py-2.5 rounded-lg bg-primary text-white font-semibold shadow hover:opacity-90 active:scale-95 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isExporting ? 'Exporting...' : '⬇ Export as PNG'}
            </button>
        </div>
    );
}
