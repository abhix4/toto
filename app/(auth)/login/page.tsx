"use client"

import { User } from "@/hooks/getUser";
import { authClient } from "@/lib/auth/auth-client";
import { redirect } from "next/navigation";
import React from "react";

export default function Signup(){
    const callback = `${window.location.origin}/home`;
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const userData = User()
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const {data, error} = await authClient.signIn.email({
            email: email,
            password: password, 
            callbackURL: callback
        },{
            onSuccess: (data) => {
                redirect(callback)
            }
        })
        console.log({
            data,
            error
        })
        console.log({ email, password})
    }
    if(!userData?.user)
    return (    
        <div className="w-96 mx-auto">
            <h1 className="text-xl text-center mb-8 mt-12">Login Page</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
               
                <label htmlFor="email">Email</label>
                <input type="email" id="email"  className="border p-2" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" className="border p-2" value={password} onChange={(e) => setPassword(e.target.value)} />

                <button type="submit" className="border p-2">Login</button>
            </form>
        </div>
    )
    else{
        redirect("/home")
    }
}