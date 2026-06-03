"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const res = await fetch("/api/admin/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password }),
        });

        if (res.ok) {
            router.push("/admin/dashboard");
        } else {
            setError("Invalid password.");
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center px-4">
            {/* Background grid */}
            <div className="fixed inset-0 pointer-events-none"
                 style={{
                     backgroundImage: `linear-gradient(rgba(0,178,255,0.03) 1px, transparent 1px),
                                      linear-gradient(90deg, rgba(0,178,255,0.03) 1px, transparent 1px)`,
                     backgroundSize: "40px 40px"
                 }}
            />

            <div className="relative w-full max-w-sm">
                {/* Corner accents */}
                <div className="absolute -top-px -left-px w-6 h-6 border-t-2 border-l-2 border-primary" />
                <div className="absolute -top-px -right-px w-6 h-6 border-t-2 border-r-2 border-primary" />
                <div className="absolute -bottom-px -left-px w-6 h-6 border-b-2 border-l-2 border-primary" />
                <div className="absolute -bottom-px -right-px w-6 h-6 border-b-2 border-r-2 border-primary" />

                <div className="border border-primary/20 p-8" style={{ background: "rgba(0,178,255,0.02)" }}>
                    <h1 className="text-2xl font-bold text-primary tracking-[3px] uppercase mb-1">Admin</h1>
                    <p className="text-foreground/40 text-sm mb-8 tracking-widest uppercase">Restricted Access</p>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-foreground/60 text-xs uppercase tracking-widest mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                autoFocus
                                className="w-full px-4 py-3 bg-background border border-foreground/20 focus:border-primary focus:outline-none text-foreground placeholder:text-foreground/20 transition-colors"
                                placeholder="••••••••••••"
                            />
                        </div>

                        {error && (
                            <p className="text-tertiary text-sm tracking-wide">{error}</p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full relative group px-6 py-3 text-sm font-bold tracking-[3px] uppercase text-primary transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                            style={{ clipPath: "polygon(8px 0%,100% 0%,100% calc(100% - 8px),calc(100% - 8px) 100%,0% 100%,0% 8px)" }}
                        >
                            <span className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-all duration-300" style={{ clipPath: "inherit" }} />
                            <span className="absolute inset-0 border border-primary/40 group-hover:border-primary transition-colors duration-300" style={{ clipPath: "inherit" }} />
                            <span className="relative z-10">{loading ? "Verifying..." : "Enter"}</span>
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}
