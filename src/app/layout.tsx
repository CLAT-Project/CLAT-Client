import TQueryProvider from '@/TQueryProvider'
import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import '../styles/global.css'
import { Toaster } from 'react-hot-toast'

const notoSansKR = Noto_Sans_KR({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CLAT',
  description: 'CLAT : 강의 익명 질문 채팅 서비스',
  icons: {
    icon: '/images/svg/logo.svg',
  },
  openGraph: {
    images: '/images/svg/logo.svg',
    type: 'website',
    siteName: 'ASKON',
    locale: 'ko_KR',
    title: 'ASKON',
    description: 'ASKON : 강의 익명 질문 채팅 서비스',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <TQueryProvider>
        <body className={notoSansKR.className}>
          {children}
          <Toaster />
        </body>
      </TQueryProvider>
    </html>
  )
}
