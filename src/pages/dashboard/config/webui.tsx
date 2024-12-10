import ImageInput from '@/components/input/image_input'
import SaveButtons from '@/components/button/save_buttons'
import { Card, CardBody } from '@nextui-org/card'
import { Input } from '@nextui-org/input'
import { Controller } from 'react-hook-form'
import type { Control } from 'react-hook-form'
import { siteConfig } from '@/config/site'

export interface WebUIConfigCardProps {
  control: Control<IConfig['webui']>
  onSubmit: () => void
  reset: () => void
  isSubmitting: boolean
  onRefresh: () => void
}
const WebUIConfigCard: React.FC<WebUIConfigCardProps> = (props) => {
  const { control, onSubmit, reset, isSubmitting, onRefresh } = props
  return (
    <Card>
      <CardBody className="items-center py-5">
        <div className="w-96 flex flex-col gap-2">
          <Controller
            control={control}
            name="musicListID"
            render={({ field }) => (
              <Input
                {...field}
                label="网易云音乐音乐ID"
                placeholder="请输入音乐ID"
              />
            )}
          />
          <div className="flex flex-col gap-2">
            <div className="flex-shrink-0 w-full">背景图</div>
            <Controller
              control={control}
              name="background"
              render={({ field }) => <ImageInput {...field} />}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div>自定义图标</div>
            {siteConfig.navItems.map((item) => (
              <Controller
                key={item.label}
                control={control}
                name={`customIcons.${item.label}`}
                render={({ field }) => (
                  <ImageInput {...field} label={item.label} />
                )}
              />
            ))}
          </div>
          <SaveButtons
            onSubmit={onSubmit}
            reset={reset}
            isSubmitting={isSubmitting}
            refresh={onRefresh}
          />
        </div>
      </CardBody>
    </Card>
  )
}

export default WebUIConfigCard
