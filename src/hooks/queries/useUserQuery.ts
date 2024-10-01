import userApi from '@/apis/user'
import { useQuery } from '@tanstack/react-query'

export const useUserClassQuery = ({ term }: { term: string }) => {
  return useQuery({
    queryKey: ['userClass', term],
    queryFn: () => userApi.getUserClass({ term }),
  })
}

export const useUserQuery = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: userApi.getUser,
    staleTime: 1000 * 60 * 10,
  })
}
