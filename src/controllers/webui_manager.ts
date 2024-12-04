import { LogLevel } from '@/const/enum'
import { requestServerWithFetch, serverRequest } from '@/utils/request'

export interface Log {
  level: LogLevel
  message: string
}

export default class WebUIManager {
  public static async checkWebUiLogined() {
    const { data } =
      await serverRequest.post<ServerResponse<boolean>>('/auth/check')
    return data.data
  }

  public static async loginWithToken(token: string) {
    const { data } = await serverRequest.post<ServerResponse<AuthResponse>>(
      '/auth/login',
      { token }
    )
    return data.data.Credential
  }

  public static async getLogList() {
    const { data } =
      await serverRequest.get<ServerResponse<string[]>>('/Log/GetLogList')
    return data.data
  }

  public static async getLogContent(logName: string) {
    const { data } = await serverRequest.get<ServerResponse<string>>(
      `/Log/GetLog?id=${logName}`
    )
    return data.data
  }

  public static getRealTimeLogs(writer: (data: Log[]) => void) {
    const abort = new AbortController()
    requestServerWithFetch('/Log/GetLogRealTime', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      signal: abort.signal
    })
      .then((response) => {
        const reader = response.body?.getReader()
        if (reader) {
          let previousData = ''
          reader
            .read()
            .then(function processText({ done, value }) {
              if (done) {
                return
              }
              const text = new TextDecoder().decode(value)
              const data = (previousData + text).split(/(?<=})\n/)
              data.forEach((line, index) => {
                if (index === data.length - 1) {
                  previousData = line
                } else {
                  try {
                    const json = JSON.parse(line)
                    writer([json])
                  } catch (error) {
                    console.error(error)
                  }
                }
              })
              reader
                .read()
                .then(processText)
                .catch((error) => {
                  if (error.name !== 'AbortError') {
                    console.error(error)
                  }
                })
            })
            .catch((error) => {
              if (error.name !== 'AbortError') {
                console.error(error)
              }
            })
        }
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
          console.error(error)
        }
      })
    return abort
  }
}
