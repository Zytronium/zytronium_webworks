import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { orders } from "@/lib/schema";
import { desc, eq } from "drizzle-orm";
import { verifyAdminSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
    const authed = await verifyAdminSession(req);
    if (!authed) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

    const allOrders = await db
        .select()
        .from(orders)
        .orderBy(desc(orders.createdAt));

    return NextResponse.json(allOrders);
}