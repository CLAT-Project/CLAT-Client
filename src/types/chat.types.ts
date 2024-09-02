export interface IChatMessag {
  courseName: string;
  roomName: string;
  messageFileResponseDTOS: {
    messageId: string;
    message: string;
    senderName: string;
    timeStamp: string;
    imageUrl: string[]
  }[]
}

export interface ChatFormData {
  message: string
  anonymous: boolean
}