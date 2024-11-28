import useDialog from '@/hooks/use-dialog'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/popover'
import { Select, SelectItem } from '@nextui-org/select'
import { useLocalStorage } from '@uidotdev/usehooks'
import { useState } from 'react'
import { IoSettings } from 'react-icons/io5'

const WebConfig = () => {
  const [backendURL, setBackendURL] = useLocalStorage(
    'storeURL',
    'http://localhost:3000'
  )
  const backendURLValue = backendURL.split('://')
  const [inputValue, setInputValue] = useState(backendURLValue[1])
  const [protocol, setProtocol] = useState<'http://' | 'https://'>(
    `${backendURLValue[0]}://` as 'http://' | 'https://'
  )
  const dialog = useDialog()
  const onSave = () => {
    setBackendURL(`${protocol}${inputValue}`)
    dialog.alert({
      title: '保存成功',
      content: '设置已保存，刷新页面生效',
      onConfirm: () => {
        window.location.reload()
      }
    })
  }
  return (
    <Popover placement="left-start" showArrow={true}>
      <PopoverTrigger>
        <Button
          className="fixed right-4 top-4"
          isIconOnly
          radius="full"
          size="lg"
        >
          <IoSettings size={24} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="z-0">
        <div className="px-1 py-2">
          <div className="mb-2 font-bold">设置后端地址</div>
          <Input
            value={inputValue}
            className="w-72 md:w-80 lg:w-[400px]"
            classNames={{
              label: 'mb-5'
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
            placeholder="localhost:3000"
            description={`${protocol}${inputValue}/api`}
          />
          <div className="flex justify-between">
            <Button
              className="mt-2 mr-2"
              onClick={() => {
                setInputValue(backendURL)
              }}
              color="default"
            >
              重置
            </Button>
            <Button
              className="mt-2"
              onClick={() => {
                onSave()
              }}
              color="primary"
            >
              保存
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default WebConfig
