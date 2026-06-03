import { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function verifyAdminSession(req: NextRequest): Promise<boolean> {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");

    if (!session) return false;

    return session.value === process.env.ADMIN_SECRET;
}
