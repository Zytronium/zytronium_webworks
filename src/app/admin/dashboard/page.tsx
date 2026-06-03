"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Order } from "@/lib/schema";

const STATUS_COLORS: Record<string, string> = {
    new:       "text-primary border-primary/40 bg-primary/10",
    reviewed:  "text-secondary-bright border-secondary/40 bg-secondary/10",
    contacted: "text-yellow-400 border-yellow-400/40 bg-yellow-400/10",
    completed: "text-green-400 border-green-400/40 bg-green-400/10",
    archived:  "text-foreground/40 border-foreground/20 bg-foreground/5",
};

const STATUSES = ["new", "reviewed", "contacted", "completed", "archived"];

export default function AdminDashboard() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [adminNotes, setAdminNotes] = useState("");
    const [savingNotes, setSavingNotes] = useState(false);
    const [filterStatus, setFilterStatus] = useState<string>("all");
    const router = useRouter();

    const fetchOrders = async () => {
        const res = await fetch("/api/admin/orders");
        if (res.status === 401) {
            router.push("/admin");
            return;
        }
        const data = await res.json();
        setOrders(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleLogout = async () => {
        await fetch("/api/admin/login", { method: "DELETE" });
        router.push("/admin");
    };

    const handleStatusChange = async (id: number, status: string) => {
        await fetch(`/api/admin/orders/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status }),
        });
        setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
        if (selectedOrder?.id === id) setSelectedOrder(prev => prev ? { ...prev, status } : prev);
    };

    const handleSaveNotes = async () => {
        if (!selectedOrder) return;
        setSavingNotes(true);
        await fetch(`/api/admin/orders/${selectedOrder.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ adminNotes }),
        });
        setOrders(prev => prev.map(o => o.id === selectedOrder.id ? { ...o, adminNotes } : o));
        setSelectedOrder(prev => prev ? { ...prev, adminNotes } : prev);
        setSavingNotes(false);
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Delete this order permanently?")) return;
        await fetch(`/api/admin/orders/${id}`, { method: "DELETE" });
        setOrders(prev => prev.filter(o => o.id !== id));
        if (selectedOrder?.id === id) setSelectedOrder(null);
    };

    const openOrder = (order: Order) => {
        setSelectedOrder(order);
        setAdminNotes(order.adminNotes ?? "");
    };

    const filtered = filterStatus === "all" ? orders : orders.filter(o => o.status === filterStatus);

    const counts = STATUSES.reduce((acc, s) => {
        acc[s] = orders.filter(o => o.status === s).length;
        return acc;
    }, {} as Record<string, number>);

    return (
        <main className="min-h-full">
            {/* Background grid */}
            <div className="fixed inset-0 pointer-events-none"
                 style={{
                     backgroundImage: `linear-gradient(rgba(0,178,255,0.02) 1px, transparent 1px),
                                      linear-gradient(90deg, rgba(0,178,255,0.02) 1px, transparent 1px)`,
                     backgroundSize: "40px 40px"
                 }}
            />

            {/* Header */}
            <header className="sticky top-0 z-20 border-b border-primary/20 px-6 py-4 flex items-center justify-between"
                    style={{ background: "rgba(13,9,37,0.95)", backdropFilter: "blur(12px)" }}>
                <div>
                    <h1 className="text-xl font-bold text-primary tracking-[3px] uppercase">Orders</h1>
                    <p className="text-foreground/40 text-xs tracking-widest uppercase">Admin Dashboard</p>
                </div>
                <button onClick={handleLogout}
                        className="text-xs tracking-widest uppercase text-foreground/40 hover:text-tertiary transition-colors border border-foreground/20 hover:border-tertiary/40 px-4 py-2">
                    Logout
                </button>
            </header>

            <div className="max-w-7xl mx-auto px-4 py-8">

                {/* Stats bar */}
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-8">
                    {STATUSES.map(s => (
                        <button key={s} onClick={() => setFilterStatus(filterStatus === s ? "all" : s)}
                                className={`p-3 border text-left transition-all duration-200 ${
                                    filterStatus === s ? STATUS_COLORS[s] : "border-foreground/10 text-foreground/40 hover:border-foreground/30"
                                }`}>
                            <div className="text-2xl font-bold">{counts[s] ?? 0}</div>
                            <div className="text-xs uppercase tracking-widest mt-1 capitalize">{s}</div>
                        </button>
                    ))}
                </div>

                {loading ? (
                    <div className="text-center py-24 text-foreground/30 tracking-widest uppercase text-sm">
                        Loading orders...
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-24 text-foreground/30 tracking-widest uppercase text-sm">
                        No orders{filterStatus !== "all" ? ` with status "${filterStatus}"` : ""}.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {filtered.map(order => (
                            <div key={order.id}
                                 onClick={() => openOrder(order)}
                                 className={`border p-5 cursor-pointer transition-all duration-200 hover:border-primary/40 group ${
                                     selectedOrder?.id === order.id
                                         ? "border-primary/60 bg-primary/5"
                                         : "border-foreground/10 hover:bg-primary/3"
                                 }`}>
                                <div className="flex items-start justify-between gap-3 mb-3">
                                    <div>
                                        <span className="text-foreground/30 text-xs tracking-widest uppercase mr-2">#{order.id}</span>
                                        <span className="font-semibold text-foreground group-hover:text-primary transition-colors">{order.name}</span>
                                    </div>
                                    <span className={`text-xs px-2 py-1 border tracking-widest uppercase shrink-0 ${STATUS_COLORS[order.status]}`}>
                                        {order.status}
                                    </span>
                                </div>
                                <div className="text-foreground/50 text-sm mb-2">{order.email}</div>
                                <div className="flex items-center justify-between">
                                    <span className="text-primary/70 text-sm">{order.scope}</span>
                                    <span className="text-foreground/30 text-xs">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                {order.estimatedMin != null && (
                                    <div className="text-foreground/40 text-xs mt-2">
                                        Est. ${order.estimatedMin.toLocaleString()} – ${order.estimatedMax?.toLocaleString()}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Order detail drawer */}
            {selectedOrder && (
                <div className="fixed inset-0 z-30 flex justify-end" onClick={() => setSelectedOrder(null)}>
                    <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />
                    <div
                        className="relative w-full max-w-xl h-full overflow-y-auto border-l border-primary/20 p-6 space-y-6"
                        style={{ background: "rgba(13,9,37,0.98)" }}
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Drawer header */}
                        <div className="flex items-start justify-between gap-4 mt-24">
                            <div>
                                <span className="text-foreground/30 text-xs tracking-widest uppercase">Order #{selectedOrder.id}</span>
                                <h2 className="text-xl font-bold text-primary mt-1">{selectedOrder.name}</h2>
                                <p className="text-foreground/50 text-sm">{selectedOrder.business}</p>
                            </div>
                            <button onClick={() => setSelectedOrder(null)}
                                    className="text-foreground/30 hover:text-foreground transition-colors text-xl leading-none mt-1">
                                ✕
                            </button>
                        </div>

                        {/* Status selector */}
                        <div>
                            <label className="block text-foreground/40 text-xs uppercase tracking-widest mb-2">Status</label>
                            <div className="flex flex-wrap gap-2">
                                {STATUSES.map(s => (
                                    <button key={s} onClick={() => handleStatusChange(selectedOrder.id, s)}
                                            className={`text-xs px-3 py-1.5 border tracking-widest uppercase transition-all duration-200 ${
                                                selectedOrder.status === s ? STATUS_COLORS[s] : "border-foreground/20 text-foreground/40 hover:border-foreground/40"
                                            }`}>
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-foreground/10" />

                        {/* Contact info */}
                        <Section title="Contact">
                            <Field label="Client Name" value={selectedOrder.name} />
                            <Field label="Business" value={selectedOrder.business} />
                            <Field label="Email" value={selectedOrder.email} />
                            <Field label="Phone" value={selectedOrder.phone} />
                            <Field label="Location" value={selectedOrder.location} />
                        </Section>

                        {/* Project info */}
                        <Section title="Project">
                            <Field label="Scope" value={selectedOrder.scope} />
                            <Field label="Features" value={
                                (JSON.parse(selectedOrder.features) as string[]).join(", ") || "None"
                            } />
                            {selectedOrder.estimatedMin != null && (
                                <Field label="Estimate" value={
                                    `$${selectedOrder.estimatedMin.toLocaleString()} – $${selectedOrder.estimatedMax?.toLocaleString()}`
                                } />
                            )}
                            <Field label="Domain" value={selectedOrder.domain} />
                            <Field label="Hosting" value={selectedOrder.hosting} />
                            <Field label="Showcase" value={selectedOrder.showcase} />
                            <div>
                                <span className="block text-foreground/40 text-xs uppercase tracking-widest mb-1">Description</span>
                                <p className="text-foreground/80 text-sm leading-relaxed whitespace-pre-wrap">{selectedOrder.projectDescription}</p>
                            </div>
                        </Section>

                        {/* Admin notes */}
                        <Section title="Admin Notes">
                            <textarea
                                value={adminNotes}
                                onChange={e => setAdminNotes(e.target.value)}
                                rows={4}
                                placeholder="Internal notes, follow-up reminders, quotes sent, etc."
                                className="w-full px-3 py-2 bg-background border border-foreground/20 focus:border-primary focus:outline-none text-foreground text-sm placeholder:text-foreground/20 resize-none transition-colors"
                            />
                            <button onClick={handleSaveNotes} disabled={savingNotes}
                                    className="text-xs tracking-widest uppercase px-4 py-2 border border-primary/40 text-primary hover:bg-primary/10 transition-all duration-200 disabled:opacity-50">
                                {savingNotes ? "Saving..." : "Save Notes"}
                            </button>
                        </Section>

                        {/* Delete */}
                        <div className="border-t border-foreground/10 pt-4">
                            <button onClick={() => handleDelete(selectedOrder.id)}
                                    className="text-xs tracking-widest uppercase px-4 py-2 border border-tertiary/30 text-tertiary/60 hover:border-tertiary hover:text-tertiary transition-all duration-200">
                                Delete Order
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}

// Small helper components to keep things clean
function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-widest text-foreground/30 border-b border-foreground/10 pb-2">{title}</h3>
            {children}
        </div>
    );
}

function Field({ label, value, blur }: { label: string; value: string, blur?: boolean }) {
    return (
        <div>
            <span className="block text-foreground/40 text-xs uppercase tracking-widest mb-0.5">{label}</span>
            <span className={`text-foreground/80 text-sm ${blur ? "blur-md" : ""}`}>{value}</span>
        </div>
    );
}
