'use client'

import React, { useState } from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

type Props = {
  children: React.ReactNode
}

function TQueryProvider({ children }: Props) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {},
      },
    }),
  )

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}

export default TQueryProvider
