import { useEffect, useRef, useState } from 'react'
import type { XTermRef } from '../xterm'
import XTerm from '../xterm'
import WebUIManager, { Log } from '@/controllers/webui_manager'
import toast from 'react-hot-toast'
import { colorizeLogLevelWithTag } from '@/utils/terminal'
import LogLevelSelect from './log_level_select'
import type { Selection } from '@react-types/shared'
import { Button } from '@nextui-org/button'
import { IoDownloadOutline } from 'react-icons/io5'

const RealTimeLogs = () => {
  const Xterm = useRef<XTermRef>(null)
  const [logLevel, setLogLevel] = useState<Selection>('all')
  const [dataArr, setDataArr] = useState<Log[]>([])

  const onDownloadLog = () => {
    const logContent = dataArr
      .filter((log) => {
        if (logLevel === 'all') {
          return true
        }
        return logLevel.has(log.level)
      })
      .map((log) => colorizeLogLevelWithTag(log.message, log.level))
      .join('\r\n')
    const blob = new Blob([logContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'napcat.log'
    a.click()
    URL.revokeObjectURL(url)
  }

  const writeStream = () => {
    try {
      const _data = dataArr
        .filter((log) => {
          if (logLevel === 'all') {
            return true
          }
          return logLevel.has(log.level)
        })
        .slice(-100)
        .map((log) => colorizeLogLevelWithTag(log.message, log.level))
        .join('\r\n')
      Xterm.current?.clear()
      Xterm.current?.write(_data)
    } catch (error) {
      console.error(error)
      toast.error('获取实时日志失败')
    }
  }

  useEffect(() => {
    writeStream()
  }, [logLevel, dataArr])

  useEffect(() => {
    let abort: AbortController
    const subscribeLogs = () => {
      try {
        abort = WebUIManager.getRealTimeLogs((data) => {
          setDataArr((prev) => {
            const newData = [...prev, ...data]
            if (newData.length > 1000) {
              newData.splice(0, newData.length - 1000)
            }
            return newData
          })
        })
      } catch (error) {
        toast.error('获取实时日志失败')
      }
    }

    subscribeLogs()

    return () => {
      abort.abort()
      setDataArr([])
    }
  }, [])

  return (
    <div className="w-full h-full">
      <div className="mb-2 flex items-center gap-2">
        <LogLevelSelect
          selectedKeys={logLevel}
          onSelectionChange={setLogLevel}
        />
        <Button
          className="flex-shrink-0"
          onClick={onDownloadLog}
          startContent={<IoDownloadOutline className="text-lg" />}
        >
          下载日志
        </Button>
      </div>
      <XTerm className="w-full h-full pb-3 overflow-hidden" ref={Xterm} />
    </div>
  )
}

export default RealTimeLogs
