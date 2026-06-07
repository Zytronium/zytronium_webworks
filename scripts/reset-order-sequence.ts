import { createClient } from "@libsql/client";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const client = createClient({
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
});

async function reset() {
    await client.execute("DELETE FROM sqlite_sequence WHERE name = 'orders'");
    console.log("✓ Order sequence reset. Next order will be #1.");
    await client.close();
}

reset().catch(console.error);