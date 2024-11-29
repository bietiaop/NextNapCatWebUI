import HistoryLogs from '@/components/log_com/history'
import RealTimeLogs from '@/components/log_com/realtime'
import WebUIManager from '@/controllers/webui_manager'
import { Tab, Tabs } from '@nextui-org/tabs'
import { useRequest } from 'ahooks'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function LogsPage() {
  const {
    data: logList,
    loading: logListLoading,
    error: logListError,
    refresh: refreshLogList
  } = useRequest(WebUIManager.getLogList)
  const [selectedLog, setSelectedLog] = useState<string | null>(null)
  const [logContent, setLogContent] = useState<string | null>(null)
  const [logLoading, setLogLoading] = useState<boolean>(false)
  const onLogSelect = (name: string) => {
    setSelectedLog(name)
  }
  const onLoadLog = async () => {
    if (!selectedLog) {
      return
    }
    setLogLoading(true)
    try {
      const result = await WebUIManager.getLogContent(selectedLog)
      setLogContent(result)
    } catch (error) {
      const msg = (error as Error).message
      toast.error(`加载日志失败: ${msg}`)
    } finally {
      setLogLoading(false)
    }
  }
  useEffect(() => {
    if (logList && logList.length > 0) {
      setSelectedLog(logList[0])
    }
  }, [logList])
  useEffect(() => {
    if (selectedLog) {
      onLoadLog()
    }
  }, [selectedLog])
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <Tabs
        aria-label="Logs"
        className="max-w-full overflow-hidden"
        classNames={{
          panel: 'max-w-full w-[900px]'
        }}
      >
        <Tab title="实时日志">
          <RealTimeLogs />
        </Tab>
        <Tab title="历史日志">
          <HistoryLogs
            list={logList || []}
            onSelect={onLogSelect}
            selectedLog={selectedLog || undefined}
            refreshList={refreshLogList}
            refreshLog={onLoadLog}
            listLoading={logListLoading}
            logLoading={logLoading}
            listError={logListError}
            logContent={logContent || undefined}
          />
        </Tab>
      </Tabs>
    </section>
  )
}
