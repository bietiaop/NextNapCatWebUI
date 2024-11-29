import { useEffect, useRef } from 'react'
import type { XTermRef } from '../xterm'
import XTerm from '../xterm'

const RealTimeLogs = () => {
  const Xterm = useRef<XTermRef>(null)
  useEffect(() => {
    if (!Xterm.current) {
      return
    }
    Xterm.current.writeln('实时日志正在加班赶哦')
  }, [])
  return <XTerm className="w-full" ref={Xterm} />
}

export default RealTimeLogs
