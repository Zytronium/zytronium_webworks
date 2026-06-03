import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { orders } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { verifyAdminSession } from "@/lib/auth";

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const authed = await verifyAdminSession(req);
    if (!authed) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

    const { id } = await params;
    const body = await req.json();

    const allowedFields = ["status", "adminNotes"] as const;
    const updates: Partial<Record<typeof allowedFields[number], string>> = {};

    for (const field of allowedFields) {
        if (field in body) updates[field] = body[field];
    }

    if (Object.keys(updates).length === 0) {
        return NextResponse.json({ error: "No valid fields to update." }, { status: 400 });
    }

    const updated = await db
        .update(orders)
        .set(updates)
        .where(eq(orders.id, Number(id)))
        .returning();

    if (!updated.length) {
        return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    return NextResponse.json(updated[0]);
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const authed = await verifyAdminSession(req);
    if (!authed) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

    const { id } = await params;

    const deleted = await db
        .delete(orders)
        .where(eq(orders.id, Number(id)))
        .returning();

    if (!deleted.length) {
        return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true });
}
