import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { orders } from "@/lib/schema";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const {
            name, email, phone, location, business,
            scope, features, projectDescription,
            domain, hosting, showcase,
            estimatedMin, estimatedMax,
        } = body;

        // Basic validation
        if (!name || !email || !phone || !location || !business || !scope || !projectDescription || !domain || !hosting || !showcase) {
            return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
        }

        const newOrder = await db.insert(orders).values({
            name,
            email,
            phone,
            location,
            business,
            scope,
            features: JSON.stringify(features ?? []),
            projectDescription,
            domain,
            hosting,
            showcase,
            estimatedMin: estimatedMin ?? null,
            estimatedMax: estimatedMax ?? null,
        }).returning();

        // NOTE: Email notification hook goes here later.
        // await sendOrderNotification(newOrder[0]);

        return NextResponse.json({ success: true, id: newOrder[0].id }, { status: 201 });
    } catch (err) {
        console.error("[POST /api/orders]", err);
        return NextResponse.json({ error: "Internal server error." }, { status: 500 });
    }
}
