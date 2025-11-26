'use client'
import { User } from "@/hooks/getUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";

import React, { useEffect } from "react";

type task = {
    id: number,
    title: string,
    date: string,
    status: string
}

const columnHelper = createColumnHelper<task>();




export default function Home(){
    const [title, setTitle] = React.useState("")
    const [date, setDate] = React.useState("")
    const [status, setStatus] = React.useState("pending")
    // const [tasks, setTasks] = React.useState<Array <any>>([])
    const userSession = User();
    const queryClient =  useQueryClient();
   
    const handleAddTask = (e: React.FormEvent) => {
        e.preventDefault();  
        addMutation.mutate()
    }

    const getData = async () => {
        const data = await fetch(`/api/tasks/${userSession?.user?.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        }).then( res => res.json())

        console.log("all tasks",data);
        if(data.task)
        // setTasks(data.task)

        return data.task
    }

    useEffect(() => {
        console.log("session", userSession);

        if (userSession?.user?.id) {
            getData();
        }
    }, [userSession]);


    const { isPending, isError, data, error } = useQuery({
        queryKey: ['todos'],
        queryFn: getData,
        enabled: !!userSession?.user.id
    })

    const addMutation = useMutation({
        mutationFn: () => {
            const data = fetch("/api/tasks",{
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
            }).then(res => res.json())
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
        }

    })

     const deleteMutation = useMutation({
        mutationFn: (taskId: number) => {
            const data = fetch("/api/tasks",{
                method:"DELETE",
                headers:{
                    "content-type":"application/json"
                },
                body:  JSON.stringify({
                    taskId: taskId
                })
            }).then(res => res.json())
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
        }

    })
    
    const columns = [
    columnHelper.accessor('title', {
        header: 'Title',
        cell: info => <div className="px-6 border">{info.getValue()}</div>
    }),
    columnHelper.accessor('date', {
        header: "Date",
        cell: info => <div className="px-6 border">{info.getValue()}</div>
    }),
    columnHelper.accessor('status', {
        header: 'Status',
        cell: info => <div className="px-6 border">{info.getValue()}</div>
    }),
    columnHelper.accessor('id', {
        header: 'Actions',
        cell: info => <div className="px-6 border hover:text-red-500 cursor-pointer"  onClick={() => deleteMutation.mutate(info.getValue())}><Trash2 size={22} className="mx-auto"/></div>,
        
    })
]
    
    const table = useReactTable({
        data: data || [],
        columns,
        getCoreRowModel: getCoreRowModel()
    })


    if(userSession?.session && data)
    return (
        <div className="w-5xl flex items-start gap-16 m-auto py-20">
            <div className="border p-4">
                    <h1 className="text-3xl ">Dashboard</h1>
            {/* add task section */}
            <form action="" className="flex flex-col gap-2 mt-12" onSubmit={handleAddTask}>
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

            </div>
            {/* tasks here */}
            {/* {
                data && data.length > 0 ? (
                         <table className="border w-full">
                <tbody className="flex flex-col justify-between items-center">
                    <tr className="flex gap-4">
                        <th>Title</th>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                    {
                        data?.map((task: {id: number, title: string, date: string, status: string}) => (
                            <tr key={task.id} className="flex gap-4">
                                <td>{task.title}</td>
                                <td>{task.date}</td>
                                <td>{task.status}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
                ): null
            } */}

            <div className="border p-4">
                 <table className="mt-4">
                <thead>
                {
                    table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {
                                headerGroup.headers.map(header => (
                                    <th key={header.id} className="px-6 border">
                                        {
                                            flexRender(header.column.columnDef.header, header.getContext())
                                        }
                                    </th>
                                ))
                            }
                        </tr>
                    ))
                }
                </thead>
                <tbody>
                    {
                        table.getRowModel().rows.map(row => (
                            <tr key={row.id}>
                                {
                                    row.getVisibleCells().map(cell => (
                                        <td key={cell.id}>
                                            {
                                                flexRender(cell.column.columnDef.cell, cell.getContext())
                                            }
                                        </td>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            </div>

        </div>
    )
    else return <div>Loading...</div>
}

