'use client'

import React, { Suspense } from 'react'
import SocialLogin from './SocialLogin'

const SocialLoginPage = () => {
  return (
    <div>
      <Suspense>
        <SocialLogin />
      </Suspense>
    </div>
  )
}

export default SocialLoginPage
