'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSocialRedirectMutation } from '@/hooks/mutations/useAuthMutation'

function SocialRedirectPage() {
  const [username, setUsername] = useState<string | null>(null)
  const [hasMutated, setHasMutated] = useState(false) // 중복 요청 x
  const router = useRouter()

  const socialRedirect = useSocialRedirectMutation({
    onSuccess: () => {
      router.push('/home')
    },
  })

  // useEffect(() => {
  //   const searchParams = new URLSearchParams(window.location.search)
  //   const username = searchParams.get('username')

  //   if (username) {
  //     socialRedirect.mutate({ username })
  //   } else {
  //     console.error('사용자 이름이 없습니다')
  //   }
  // }, [socialRedirect])

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const usernameParams = searchParams.get('username')

    if (usernameParams) {
      setUsername(usernameParams)
    } else {
      console.error('사용자 이름이 없습니다')
    }
  }, [])

  useEffect(() => {
    if (username && !hasMutated) {
      socialRedirect.mutate({ username })
      setHasMutated(true)
    }
  }, [username, hasMutated, socialRedirect])

  return null
}
export default SocialRedirectPage
