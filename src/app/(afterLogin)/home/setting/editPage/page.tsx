'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import NavigationBar from '@/components/home/navigationBar'

export default function EditPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Updated Profile Data:', formData)
    router.push('/mypage') // 수정 후 MyPage로 리다이렉트
  }

  return (
    <div className="h-screen">
      <NavigationBar />

      <div className="flex-1 bg-white p-10">
        <h1 className="mb-4 text-2xl font-bold">Edit Profile</h1>
        <form
          onSubmit={handleSubmit}
          className="rounded-lg bg-white p-6 shadow-md"
        >
          <div className="mb-4">
            <label className="mb-2 block text-lg font-semibold" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-lg border px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-lg font-semibold" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-lg border px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-lg font-semibold" htmlFor="bio">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full rounded-lg border px-3 py-2"
            />
          </div>
          <button
            type="submit"
            className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  )
}
