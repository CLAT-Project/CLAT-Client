// eslint-disable-next-line import/no-cycle
import { Api, multipartApi, refreshApi } from '@/apis/axios'
import { Profile } from '@/types/user.type'

/**
 * @description 로그인 요청
 * @param param { username, password }
 * @returns
 */
const postSingin = async ({
  username,
  password,
}: {
  username: string
  password: string
}) => {
  const { data, headers } = await Api.post(`/login`, {
    username,
    password,
  })

  const accessToken = headers.access

  if (accessToken) {
    localStorage.setItem('accessToken', accessToken)
  }
  return data
}

/**
 * @description 회원가입 요청
 * @description multipart/form-data 형식으로 요청
 * @param param { formData : joinDto -> joinReqDTO로: json형태의 입력값, file: 이미지 파일 }
 * @returns user name을 반환
 */
const postSignup = async ({ formData }: { formData: FormData }) => {
  const { data, headers } = await multipartApi.post('/join', formData)

  const accessToken = headers.access

  if (accessToken) {
    localStorage.setItem('accessToken', accessToken)
  }
  return data
}
/**
 * @description 이메일 인증 요청
 * @param param { email:string }
 * @returns
 */
const postVerifyEmail = async ({ email }: { email: string }) => {
  const { data } = await Api.post(`/verify-email`, {
    email,
  })

  return data
}
/**
 * @description 인증번호 확인 요청
 * @param param { email, verificationCode: 6자리 숫자 }
 * @returns
 */
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
/**
 * @description 리프레시 토큰으로 새로운 엑세스 토큰 발급 요청
 * @param param
 * @returns
 */
const silentRefresh = async () => {
  const { data, headers } = await refreshApi.post(`reIssue`)

  const accessToken = headers.access

  localStorage.setItem('accessToken', accessToken)

  return { data, headers }
}
/**
 * @description 중복 아이디 체크 요청
 * @param param { username: string }
 * @returns
 */
const postCheckId = async ({ username }: { username: string }) => {
  const { data } = await Api.post(`/idCheck`, {
    username,
  })

  return data
}

const postLogout = async () => {
  const { data } = await Api.post('/logout')

  localStorage.removeItem('accessToken')
  return data
}

// 삭제하는 요청만 담당
const postDelete = async ({
  username,
  password,
}: {
  username: string
  password: string
}) => {
  const accessToken = localStorage.getItem('accessToken')

  if (!accessToken) {
    throw new Error('로그인 정보가 없습니다. 다시 로그인 해주세요.')
  }

  try {
    const response = await Api.post(
      '/delete',
      { username, password },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )

    localStorage.removeItem('accessToken')

    return response.data
  } catch (error: any) {
    if (error.response?.status === 401) {
      throw new Error(error.response.data.message || '인증 실패')
    }
    // console.error('탈퇴 요청 중 오류 발생:', error)
    throw new Error(
      error.response?.data?.message ||
        '탈퇴 요청에 실패했습니다. 다시 시도해주세요.',
    )
  }
}

// 비밀번호 찾기
const postFindPwd = async ({
  username,
  email,
}: {
  username: string
  email: string
}) => {
  const { data } = await Api.post('/member/findPwd', { username, email })

  return data
}

const getUserName = async () => {
  const response = await Api.get('/member')
  return response.data
}

// 비밀번호 재확인
const postReconfirmPassword = async ({ password }: { password: string }) => {
  const accessToken = localStorage.getItem('accessToken')

  try {
    const response = await Api.post(
      '/my-profile/auth',
      { password },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
    return response.data
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || '비밀번호 확인에 실패했습니다. ',
    )
  }
}

const postModifyProfile = async (newData: Profile, emailVerified: boolean) => {
  const query = `?emailVerified=${emailVerified}`

  const accessToken = localStorage.getItem('accessToken')

  const { data } = await Api.put(`/my-profile/modify${query}`, newData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
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
  postLogout,
  postDelete,
  postFindPwd,
  getUserName,
  postReconfirmPassword,
  postModifyProfile,
}

export default authApi
