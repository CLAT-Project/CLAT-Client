'use client'

import { useEffect } from 'react'
import useAuth from '@/hooks/common/useAuth'
import { useRouter } from 'next/navigation'

const PrivateRouter = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  return isAuthenticated ? children : null
}

export default PrivateRouter
