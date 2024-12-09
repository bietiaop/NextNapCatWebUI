import { Button } from '@nextui-org/button'
import { Card, CardBody } from '@nextui-org/card'
import { Input } from '@nextui-org/input'
import { useState, useCallback } from 'react'
import toast from 'react-hot-toast'
import { useWebSocketDebug } from '@/hooks/use-websocket-debug'

import OneBotMessageList from '@/components/onebot/message_list'
import OneBotSendModal from '@/components/onebot/send_modal'
import WSStatus from '@/components/onebot/ws_status'
import { useLocalStorage } from '@uidotdev/usehooks'
import key from '@/const/key'

export default function WSDebug() {
  const [url] = useLocalStorage(key.storeURL, 'http://127.0.0.1:6099')
  const defaultWsUrl = url.replace('http', 'ws').replace(':6099', ':3000')
  const [socketConfig, setSocketConfig] = useState({
    url: defaultWsUrl,
    token: ''
  })
  const [inputUrl, setInputUrl] = useState(socketConfig.url)
  const [inputToken, setInputToken] = useState(socketConfig.token)

  const { sendMessage, readyState, FilterMessagesType, filteredMessages } =
    useWebSocketDebug(socketConfig.url, socketConfig.token)

  const handleConnect = useCallback(() => {
    if (!inputUrl.startsWith('ws://') && !inputUrl.startsWith('wss://')) {
      toast.error('WebSocket URL 不合法')
      return
    }
    setSocketConfig({
      url: inputUrl,
      token: inputToken
    })
  }, [inputUrl, inputToken])

  return (
    <div className="h-[calc(100vh-3rem)] overflow-hidden flex flex-col">
      <Card className="mx-2 mt-2 flex-shrink-0">
        <CardBody className="gap-2">
          <div className="grid gap-2 items-center md:grid-cols-5">
            <Input
              className="col-span-2"
              label="WebSocket URL"
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="输入 WebSocket URL"
            />
            <Input
              className="col-span-2"
              label="Token"
              type="text"
              value={inputToken}
              onChange={(e) => setInputToken(e.target.value)}
              placeholder="输入 Token"
            />
            <div className="flex-shrink-0 flex gap-2 col-span-2 md:col-span-1">
              <Button
                color="danger"
                onPress={handleConnect}
                size="lg"
                radius="full"
                className="w-full md:w-auto"
              >
                连接
              </Button>
            </div>
          </div>
          <div className="p-2 border border-default-100 rounded-md dark:bg-[rgb(30,30,30)]">
            <div className="grid gap-2 md:grid-cols-5 items-center md:w-fit">
              <WSStatus state={readyState} />
              <div className="md:w-64 max-w-full col-span-2">
                {FilterMessagesType}
              </div>
              <OneBotSendModal sendMessage={sendMessage} />
            </div>
          </div>
        </CardBody>
      </Card>

      <div className="flex-1 overflow-hidden">
        <OneBotMessageList messages={filteredMessages} />
      </div>
    </div>
  )
}
