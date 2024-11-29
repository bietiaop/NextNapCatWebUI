import key from '@/const/key'
import { Input } from '@nextui-org/input'
import { Select, SelectItem } from '@nextui-org/select'
import { useLocalStorage } from '@uidotdev/usehooks'
import { useEffect, useState } from 'react'

interface WebConfigProps {
  queryURL?: string
}

const WebConfig: React.FC<WebConfigProps> = (props) => {
  const { queryURL } = props
  const [backendURL, setBackendURL] = useLocalStorage(
    key.storeURL,
    'http://localhost:6099'
  )
  const backendURLValue = backendURL.split('://')
  const [inputValue, setInputValue] = useState(backendURLValue[1])
  const [protocol, setProtocol] = useState<'http://' | 'https://'>(
    `${backendURLValue[0]}://` as 'http://' | 'https://'
  )

  useEffect(() => {
    setBackendURL(`${protocol}${inputValue}`)
  }, [inputValue, protocol, setBackendURL])

  useEffect(() => {
    if (queryURL) {
      const queryURLValue = queryURL.split('://')
      if (
        queryURLValue[0] &&
        queryURLValue[1] &&
        queryURLValue[1] !== inputValue &&
        ['http', 'https'].includes(queryURLValue[0])
      ) {
        setInputValue(queryURLValue[1])
        setProtocol(`${queryURLValue[0]}://` as 'http://' | 'https://')
      }
    }
  }, [])
  return (
    <div className="px-1 py-2">
      <div className="mb-2 hm-medium text-default-400">后端地址</div>
      <Input
        value={inputValue}
        size="lg"
        classNames={{
          label: 'mb-4',
          inputWrapper: 'shadow-xl'
        }}
        startContent={
          <Select
            className="w-32 -ml-1.5"
            aria-label="protocol"
            size="sm"
            onChange={(e) => {
              let value = e.target.value as 'http://' | 'https://'
              setProtocol(value)
            }}
            items={[
              { value: 'http://', label: 'http://' },
              { value: 'https://', label: 'https://' }
            ]}
            selectedKeys={[protocol]}
          >
            {(item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            )}
          </Select>
        }
        onChange={(e) => {
          let input = e.target.value
          setInputValue(input)
        }}
        placeholder="localhost:6099"
        description={`${protocol}${inputValue}/api`}
      />
    </div>
  )
}

export default WebConfig
