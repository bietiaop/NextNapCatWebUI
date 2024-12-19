import { z } from 'zod'
import type { ZodSchema } from 'zod'

import { baseResponseSchema, commonResponseDataSchema } from '../response'
import messageNodeSchema, { nodeMessage } from './node'

const oneBotHttpApiMessagePrivate: Record<
  string,
  {
    description?: string
    request: ZodSchema
    response: ZodSchema
  }
> = {
  '/send_private_msg': {
    description: '发送私聊消息',
    request: z
      .object({
        user_id: z.union([z.string(), z.number()]),
        message: z.array(messageNodeSchema)
      })
      .refine(
        (data) => {
          const hasReply = data.message.some((item) => item.type === 'reply')

          if (hasReply) {
            return data.message[0].type === 'reply'
          }

          return true
        },
        {
          message:
            '如果 message 包含 reply 类型的消息，那么只能包含一个，而且排在最前面'
        }
      ),
    response: baseResponseSchema.extend({
      data: commonResponseDataSchema
    })
  },
  '/send_private_forward_msg': {
    description: '发送私聊合并转发消息',
    request: z.object({
      user_id: z.union([z.string(), z.number()]),
      messages: z.array(nodeMessage),
      news: z.array(
        z.object({
          text: z.string()
        })
      ),
      prompt: z.string(),
      summary: z.string(),
      source: z.string()
    }),
    response: baseResponseSchema.extend({
      data: commonResponseDataSchema
    })
  },
  '/forward_friend_single_msg': {
    description: '消息转发到私聊',
    request: z.object({
      user_id: z.union([z.string(), z.number()]),
      message_id: z.union([z.string(), z.number()])
    }),
    response: baseResponseSchema.extend({
      data: commonResponseDataSchema
    })
  },
  '/group_poke': {
    description: '发送私聊戳一戳',
    request: z.object({
      user_id: z.union([z.string(), z.number()])
    }),
    response: baseResponseSchema
  }
}

export default oneBotHttpApiMessagePrivate
