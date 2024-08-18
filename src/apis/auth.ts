import { Api, mutipartApi } from '@/apis/axios'

const postSingin = async ({
  username,
  password,
}: {
  username: string
  password: string
}) => {
  try {
    const { data, headers } = await Api.post(`/login`, {
      username,
      password,
    })

    const accessToken = headers['authorization']
    console.log(headers, 'headers')

    if (accessToken) {
      localStorage.setItem('accessToken', accessToken)
    }
    return data
  } catch (error) {
    throw error
  }
}
const postSignup = async ({ formData }: { formData: FormData }) => {
  const { data, headers } = await mutipartApi.post('/join', formData)

  const accessToken = headers['authorization']
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken)
  }
  return data
}

const postVerifyEmail = async ({ email }: { email: string }) => {
  const { data } = await Api.post(`/verify-email`, {
    email,
  })

  return data
}

const postVerifyNum = async ({
  email,
  verificationCode,
}: {
  email: string
  verificationCode: number
}) => {
  const { data } = await Api.post(`/verification-code`, {
    email,
    code: verificationCode,
  })

  return data
}

const silentRefresh = async () => {
  try {
    const { data } = await Api.post('/reIssue')

    localStorage.setItem('accessToken', data.accessToken)

    return data
  } catch (error) {
    throw error
  }
}

const postCheckId = async ({ username }: { username: string }) => {
  const { data } = await Api.post(`/idCheck`, {
    username,
  })

  return data
}
const authApi = {
  postSingin,
  postSignup,
  postVerifyEmail,
  postVerifyNum,
  silentRefresh,
  postCheckId,
}

export default authApi
