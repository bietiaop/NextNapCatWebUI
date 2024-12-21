import { Card, CardBody } from '@nextui-org/card'
import { useRequest } from 'ahooks'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import NetworkItemDisplay from '@/components/display_network_item'
import Hitokoto from '@/components/hitokoto'
import QQInfoCard from '@/components/qq_info_card'

import useConfig from '@/hooks/use-config'

import QQManager from '@/controllers/qq_manager'
import WebUIManager from '@/controllers/webui_manager'

const DashboardIndexPage: React.FC = () => {
  const { config, refreshConfig } = useConfig()
  const { data, loading, error } = useRequest(QQManager.getQQLoginInfo)
  const [systemStatus, setSystemStatus] = useState<SystemStatus>()
  const allNetWorkConfigLength =
    config.network.httpClients.length +
    config.network.websocketClients.length +
    config.network.websocketServers.length +
    config.network.httpServers.length
  const getStatus = () => {
    try {
      const event = WebUIManager.getSystemStatus(setSystemStatus)
      return event
    } catch (error) {
      const msg = (error as Error).message
      toast.error(`获取系统状态失败：${msg}`)
    }
  }
  useEffect(() => {
    refreshConfig()
    // const close = getStatus()
    // return () => {
    //   close?.close()
    // }
  }, [])
  // console.log(systemStatus)
  return (
    <>
      <title>基础信息 - NapCat WebUI</title>
      <section className="w-full p-2 md:p-4">
        <QQInfoCard data={data} error={error} loading={loading} />
        <div className="grid grid-cols-8 md:grid-cols-3 lg:grid-cols-6 gap-y-2 gap-x-1 md:gap-y-4 md:gap-x-4 py-5">
          <NetworkItemDisplay count={allNetWorkConfigLength} label="网络配置" />
          <NetworkItemDisplay
            count={config.network.httpServers.length}
            label="HTTP服务器"
            size="sm"
          />
          <NetworkItemDisplay
            count={config.network.httpClients.length}
            label="HTTP客户端"
            size="sm"
          />
          <NetworkItemDisplay
            count={config.network.websocketServers.length}
            label="WS服务器"
            size="sm"
          />
          <NetworkItemDisplay
            count={config.network.websocketClients.length}
            label="WS客户端"
            size="sm"
          />
        </div>
        <Card className="bg-opacity-60 shadow-sm shadow-danger-50">
          <CardBody>
            <Hitokoto />
          </CardBody>
        </Card>
      </section>
    </>
  )
}

export default DashboardIndexPage
