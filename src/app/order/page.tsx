"use client";

import {useState} from "react";
import {pricingMap, additionalFeatures, scopeDescriptions, featureDescriptions} from '@/lib/pricing';


export default function PricingPage() {
    const [selectedScope, setSelectedScope] = useState<string>("");
    const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });

    const handleFeatureToggle = (feature: string) => {
        setSelectedFeatures(prev =>
            prev.includes(feature)
                ? prev.filter(f => f !== feature)
                : [...prev, feature]
        );
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const calculateTotal = () => {
        let min = 0;
        let max = 0;

        if (selectedScope) {
            const [scopeMin, scopeMax] = pricingMap[selectedScope as keyof typeof pricingMap];
            min += scopeMin;
            max += scopeMax;
        }

        selectedFeatures.forEach(feature => {
            const price = additionalFeatures[feature as keyof typeof additionalFeatures];
            if (price > 0) {
                min += price;
                max += price;
            } else if (price < 0) {
                // Expedite Development is a percentage increase
                const percentage = Math.abs(price) / 100;
                min += min * percentage;
                max += max * percentage;
            }
        });

        return {min: Math.round(min), max: Math.round(max)};
    };

    const isCustomQuoteScope = () => {
        if (!selectedScope) return false;
        const [min, max] = pricingMap[selectedScope as keyof typeof pricingMap];
        return min === 0 && max === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({selectedScope, selectedFeatures, formData});
        alert("Form not submitted. (This feature is not implemented yet)");
    };

    return (
        <main className="min-h-screen py-16 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl w-fit mx-auto font-bold mb-4 bg-linear-to-b from-primary to-accent bg-clip-text text-transparent">
                        Order
                    </h1>
                </div>

                {/* Selection & Contact Form */}
                <div className="max-w-3xl mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Scope Selection */}
                        <div className="p-6 border border-primary/30 rounded-lg"
                             style={{background: "rgba(0,178,255,0.03)"}}>
                            <h3 className="text-2xl font-bold text-primary">Select Your Scope</h3>
                            <p className="text-sm text-foreground/80 mb-4">What kind of project and what scale are you thinking of?</p>
                            <div className="space-y-4">
                                {Object.keys(pricingMap).map((scope) => (
                                    <label key={scope}
                                           className="flex items-start gap-4 cursor-pointer group p-3 rounded-lg hover:bg-primary/5 transition-colors">
                                        <div className="relative flex-shrink-0 mt-1">
                                            <input
                                                type="radio"
                                                name="scope"
                                                value={scope}
                                                checked={selectedScope === scope}
                                                onChange={(e) => setSelectedScope(e.target.value)}
                                                className="sr-only"
                                            />
                                            <div
                                                className={`w-5 h-5 rounded-full border-2 transition-all duration-200 ${
                                                    selectedScope === scope
                                                        ? 'border-primary bg-primary'
                                                        : 'border-primary/40 group-hover:border-primary/60'
                                                }`}>
                                                {selectedScope === scope && (
                                                    <div
                                                        className="w-full h-full rounded-full border-2 border-background scale-50"/>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-1">
                                                <span
                                                    className="block text-foreground group-hover:text-primary transition-colors font-semibold">
                                                    {scope}
                                                </span>
                                                <span className="text-primary font-bold text-sm">
                                                    {pricingMap[scope as keyof typeof pricingMap][0] === 0 && pricingMap[scope as keyof typeof pricingMap][1] == 0 ? "Custom Quote" : `$${pricingMap[scope as keyof typeof pricingMap][0].toLocaleString()} - $${pricingMap[scope as keyof typeof pricingMap][1].toLocaleString()}`}
                                                </span>
                                            </div>
                                            <span className="block text-foreground/80 text-sm">
                                                {scopeDescriptions[scope]}
                                            </span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Features Selection */}
                        <div className="p-6 border border-secondary/30 rounded-lg"
                             style={{background: "rgba(97,7,187,0.03)"}}>
                            <h3 className="text-2xl font-bold text-secondary-lighter">Additional Features</h3>
                            <p className="text-sm text-foreground/80 mb-4">What kind of extra features would you like added?</p>
                            <div className="space-y-4">
                                {Object.keys(additionalFeatures).map((feature) => (
                                    <label key={feature}
                                           className="flex items-start gap-4 cursor-pointer group p-3 rounded-lg hover:bg-secondary/5 transition-colors">
                                        <div className="relative shrink-0 mt-1">
                                            <input
                                                type="checkbox"
                                                checked={selectedFeatures.includes(feature)}
                                                onChange={() => handleFeatureToggle(feature)}
                                                className="sr-only"
                                            />
                                            <div
                                                className={`w-5 h-5 rounded border-2 transition-all duration-200 flex items-center justify-center ${
                                                    selectedFeatures.includes(feature)
                                                        ? 'border-secondary bg-secondary'
                                                        : 'border-secondary/40 group-hover:border-secondary/60'
                                                }`}>
                                                {selectedFeatures.includes(feature) && (
                                                    <svg className="w-3.5 h-3.5 text-background" fill="none"
                                                         viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              d="M5 13l4 4L19 7"/>
                                                    </svg>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-1">
                                                <span
                                                    className="block text-foreground group-hover:text-secondary transition-colors font-semibold">
                                                    {feature}
                                                </span>
                                                <span className="text-secondary-lighter font-bold text-sm">
                                                    {additionalFeatures[feature as keyof typeof additionalFeatures] === 0
                                                        ? "Custom Quote"
                                                        : additionalFeatures[feature as keyof typeof additionalFeatures] < 0
                                                            ? `+${Math.abs(additionalFeatures[feature as keyof typeof additionalFeatures])}%`
                                                            : `+$${additionalFeatures[feature as keyof typeof additionalFeatures].toLocaleString()}`}
                                                </span>
                                            </div>
                                            <span className="block text-foreground/80 text-sm">
                                                {featureDescriptions[feature]}
                                            </span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Total Estimated Cost */}
                        {(selectedScope || selectedFeatures.length > 0) && (
                            <div className="p-6 border-2 border-accent/50 rounded-lg"
                                 style={{background: "linear-gradient(135deg, rgba(0,178,255,0.08), rgba(97,7,187,0.08))"}}>
                                <h3 className="text-2xl font-bold mb-4 text-accent">Estimated Total Cost</h3>
                                <div className="flex items-center justify-between">
                                    <span className="text-foreground/80 text-lg">
                                        {selectedScope ? "Based on your selections:" : "Select a scope to see estimate"}
                                    </span>
                                    {selectedScope && (
                                        <div className="text-right">
                                            <div className="text-4xl font-bold mask-text bg-linear-to-b from-primary to-accent bg-clip-text text-transparent">
                                                {isCustomQuoteScope()
                                                    ? "Custom Quote"
                                                    : `$${calculateTotal().min.toLocaleString()} - $${calculateTotal().max.toLocaleString()}`}
                                            </div>
                                            <p className="text-foreground/60 text-sm mt-1">
                                                {selectedFeatures.includes("Other") && "* Custom features will affect final price"}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Contact Information */}
                        <div className="p-6 border border-tertiary/30 rounded-lg"
                             style={{background: "rgba(208,3,65,0.03)"}}>
                            <h3 className="text-2xl font-bold mb-4 text-tertiary">Contact Information</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-foreground/80 mb-2">Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 bg-background border border-foreground/20 rounded focus:border-primary focus:outline-none text-foreground"
                                    />
                                </div>
                                <div>
                                    <label className="block text-foreground/80 mb-2">Email *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 bg-background border border-foreground/20 rounded focus:border-primary focus:outline-none text-foreground"
                                    />
                                </div>
                                <div>
                                    <label className="block text-foreground/80 mb-2">Phone</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 bg-background border border-foreground/20 rounded focus:border-primary focus:outline-none text-foreground"
                                    />
                                </div>
                                <div>
                                    <label className="block text-foreground/80 mb-2">Message and Order Details</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        rows={4}
                                        className="w-full px-4 py-2 bg-background border border-foreground/20 rounded focus:border-primary focus:outline-none text-foreground resize-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Disclaimer */}
                        <div className="p-4 border border-accent/40 rounded-lg bg-accent/5">
                            <p className="text-foreground/70 text-sm leading-relaxed">
                                <strong className="text-accent">Note:</strong>{" "}Final pricing is subject to change based
                                on requested features,
                                project complexity, and the number of orders currently in queue.
                                You&apos;ll be provided with a detailed quote after your requirements are reviewed.
                            </p>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full relative group px-8 py-4 text-lg font-bold tracking-[2px] uppercase text-primary transition-all duration-300"
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
                            <span className="relative z-10">Submit Request</span>
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}