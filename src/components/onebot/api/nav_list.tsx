import type { OneBotHttpApi, OneBotHttpApiPath } from '@/const/ob_api'
import { Card, CardBody } from '@nextui-org/card'
import { Input } from '@nextui-org/input'
import clsx from 'clsx'
import { useState } from 'react'

export interface OneBotApiNavListProps {
  data: OneBotHttpApi
  selectedApi: OneBotHttpApiPath
  onSelect: (apiName: OneBotHttpApiPath) => void
}

const OneBotApiNavList: React.FC<OneBotApiNavListProps> = (props) => {
  const { data, selectedApi, onSelect } = props
  const [searchValue, setSearchValue] = useState('')

  return (
    <div className="flex-shrink-0 overflow-y-auto p-2 w-60">
      <Input
        className="sticky top-0 z-10 text-danger-600"
        classNames={{
          inputWrapper:
            'bg-opacity-30 bg-danger-50 backdrop-blur-sm border border-danger-300 mb-2',
          input: 'bg-transparent !text-danger-400 !placeholder-danger-400'
        }}
        radius="full"
        placeholder="搜索 API"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        isClearable
        onClear={() => setSearchValue('')}
      />
      {Object.entries(data).map(([apiName, api]) => (
        <Card
          key={apiName}
          shadow="none"
          className={clsx(
            'w-full border border-danger-100 rounded-lg mb-1 bg-opacity-30 backdrop-blur-sm text-danger-400',
            {
              hidden: !(
                apiName.includes(searchValue) ||
                api.description?.includes(searchValue)
              )
            },
            {
              '!bg-opacity-40 border border-danger-400 bg-danger-50 text-danger-600':
                apiName === selectedApi
            }
          )}
          isPressable
          onPress={() => onSelect(apiName as OneBotHttpApiPath)}
        >
          <CardBody>
            <h2 className="font-ubuntu font-bold">{api.description}</h2>
            <div
              className={clsx('text-sm text-danger-200', {
                '!text-danger-400': apiName === selectedApi
              })}
            >
              {apiName}
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  )
}

export default OneBotApiNavList
