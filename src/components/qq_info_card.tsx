import { SelfInfo } from '@/types/user'
import { Avatar } from '@nextui-org/avatar'
import { Card, CardBody } from '@nextui-org/card'
import PageLoading from './page_loading'

export interface QQInfoCardProps {
  data?: SelfInfo
  error?: Error
  loading?: boolean
}

const QQInfoCard: React.FC<QQInfoCardProps> = ({ data, error, loading }) => {
  return (
    <Card
      className="col-span-8 md:col-span-2 shadow-danger-100 relative bg-opacity-30"
      shadow="none"
      radius="sm"
    >
      <PageLoading loading={loading} />
      {error ? (
        <CardBody className="items-center gap-1 justify-center">
          <div className="font-outfit flex-1 text-pink-500">Error</div>
          <div className="whitespace-nowrap text-nowrap flex-shrink-0">
            {error.message}
          </div>
        </CardBody>
      ) : (
        <CardBody className="flex-row items-stretch gap-2 justify-center">
          <div className="flex items-center text-lg font-bold font-noto-serif">
            欢迎回来,
          </div>
          <div className="flex items-center gap-1 shadow-md py-1 pl-1 pr-4 rounded-full">
            <Avatar
              src={
                data?.avatarUrl ??
                `https://q1.qlogo.cn/g?b=qq&nk=${data?.uin}&s=1`
              }
              size="sm"
              className="flex-shrink-0 shadow-md"
            />
            <div className="flex-col justify-center">
              <div className="font-outfit text-pink-500 text-sm">
                {data?.nick}
              </div>
              <div className="font-ubuntu text-gray-500 text-xs">
                {data?.uin}
              </div>
            </div>
          </div>
        </CardBody>
      )}
    </Card>
  )
}

export default QQInfoCard
