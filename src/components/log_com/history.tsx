import { Card, CardBody, CardHeader } from '@nextui-org/card'
import XTerm from '../xterm'
import type { XTermRef } from '../xterm'
import { Select, SelectItem } from '@nextui-org/select'
import { Button } from '@nextui-org/button'
import { useEffect, useRef } from 'react'
import PageLoading from '../page_loading'

export interface HistoryLogsProps {
  list: string[]
  onSelect: (name: string) => void
  selectedLog?: string
  refreshList: () => void
  refreshLog: () => void
  listLoading?: boolean
  logLoading?: boolean
  listError?: Error
  logContent?: string
}
const HistoryLogs: React.FC<HistoryLogsProps> = (props) => {
  const {
    list,
    onSelect,
    selectedLog,
    refreshList,
    refreshLog,
    listLoading,
    logContent,
    listError,
    logLoading
  } = props
  const Xterm = useRef<XTermRef>(null)

  useEffect(() => {
    if (!Xterm.current || !logContent) {
      return
    }
    Xterm.current.clear()
    const _logContent = logContent.replace(/\n/g, '\r\n')
    Xterm.current.write(_logContent)
    Xterm.current.write('\nnapcat@webui:~$ ')
  }, [logContent])

  return (
    <Card className="max-w-full">
      <CardHeader className="flex-row justify-start gap-3">
        <Select
          label="选择日志"
          size="sm"
          isLoading={listLoading}
          errorMessage={listError?.message}
          classNames={{
            trigger: 'hover:!bg-content3'
          }}
          placeholder="选择日志"
          onChange={(e) => {
            const value = e.target.value
            if (!value) {
              return
            }
            onSelect(value)
          }}
          selectedKeys={[selectedLog || '']}
          items={list.map((name) => ({
            value: name,
            label: name
          }))}
        >
          {(item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          )}
        </Select>
        <Button onClick={refreshList}>刷新列表</Button>
        <Button onClick={refreshLog}>刷新日志</Button>
      </CardHeader>
      <CardBody className="relative">
        <PageLoading loading={logLoading} />
        <XTerm className="w-full" ref={Xterm} />
      </CardBody>
    </Card>
  )
}

export default HistoryLogs
