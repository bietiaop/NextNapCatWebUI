import { Terminal } from '@xterm/xterm'
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import { WebLinksAddon } from '@xterm/addon-web-links'
import { FitAddon } from '@xterm/addon-fit'
import { WebglAddon } from '@xterm/addon-webgl'
import clsx from 'clsx'

import '@xterm/xterm/css/xterm.css'
import { gradientText } from '@/utils/terminal'
import { useTheme } from '@/hooks/use-theme'

export type XTermRef = {
  write: (
    ...args: Parameters<Terminal['write']>
  ) => ReturnType<Terminal['write']>
  writeAsync: (data: Parameters<Terminal['write']>[0]) => Promise<void>
  writeln: (
    ...args: Parameters<Terminal['writeln']>
  ) => ReturnType<Terminal['writeln']>
  writelnAsync: (data: Parameters<Terminal['writeln']>[0]) => Promise<void>
  clear: () => void
}
const XTerm = forwardRef<XTermRef, React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => {
    const domRef = useRef<HTMLDivElement>(null)
    const terminalRef = useRef<Terminal | null>(null)
    const { className, ...rest } = props
    const { theme } = useTheme()
    useEffect(() => {
      if (!domRef.current) {
        return
      }
      const terminal = new Terminal()
      terminalRef.current = terminal
      const fitAddon = new FitAddon()
      terminal.loadAddon(new WebLinksAddon())
      terminal.loadAddon(fitAddon)
      terminal.open(domRef.current)
      terminal.loadAddon(new WebglAddon())
      fitAddon.fit()

      terminal.writeln(
        gradientText(
          'Welcome to NapCat WebUI',
          [255, 0, 0],
          [0, 255, 0],
          true,
          true,
          true
        )
      )

      const resizeObserver = new ResizeObserver(() => {
        fitAddon.fit()
      })
      resizeObserver.observe(domRef.current)

      return () => {
        terminal.dispose()
        resizeObserver.disconnect()
      }
    }, [])

    useEffect(() => {
      if (terminalRef.current) {
        terminalRef.current.options.theme = {
          background: theme === 'dark' ? '#000' : '#fff',
          foreground: theme === 'dark' ? '#fff' : '#000',
          selectionBackground: theme === 'dark' ? '#666' : '#ddd',
          cursor: theme === 'dark' ? '#fff' : '#000',
          cursorAccent: theme === 'dark' ? '#000' : '#fff',
          black: theme === 'dark' ? '#000' : '#fff',
          brightYellow: theme === 'dark' ? '#ff0' : '#FFBF00'
        }
      }
    }, [theme])

    useImperativeHandle(
      ref,
      () => ({
        write: (...args) => {
          return terminalRef.current?.write(...args)
        },
        writeAsync: async (data) => {
          return new Promise((resolve) => {
            terminalRef.current?.write(data, resolve)
          })
        },
        writeln: (...args) => {
          return terminalRef.current?.writeln(...args)
        },
        writelnAsync: async (data) => {
          return new Promise((resolve) => {
            terminalRef.current?.writeln(data, resolve)
          })
        },
        clear: () => {
          terminalRef.current?.clear()
        }
      }),
      []
    )

    return (
      <div
        className={clsx(
          'p-2 rounded-md shadow-sm border border-default-200 h-96',
          theme === 'dark' ? 'bg-black' : 'bg-white',
          className
        )}
        {...rest}
        ref={domRef}
      />
    )
  }
)

export default XTerm
