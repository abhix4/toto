import { db } from "@/lib/db";
import { tasks } from "@/lib/db/schema/schema";

import { eq } from "drizzle-orm";

export async function GET(
    request: Request,
    { params }: { params: { userId: string } }
) {
    try {
        const {userId} = await params

        if (!userId) {
            return Response.json({ error: "Missing userId" }, { status: 400 });
        }
        const task = await db
            .select()
            .from(tasks)
            .where(eq(tasks.userId, userId));

        return Response.json({ task }, { status: 200 });
    } catch (error) {
        return Response.json(
            { error: "Failed to fetch tasks" },
            { status: 500 }
        );
    }
}
