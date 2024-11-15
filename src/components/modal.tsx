import Link from 'next/link'
import React from 'react'

export default function Modal({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Link href="/" />
      {children}
    </div>
  )
}
