import { Client, IMessage } from '@stomp/stompjs'
import SockJS from 'sockjs-client'

// WebSocket URL
const SERVER_URL = `https://clat.duckdns.org/ws`
let client: Client | null = null

const createClient = () => {
  return new Client({
    brokerURL: SERVER_URL,
    connectHeaders: {
      Authorization: `${localStorage.getItem('accessToken')}`,
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
    onStompError: (frame) => {
      console.log('STOMP Error: ', frame)
    },
  })
}

export const connect = (
  roomId: string,
  onMessage: (message: IMessage) => void,
) => {
  if (!client) {
    client = createClient()
  }

  client.onConnect = () => {
    client?.subscribe(
      `/sub/chat/${roomId}`,
      (message) => {
        onMessage(message)
      },
      {
        Authorization: `${localStorage.getItem('accessToken')}`,
      },
    )
  }

  client.activate()
}

// 클라이언트 초기화 및 연결
export const initializeAndConnect = (
  roomId: string,
  onMessage: (message: IMessage) => void,
) => {
  client = createClient()
  connect(roomId, onMessage)
}

// 메시지 보내기
export const sendMessage = (destination: string, body: string) => {
  if (client?.connected) {
    console.log('publish 헤더', client.connectHeaders)
    client.publish({
      destination,
      body,
      headers: {
        Authorization: `${localStorage.getItem('accessToken')}`,
      },
    })
  } else {
    console.warn('Client is not connected')
  }
}

// 클라이언트 비활성화
export const disconnect = () => {
  client?.deactivate()
  client = null
}

// 토큰 갱신 후 재연결 함수
export const reconnectWithNewToken = (
  roomId: string,
  onMessage: (message: IMessage) => void,
) => {
  disconnect()
  console.log('reconnectWithNewToken')
  initializeAndConnect(roomId, onMessage)
}
