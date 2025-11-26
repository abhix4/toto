import { db } from "@/lib/db";
import { tasks } from "@/lib/db/schema/schema";
import { eq } from "drizzle-orm";


export async function POST(request: Request) {
    try {
        const { title, date, status, userId} = await request.json();

        const task = await db.insert(tasks).values({
            title,
            date,
            status,
            userId
        })

        return Response.json({task}, {status: 201})
    } catch (error) {
        return Response.json({error: 'Failed to add Task'}, {status: 500})
    }
}

export async function DELETE(request: Request) {
    try {
        const { taskId} = await request.json();
        const deletedTask = await db.delete(tasks).where(eq(tasks.id, taskId));
        return Response.json({deletedTask}, {status: 200})
    } catch (error) {
        return Response.json({error: 'Failed to delete task'}, {status: 500})
    }
}