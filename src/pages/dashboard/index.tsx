import { Card, CardBody } from '@nextui-org/card'
import { useRequest } from 'ahooks'
import clsx from 'clsx'
import { useEffect } from 'react'

import Hitokoto from '@/components/hitokoto'
import { title } from '@/components/primitives'
import QQInfoCard from '@/components/qq_info_card'

import useConfig from '@/hooks/use-config'

import QQManager from '@/controllers/qq_manager'

export interface NetworkItemDisplayProps {
  count: number
  label: string
  size?: 'sm' | 'md'
}

const NetworkItemDisplay: React.FC<NetworkItemDisplayProps> = ({
  count,
  label,
  size = 'md'
}) => {
  return (
    <Card
      className={clsx(
        'bg-opacity-60 shadow-sm',
        size === 'md'
          ? 'col-span-8 md:col-span-2 bg-danger-50 shadow-danger-100'
          : 'col-span-2 md:col-span-1 bg-warning-100 shadow-warning-200'
      )}
      shadow="sm"
    >
      <CardBody className="items-center gap-1">
        <div
          className={clsx(
            'font-outfit flex-1',
            title({
              color: size === 'md' ? 'pink' : 'yellow',
              size
            })
          )}
        >
          {count}
        </div>
        <div
          className={clsx(
            'whitespace-nowrap text-nowrap flex-shrink-0',
            title({
              color: size === 'md' ? 'pink' : 'yellow',
              shadow: true,
              size: 'xxs'
            })
          )}
        >
          {label}
        </div>
      </CardBody>
    </Card>
  )
}

const DashboardIndexPage: React.FC = () => {
  const { config, refreshConfig } = useConfig()
  const { data, loading, error } = useRequest(QQManager.getQQLoginInfo)
  const allNetWorkConfigLength =
    config.network.httpClients.length +
    config.network.websocketClients.length +
    config.network.websocketServers.length +
    config.network.httpServers.length
  useEffect(() => {
    refreshConfig()
  }, [])
  return (
    <>
      <title>基础信息 - NapCat WebUI</title>
      <section className="w-full p-2 md:p-4">
        <QQInfoCard data={data} error={error} loading={loading} />
        <div className="grid grid-cols-8 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4 py-5">
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
