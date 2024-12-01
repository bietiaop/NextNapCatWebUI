import { useEffect, useRef } from 'react'
import type { XTermRef } from '../xterm'
import XTerm from '../xterm'
import WebUIManager from '@/controllers/webui_manager'
import toast from 'react-hot-toast'
import { colorizeLogLevelWithTag } from '@/utils/terminal'

const RealTimeLogs = () => {
  const Xterm = useRef<XTermRef>(null)
  const wirteStream = (data: string) => {
    try {
      const _data = data
        .split(/(?<=})\n/)
        .map((line) => {
          try {
            const json = JSON.parse(line)
            return colorizeLogLevelWithTag(
              json.message.split('\n').join('\r\n'),
              json.level
            )
          } catch (error) {
            return line
          }
        })
        .join('\r\n')
      Xterm.current?.clear()
      Xterm.current?.write(_data)
    } catch (error) {
      toast.error('获取实时日志失败')
    }
  }
  useEffect(() => {
    if (!Xterm.current) {
      return
    }
    Xterm.current.writeln('实时日志正在加班赶哦')
  }, [])
  useEffect(() => {
    try {
      WebUIManager.getRealTimeLogs(wirteStream)
    } catch (error) {
      toast.error('获取实时日志失败')
    }
  }, [])
  return <XTerm className="w-full h-full" ref={Xterm} />
}

export default RealTimeLogs
