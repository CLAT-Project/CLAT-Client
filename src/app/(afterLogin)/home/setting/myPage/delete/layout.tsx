import React from 'react'

interface LayoutProps {
  children: React.ReactNode
  params: { modal: React.ReactNode }
}

export default function Layout({ children, params: { modal } }: LayoutProps) {
  return (
    <div>
      {children}
      {modal}
    </div>
  )
}
