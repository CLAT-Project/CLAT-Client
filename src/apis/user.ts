import { Api } from '@/apis/axios'
import { IUserClassResponse } from '@/types/chat.types'
import { IUserResponse } from '@/types/user.type'

const getUserClass = async ({ term }: { term: string }) => {
  const response = await Api.get<IUserClassResponse[]>('/home', {
    params: {
      term,
    },
  })

  return response.data
}

const getUser = async () => {
  const response = await Api.get<IUserResponse>(`/member`)

  return response.data
}

const userApi = {
  getUserClass,
  getUser,
}

export default userApi
