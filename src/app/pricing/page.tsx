import {pricingMap, additionalFeatures, scopeDescriptions, featureDescriptions} from '@/lib/pricing';

export default function PricingPage() {
    return (
        <main className="min-h-screen py-16 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl w-fit mx-auto font-bold mb-4 bg-linear-to-b from-primary to-accent bg-clip-text text-transparent">
                        Pricing
                    </h1>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {Object.entries(pricingMap).map(([scope, [min, max]]) => (
                        <div
                            key={scope}
                            className="relative group p-6 border border-primary/30 rounded-lg hover:border-primary/60 transition-all duration-300"
                            style={{
                                background: "linear-gradient(135deg, rgba(0,178,255,0.05), rgba(97,7,187,0.05))"
                            }}
                        >
                            <h3 className="text-xl font-bold mb-3 text-primary">{scope}</h3>
                            <div className="text-3xl font-bold mb-2">
                                ${min.toLocaleString()} - ${max.toLocaleString()}
                            </div>
                            <p className="text-foreground/60 text-sm mb-3">Starting range</p>
                            <p className="text-foreground/70 text-sm leading-relaxed">
                                {scopeDescriptions[scope]}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Additional Features */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 text-center">Additional Features</h2>
                    <div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
                        {Object.entries(additionalFeatures).map(([feature, price]) => (
                            <div
                                key={feature}
                                className="p-4 border border-secondary/30 rounded-lg flex flex-col hover:border-secondary/60 transition-all duration-300"
                                style={{
                                    background: "linear-gradient(135deg, rgba(97,7,187,0.05), rgba(208,3,65,0.05))"
                                }}
                            >
                                <h4 className="font-semibold mb-1 text-foreground">{feature}</h4>
                                <p className="text-secondary font-bold mb-2">
                                    {price === 0 ? "Custom Quote" : price < 0 ? `+${Math.abs(price)}%` : `+$${price.toLocaleString()}`}
                                </p>
                                <p className="text-foreground/70 text-sm leading-relaxed mt-auto">
                                    {featureDescriptions[feature]}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Call to Action */}
                <div className="max-w-3xl mx-auto text-center">
                    <div className="p-8 border border-accent/40 rounded-lg mb-8"
                         style={{background: "linear-gradient(135deg, rgba(0,178,255,0.05), rgba(97,7,187,0.05))"}}>
                        <h2 className="text-3xl font-bold mb-4 text-accent">Ready to Get Started?</h2>
                        <p className="text-foreground/70 text-lg mb-6 leading-relaxed">
                            Choose your project scope and additional features to get a personalized quote.
                        </p>
                        <a
                            href="/order"
                            className="inline-block relative group px-8 py-4 text-lg font-bold tracking-[2px] uppercase text-primary transition-all duration-300"
                            style={{
                                clipPath: "polygon(12px 0%,100% 0%,100% calc(100% - 12px),calc(100% - 12px) 100%,0% 100%,0% 12px)"
                            }}
                        >
                            <span
                                className="absolute inset-0 bg-linear-to-r from-primary/10 via-secondary/10 to-tertiary/10 group-hover:from-primary/20 group-hover:via-secondary/20 group-hover:to-tertiary/20 transition-all duration-300"
                                style={{clipPath: "inherit"}}/>
                            <span
                                className="absolute inset-0 border-2 border-primary/40 group-hover:border-primary transition-colors duration-300"
                                style={{clipPath: "inherit"}}/>
                            <span className="relative z-10">Build Your Quote</span>
                        </a>
                    </div>
                    <div className="p-4 border border-accent/40 rounded-lg bg-accent/5">
                        <p className="text-foreground/70 text-sm leading-relaxed">
                            <strong className="text-accent">Note:</strong>{" "}Final pricing is subject to change based
                            on requested features,
                            project complexity, and the number of orders currently in queue.
                            You&apos;ll be provided with a detailed quote after your requirements are reviewed.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}

