import { Client, IMessage, Stomp } from '@stomp/stompjs'
import SockJS from 'sockjs-client'

// WebSocket URL
const SERVER_URL = `https://c-lat.site/ws`

const client = new Client({
  brokerURL: SERVER_URL,
  connectHeaders: {
    Authorization:
      typeof window !== 'undefined'
        ? `Bearer ${localStorage.getItem('token')}`
        : '',
  },
  webSocketFactory: () => new SockJS(SERVER_URL),
  onConnect: (frame) => {
    console.log('Connected: ', frame)
  },
  onDisconnect: (frame) => {
    console.log('Disconnected: ', frame)
  },
  debug: (str) => {
    console.log(new Date(), str)
  },
})

export const connect = (
  roomId: string,
  onMessage: (message: IMessage) => void,
) => {
  client.activate()

  client.onConnect = () => {
    client.subscribe(`/sub/chat/${roomId}`, (message) => {
      onMessage(message)
    })
  }
}

// 메시지 보내기
export const sendMessage = (destination: string, body: string) => {
  if (client.connected) {
    client.publish({ destination, body })
  } else {
    console.warn('Client is not connected')
  }
}

// 클라이언트 비활성화
export const disconnect = () => {
  client.deactivate()
}
