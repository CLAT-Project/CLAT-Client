'use Client'

import { usePathname, useRouter } from 'next/navigation'
import React, { useMemo } from 'react'

interface ISubItem {
  id: string
  name: string
  path: string
}

export default function SubMenuItem({ item }: { item: ISubItem }) {
  const { name, path } = item
  const router = useRouter()
  const pathname = usePathname()

  const onClick = () => {
    router.push(path)
  }

  const isActive = useMemo(() => path === pathname, [path, pathname])

  return (
    <div onClick={onClick}>
      <li
        className={`cursor-pointer hover:font-semibold hover:text-blue-500 ${isActive && 'font-semibold text-blue-500'}`}
      >
        <p className="whitespace-nowrap">{name}</p>
      </li>
    </div>
  )
}
