import { useState } from 'react'

import oneBotHttpApi from '@/const/ob_api'
import type { OneBotHttpApi } from '@/const/ob_api'

import OneBotApiDebug from '@/components/onebot/api/debug'
import OneBotApiNavList from '@/components/onebot/api/nav_list'

export default function HttpDebug() {
  const [selectedApi, setSelectedApi] =
    useState<keyof OneBotHttpApi>('/set_qq_profile')
  const data = oneBotHttpApi[selectedApi]
  return (
    <>
      <title>HTTP调试 - NapCat WebUI</title>
      <div className="w-full h-[calc(100%-2.5rem)] flex items-stretch">
        <OneBotApiNavList
          data={oneBotHttpApi}
          selectedApi={selectedApi}
          onSelect={setSelectedApi}
        />
        <OneBotApiDebug path={selectedApi} data={data} />
      </div>
    </>
  )
}
