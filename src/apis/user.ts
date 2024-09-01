import { Api } from "@/apis/axios"

const getUserClass = async () => {

  const response = await Api.get('/home')

  return response.data
}

const userApi = {
  getUserClass

}

export default userApi