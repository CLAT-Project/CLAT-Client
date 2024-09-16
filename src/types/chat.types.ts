export interface IChatMessag {
  courseName: string
  roomName: string
  messageFileResponseDTOS: {
    messageId: string
    message: string
    senderName: string
    timestamp: string
    imageUrl: string[]
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
