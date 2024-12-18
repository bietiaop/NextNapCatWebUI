import { ZodSchema } from 'zod'
import oneBotHttpApiUser from './user'
import oneBotHttpApiMessage from './message'
import oneBotHttpApiGroup from './group'
import oneBotHttpApiSystem from './system'
type AllKey =
  | keyof typeof oneBotHttpApiUser
  | keyof typeof oneBotHttpApiMessage
  | keyof typeof oneBotHttpApiGroup
  | keyof typeof oneBotHttpApiSystem

export type OneBotHttpApi = Record<
  AllKey,
  {
    description?: string
    request: ZodSchema
    response: ZodSchema
  }
>

const oneBotHttpApi: OneBotHttpApi = {
  ...oneBotHttpApiUser,
  ...oneBotHttpApiMessage,
  ...oneBotHttpApiGroup,
  ...oneBotHttpApiSystem
} as const

export type OneBotHttpApiPath = keyof OneBotHttpApi

export type OneBotHttpApiContent = OneBotHttpApi[OneBotHttpApiPath]

export default oneBotHttpApi
