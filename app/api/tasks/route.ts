import { db } from "@/lib/db";
import { tasks } from "@/lib/db/schema/schema";


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

