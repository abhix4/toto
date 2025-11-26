import { QueryClient, useQuery } from "@tanstack/react-query";

const queryClient = new QueryClient();

export function getTodos (){
    return useQuery({
        queryKey: ['todos'],
        queryFn: async () => {
            
        }
    })
}