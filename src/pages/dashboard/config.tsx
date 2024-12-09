import { Controller, useForm } from 'react-hook-form'
import { Input } from '@nextui-org/input'
import { Button } from '@nextui-org/button'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { IoMdRefresh } from 'react-icons/io'

import useConfig from '@/hooks/use-config'
import SwitchCard from '@/components/switch_card'
import { useLocalStorage } from '@uidotdev/usehooks'
import { Image } from '@nextui-org/image'
import key from '@/const/key'
import useMusic from '@/hooks/use-music'
import { Tab, Tabs } from '@nextui-org/tabs'
import { Card, CardBody } from '@nextui-org/card'

export interface SaveButtonsProps {
  onSubmit: () => void
  reset: () => void
  refresh: () => void
  isSubmitting: boolean
}
const SaveButtons: React.FC<SaveButtonsProps> = ({
  onSubmit,
  reset,
  isSubmitting,
  refresh
}) => (
  <div className="max-w-full mx-3 w-96 flex flex-col justify-center gap-3">
    <div className="flex items-center justify-center gap-2 mt-5">
      <Button
        color="default"
        onPress={() => {
          reset()
          toast.success('重置成功')
        }}
      >
        重置
      </Button>
      <Button
        color="primary"
        isLoading={isSubmitting}
        onPress={() => onSubmit()}
      >
        保存
      </Button>
      <Button
        isIconOnly
        color="secondary"
        radius="full"
        variant="flat"
        onPress={() => refresh()}
      >
        <IoMdRefresh size={24} />
      </Button>
    </div>
  </div>
)

export default function ConfigPage() {
  const { config, mergeConfig, refreshConfig } = useConfig()
  const { control, handleSubmit, formState, setValue } = useForm<IConfig>({
    defaultValues: {
      onebot: {
        musicSignUrl: '',
        enableLocalFile2Url: false,
        parseMultMsg: false
      },
      webui: {
        background: '',
        musicListID: ''
      }
    }
  })
  const [b64img, setB64img] = useLocalStorage(key.backgroundImage, '')
  const { setListId, listId } = useMusic()
  const reset = () => {
    setValue('onebot.musicSignUrl', config.musicSignUrl)
    setValue('onebot.enableLocalFile2Url', config.enableLocalFile2Url)
    setValue('onebot.parseMultMsg', config.parseMultMsg)
    setValue('webui.musicListID', listId)
  }

  const onSubmit = handleSubmit((data) => {
    try {
      setListId(data.webui.musicListID)
      mergeConfig(data.onebot)
      toast.success('保存成功')
    } catch (error) {
      const msg = (error as Error).message
      toast.error(`保存失败: ${msg}`)
    }
  })

  const onRefresh = async () => {
    try {
      await refreshConfig()
      toast.success('刷新成功')
    } catch (error) {
      const msg = (error as Error).message

      toast.error(`刷新失败: ${msg}`)
    }
  }

  useEffect(() => {
    reset()
  }, [config, setValue])

  return (
    <section className="w-[1000px] max-w-full md:mx-auto gap-4 py-8 px-2 md:py-10">
      <Tabs
        aria-label="config tab"
        isVertical
        className="w-full"
        classNames={{
          panel: 'w-full',
          base: '!w-auto flex-grow-0 flex-shrink-0 mr-0'
        }}
      >
        <Tab title="OneBot配置" key="onebot">
          <Card>
            <CardBody className="items-center py-5">
              <div className="w-96 flex flex-col gap-2">
                <Controller
                  control={control}
                  name="onebot.musicSignUrl"
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="音乐签名地址"
                      placeholder="请输入音乐签名地址"
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="onebot.enableLocalFile2Url"
                  render={({ field }) => (
                    <SwitchCard
                      {...field}
                      description="启用本地文件到URL"
                      label="启用本地文件到URL"
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="onebot.parseMultMsg"
                  render={({ field }) => (
                    <SwitchCard
                      {...field}
                      description="启用上报解析合并消息"
                      label="启用上报解析合并消息"
                    />
                  )}
                />
                <SaveButtons
                  onSubmit={onSubmit}
                  reset={reset}
                  isSubmitting={formState.isSubmitting}
                  refresh={onRefresh}
                />
              </div>
            </CardBody>
          </Card>
        </Tab>
        <Tab title="WebUI配置" key="webui">
          <Card>
            <CardBody className="items-center py-5">
              <div className="w-96 flex flex-col gap-2">
                <Controller
                  control={control}
                  name="webui.musicListID"
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="网易云音乐音乐ID"
                      placeholder="请输入音乐ID"
                    />
                  )}
                />
                <div className="bg-content1 p-3 rounded-md flex flex-col gap-2 justify-center items-center">
                  <div className="flex-shrink-0 w-full">背景图</div>
                  <div className="flex gap-2 items-center">
                    <Input
                      type="file"
                      onChange={async (e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          const reader = new FileReader()
                          reader.onload = async () => {
                            const base64 = reader.result as string
                            setB64img(base64)
                            e.target.value = ''
                          }
                          reader.readAsDataURL(file)
                        }
                      }}
                    />
                    <Button
                      onPress={() => {
                        setB64img('')
                      }}
                    >
                      删除背景图
                    </Button>
                  </div>
                  {b64img && (
                    <Image src={b64img} alt="background" height={100} />
                  )}
                </div>
                <SaveButtons
                  onSubmit={onSubmit}
                  reset={reset}
                  isSubmitting={formState.isSubmitting}
                  refresh={onRefresh}
                />
              </div>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </section>
  )
}
