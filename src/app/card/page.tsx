'use client';

import {useState} from 'react';
import LogoLarge from '@/components/LogoLarge';

export default function BusinessCard() {
    const [isFlipped, setIsFlipped] = useState(false);

    const skills = ['Next.js', 'React', 'Tailwind', 'TypeScript', 'Node.js'];

    return (
        <div className="flex items-center justify-center min-h-screen p-8">
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
                        className="absolute w-full h-full backface-hidden bg-gradient-to-br from-logo-bg-start to-logo-bg-end border-2 border-logo-bg-start-border rounded-xl shadow-2xl p-8"
                        style={{backfaceVisibility: 'hidden'}}
                    >
                        <div className="flex flex-col h-full">
                            <div className="mb-4">
                                <LogoLarge/>
                            </div>

                            <div className="flex-1 flex items-center justify-between">
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-primary mb-3">Skills & Technologies</h3>
                                    <ul className="space-y-2">
                                        {skills.map((skill) => (
                                            <li key={skill} className="text-foreground flex items-center">
                                                <span className="w-2 h-2 bg-secondary rounded-full mr-3"></span>
                                                {skill}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="flex items-center justify-center bg-white p-4 rounded-lg">
                                    <img
                                        src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://webworks.zytronium.dev`}
                                        alt="QR Code to webworks.zytronium.dev"
                                        className="w-32 h-32"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Back Side */}
                    <div
                        className="absolute w-full h-full backface-hidden bg-gradient-to-br from-logo-bg-end to-logo-bg-start border-2 border-logo-bg-end-border rounded-xl shadow-2xl p-8"
                        style={{
                            backfaceVisibility: 'hidden',
                            transform: 'rotateY(180deg)',
                        }}
                    >
                        <div className="flex flex-col h-full justify-center">
                            <h2 className="text-3xl font-bold text-primary mb-8">Contact Information</h2>

                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-foreground/60 mb-1">Name</p>
                                    <p className="text-xl text-foreground font-semibold">Daniel Stelljes</p>
                                </div>

                                <div>
                                    <p className="text-sm text-foreground/60 mb-1">Email</p>
                                    <p className="text-xl text-primary-lighter">WebWorks@zytronium.dev</p>
                                </div>

                                <div>
                                    <p className="text-sm text-foreground/60 mb-1">Website</p>
                                    <p className="text-xl text-secondary-lighter">https://webworks.zytronium.dev</p>
                                </div>

                                <div>
                                    <p className="text-sm text-foreground/60 mb-1">Phone</p>
                                    <p className="text-xl text-tertiary-lighter">+1 (918)-706-2886</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
