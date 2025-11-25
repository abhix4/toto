'use client'
import { User } from "@/hooks/getUser";

import React, { useEffect } from "react";

export default function Home(){
    const [title, setTitle] = React.useState("")
    const [date, setDate] = React.useState("")
    const [status, setStatus] = React.useState("pending")
    const userSession = User()

    
    const handleAddTask = (e: React.FormEvent) => {
        e.preventDefault();  
        const res = fetch("/api/tasks",{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:  JSON.stringify({
                title,
                date,
                status,
                userId: userSession?.user?.id
            })
        })
        console.log({
            title,
            date,
            status
        })      
    }

    const getData = async () => {
        const data = await fetch(`/api/tasks/${userSession?.user?.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        }).then( res => res.json())

        console.log("all tasks",data);
    }

    useEffect(() => {
        console.log("session", userSession);

        if (userSession?.user?.id) {
            getData();
        }
    }, [userSession]);


    return (
        <div className="w-96 m-auto">
            <h1 className="text-xl my-12">Dashboard</h1>
            {/* add task section */}
            <form action="" className="flex flex-col gap-2" onSubmit={handleAddTask}>
                <label htmlFor="task">Task</label>
                <input type="text" id="task" value={title} onChange={(e) => setTitle(e.target.value)}  className="border p-2 mt-4" />
                <label htmlFor="date">Date</label>
                <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)}  className="border p-2 mt-4" />
                <label htmlFor="status">Status</label>
                <select name="pending" id="status" value={status} onChange={(e) => setStatus(e.target.value)}  className="border p-2 mt-4">
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                </select>
                <button type="submit" className="border p-2 mt-4">Add Task</button>
            </form>

            {/* tasks here */}


        </div>
    )
}