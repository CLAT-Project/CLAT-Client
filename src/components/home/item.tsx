'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import SubMenuItem from './sub-item'

interface ISidebarItem {
  id: string
  name: string
  path: string
  items?: ISubItem[]
}

interface ISubItem {
  id: string
  name: string
  path: string
}

const SidebarItem = ({ item }: { item: ISidebarItem }) => {
  const { name, items, path } = item
  const [expanded, setExpanded] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  //   설정, 모아보기, 고객센터 사이드바
  const onClick = () => {
    if (items && items.length > 0) {
      return setExpanded(!expanded)
    }
    return router.push(path)
  }

  const isActive = useMemo(() => {
    if (items && items.length > 0) {
      if (items.find((subItem) => subItem.path === pathname)) {
        setExpanded(true)
        return true
      }
    }

    return path === pathname
  }, [items, path, pathname])

  return (
    <>
      <div
        className={`flex cursor-pointer items-center justify-between p-3 hover:font-semibold hover:text-blue-500 ${isActive && 'font-semibold text-blue-500'} `}
        onClick={onClick}
      >
        <div>
          <p className="whitespace-nowrap font-semibold">{name}</p>
        </div>
        <div>
          {items && items.length > 0 && (
            <Image
              src="/images/svg/triangledown.svg"
              alt="arrow-login"
              width={15}
              height={15}
              className={`cursor-pointer transition-transform ${expanded ? 'rotate-[180deg] duration-200' : ''}`}
            />
          )}
        </div>
      </div>

      {/* 서브메뉴 */}
      {expanded && items && items.length > 0 && (
        <ul className="mb-5 ml-[50px] list-disc space-y-2 text-sm text-gray-700 marker:text-gray-700">
          {items.map((subItem) => (
            <SubMenuItem key={subItem.path} item={subItem} />
          ))}
        </ul>
      )}
    </>
  )
}

export default SidebarItem
