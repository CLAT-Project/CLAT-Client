export interface IChatMessag {
  content: {
    messageId: number
    message: string
    senderName: string
    timestamp: string
    imageUrl: string[]
    answerId?: number
    answer: string
    likeResDTOS?: string[]
  }[]
}

export interface ChatFormData {
  message: string
  anonymous: boolean
}

export interface IChatImageResponse {
  imageId: number
  imageUrl: string
}

export interface IUserClassResponse {
  chatRooms: {
    chatRoomId: number
    week: number
  }[]
  courseId: number
  courseName: string
  courseCode: string
  end_date: string
  room: string
  start_date: string
}

export interface IChatMemoResponse {
  memo: string
  messageId: number
  memoId: number
}

export interface IChatRoomInfoResponse {
  courseName: string
  chatRoomName: string
  creationTime: string
  roomKey: number
  week: number
}
