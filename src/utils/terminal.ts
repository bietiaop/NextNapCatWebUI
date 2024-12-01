import { LogLevel } from '@/const/enum'

export const gradientText = (
  text: string,
  startColor: [number, number, number] = [255, 0, 0],
  endColor: [number, number, number] = [0, 0, 255],
  bold: boolean = false,
  italic: boolean = false,
  underline: boolean = false
) => {
  const steps = text.length
  const colorStep = startColor.map(
    (start, index) => (endColor[index] - start) / steps
  )

  let coloredText = ''
  for (let i = 0; i < steps; i++) {
    const color = startColor.map((start, index) =>
      Math.round(start + colorStep[index] * i)
    )
    coloredText += `\x1b[38;2;${color[0]};${color[1]};${color[2]}m${text[i]}`
  }

  // 添加样式
  if (bold) {
    coloredText = `\x1b[1m${coloredText}`
  }
  if (italic) {
    coloredText = `\x1b[3m${coloredText}`
  }
  if (underline) {
    coloredText = `\x1b[4m${coloredText}`
  }

  return coloredText + '\x1b[0m' // 重置颜色和样式
}

export const logColor = {
  [LogLevel.DEBUG]: [50, 230, 10],
  [LogLevel.INFO]: [130, 130, 130],
  [LogLevel.WARN]: [255, 200, 50],
  [LogLevel.ERROR]: [255, 0, 0],
  [LogLevel.FATAL]: [255, 0, 0]
} as const
export const colorizeLogLevel = (content: string) => {
  const logLevel = content.match(/\[[a-zA-Z]+\]/) || []
  let _content = content
  const level =
    (logLevel?.[0]?.replace('[', '').replace(']', '') as LogLevel) ??
    LogLevel.INFO
  switch (level) {
    case LogLevel.DEBUG:
      _content = gradientText(
        _content,
        [...logColor[LogLevel.DEBUG]],
        [...logColor[LogLevel.DEBUG]]
      )
      break
    case LogLevel.INFO:
      _content = gradientText(
        _content,
        [...logColor[LogLevel.INFO]],
        [...logColor[LogLevel.INFO]]
      )
      break
    case LogLevel.WARN:
      _content = gradientText(
        _content,
        [...logColor[LogLevel.WARN]],
        [...logColor[LogLevel.WARN]]
      )
      break
    case LogLevel.ERROR:
      _content = gradientText(
        _content,
        [...logColor[LogLevel.ERROR]],
        [...logColor[LogLevel.ERROR]]
      )
      break
    case LogLevel.FATAL:
      _content = gradientText(
        _content,
        [...logColor[LogLevel.FATAL]],
        [...logColor[LogLevel.FATAL]]
      )
      break
    default:
      _content = gradientText(
        _content,
        [...logColor[LogLevel.INFO]],
        [...logColor[LogLevel.INFO]]
      )
  }
  return {
    content: _content,
    level
  }
}

export const colorizeLogLevelWithTag = (content: string, level: LogLevel) => {
  level = level?.toLowerCase() as LogLevel
  let _content = content
  switch (level) {
    case LogLevel.DEBUG:
      _content = '[DEBUG] ' + _content
      _content = gradientText(
        _content,
        [...logColor[LogLevel.DEBUG]],
        [...logColor[LogLevel.DEBUG]]
      )
      break
    case LogLevel.INFO:
      _content = '[INFO] ' + _content
      _content = gradientText(
        _content,
        [...logColor[LogLevel.INFO]],
        [...logColor[LogLevel.INFO]]
      )
      break
    case LogLevel.WARN:
      _content = '[WARN] ' + _content
      _content = gradientText(
        _content,
        [...logColor[LogLevel.WARN]],
        [...logColor[LogLevel.WARN]]
      )
      break
    case LogLevel.ERROR:
      _content = '[ERROR] ' + _content
      _content = gradientText(
        _content,
        [...logColor[LogLevel.ERROR]],
        [...logColor[LogLevel.ERROR]]
      )
      break
    case LogLevel.FATAL:
      _content = '[FATAL] ' + _content
      _content = gradientText(
        _content,
        [...logColor[LogLevel.FATAL]],
        [...logColor[LogLevel.FATAL]]
      )
      break
    default:
      _content = gradientText(
        _content,
        [...logColor[LogLevel.INFO]],
        [...logColor[LogLevel.INFO]]
      )
  }
  return _content
}
