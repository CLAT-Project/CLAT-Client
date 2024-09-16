import userApi from "@/apis/user";
import { useQuery } from "@tanstack/react-query"

export const useUserClassQuery = () => {
  return useQuery({
    queryKey: ['userClass'],
    queryFn: userApi.getUserClass
  })
}

export const useUserQuery = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: userApi.getUser,    
    staleTime: 1000 * 60 * 10
  })
}

