import { useEffect, useRef } from 'react'
import type { XTermRef } from '../xterm'
import XTerm from '../xterm'
import WebUIManager from '@/controllers/webui_manager'
import toast from 'react-hot-toast'

const RealTimeLogs = () => {
  const Xterm = useRef<XTermRef>(null)
  const wirteStream = (data: string) => {
    const _data = data.replace(/\n/g, '\r\n')
    Xterm.current?.clear()
    Xterm.current?.write(_data)
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
  return <XTerm className="w-full" ref={Xterm} />
}

export default RealTimeLogs
