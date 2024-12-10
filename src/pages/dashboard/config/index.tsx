import { useForm } from 'react-hook-form'

import { useEffect } from 'react'
import toast from 'react-hot-toast'

import useConfig from '@/hooks/use-config'
import { useLocalStorage } from '@uidotdev/usehooks'
import key from '@/const/key'
import useMusic from '@/hooks/use-music'
import { Tab, Tabs } from '@nextui-org/tabs'
import OneBotConfigCard from './onebot'
import WebUIConfigCard from './webui'

export default function ConfigPage() {
  const { config, saveConfigWithoutNetwork, refreshConfig } = useConfig()
  const {
    control: onebotControl,
    handleSubmit: handleOnebotSubmit,
    formState: { isSubmitting: isOnebotSubmitting },
    setValue: setOnebotValue
  } = useForm<IConfig['onebot']>({
    defaultValues: {
      musicSignUrl: '',
      enableLocalFile2Url: false,
      parseMultMsg: false
    }
  })

  const {
    control: webuiControl,
    handleSubmit: handleWebuiSubmit,
    formState: { isSubmitting: isWebuiSubmitting },
    setValue: setWebuiValue
  } = useForm<IConfig['webui']>({
    defaultValues: {
      background: '',
      musicListID: '',
      customIcons: {}
    }
  })
  const [b64img, setB64img] = useLocalStorage(key.backgroundImage, '')
  const [customIcons, setCustomIcons] = useLocalStorage<Record<string, string>>(
    key.customIcons,
    {}
  )
  const { setListId, listId } = useMusic()
  const resetOneBot = () => {
    setOnebotValue('musicSignUrl', config.musicSignUrl)
    setOnebotValue('enableLocalFile2Url', config.enableLocalFile2Url)
    setOnebotValue('parseMultMsg', config.parseMultMsg)
  }

  const resetWebUI = () => {
    setWebuiValue('musicListID', listId)
    setWebuiValue('customIcons', customIcons)
    setWebuiValue('background', b64img)
  }

  const onOneBotSubmit = handleOnebotSubmit((data) => {
    try {
      saveConfigWithoutNetwork(data)
      toast.success('保存成功')
    } catch (error) {
      const msg = (error as Error).message
      toast.error(`保存失败: ${msg}`)
    }
  })

  const onWebuiSubmit = handleWebuiSubmit((data) => {
    try {
      setListId(data.musicListID)
      setCustomIcons(data.customIcons)
      setB64img(data.background)
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
    resetOneBot()
    resetWebUI()
  }, [config])

  return (
    <section className="w-[1000px] max-w-full md:mx-auto gap-4 py-8 px-2 md:py-10">
      <Tabs
        aria-label="config tab"
        isVertical
        className="w-full"
        classNames={{
          tabList: 'sticky top-14',
          panel: 'w-full',
          base: '!w-auto flex-grow-0 flex-shrink-0 mr-0'
        }}
      >
        <Tab title="OneBot配置" key="onebot">
          <OneBotConfigCard
            isSubmitting={isOnebotSubmitting}
            onRefresh={onRefresh}
            onSubmit={onOneBotSubmit}
            control={onebotControl}
            reset={resetOneBot}
          />
        </Tab>
        <Tab title="WebUI配置" key="webui">
          <WebUIConfigCard
            isSubmitting={isWebuiSubmitting}
            onRefresh={onRefresh}
            onSubmit={onWebuiSubmit}
            control={webuiControl}
            reset={resetWebUI}
          />
        </Tab>
      </Tabs>
    </section>
  )
}
