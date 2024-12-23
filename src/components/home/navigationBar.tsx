'use client'

import SidebarItem from './item'

interface IsidebarItem {
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
const generateId = () =>
  `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

const items: IsidebarItem[] = [
  { id: generateId(), name: '설정', path: '/home/setting/myPage' },
  {
    id: generateId(),
    name: '모아보기',
    path: '/home/collect/',
    items: [
      {
        id: generateId(),
        name: '질문 모아보기',
        path: '/home/collect/questions',
      },
      { id: generateId(), name: '자료 모아보기', path: '/home/collect/files' },
      { id: generateId(), name: '답변모아보기', path: '/home/collect/answers' },
      { id: generateId(), name: '북마크', path: '/home/collect/bookmarks' },
    ],
  },
  {
    id: generateId(),
    name: '고객센터',
    path: '/home/csCenter/contactUs/',
    items: [
      {
        id: generateId(),
        name: '자주 묻는 질문',
        path: '/home/csCenter/contactUs',
      },
      {
        id: generateId(),
        name: '커뮤니티이용규칙',
        path: '/home/csCenter/rules',
      },
      {
        id: generateId(),
        name: '개인정보처리방침',
        path: '/home/csCenter/privacyPolicy',
      },
      {
        id: generateId(),
        name: '청소년보호정책',
        path: '/home/csCenter/youthPolicy',
      },
      {
        id: generateId(),
        name: '서비스이용약관',
        path: '/home/csCenter/terms',
      },
    ],
  },
]

export default function NavigationBar() {
  return (
    <div className="hidden h-[60%] w-full min-w-40 rounded-lg border border-black bg-white p-5 md:block">
      <ul className="flex-col">
        {items.map((item) => (
          <SidebarItem key={item.id} item={item} />
        ))}
      </ul>
    </div>
  )
}
