import { authClient } from "@/lib/auth/auth-client"

export function User(){

    const { 
        data: session, 
        isPending, //loading state
        error, //error object
        refetch //refetch the session
    } = authClient.useSession() 

    return (
        session
    )
}