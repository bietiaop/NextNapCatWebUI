import { z } from 'zod'
import oneBotHttpApiMessagePrivate from './private'
import oneBotHttpApiMessageGroup from './group'
import { baseResponseSchema, commonResponseDataSchema } from '../response'
import messageNodeSchema from './node'
const fileSchema = z.object({
  file: z.string(),
  url: z.string(),
  file_size: z.string(),
  file_name: z.string(),
  base64: z.string()
})
const messageSchema = z.object({
  self_id: z.number(),
  user_id: z.number(),
  time: z.number(),
  message_id: z.number(),
  message_seq: z.number(),
  real_id: z.number(),
  message_type: z.string(),
  sender: z.object({
    user_id: z.number(),
    nickname: z.string(),
    sex: z.enum(['male', 'female', 'unknown']),
    age: z.number(),
    card: z.string(),
    role: z.enum(['owner', 'admin', 'member'])
  }),
  raw_message: z.string(),
  font: z.number(),
  sub_type: z.string(),
  message: z.array(messageNodeSchema),
  message_format: z.string(),
  post_type: z.string(),
  message_sent_type: z.string(),
  group_id: z.number()
})

const oneBotHttpApiMessage = {
  ...oneBotHttpApiMessagePrivate,
  ...oneBotHttpApiMessageGroup,
  '/mark_msg_as_read': {
    description: '标记消息已读',
    request: z
      .object({
        group_id: z.union([z.string(), z.number()]).optional(),
        user_id: z.union([z.string(), z.number()]).optional()
      })
      .refine(
        (data) =>
          (data.group_id && !data.user_id) || (!data.group_id && data.user_id),
        {
          message: 'group_id 和 user_id 必须二选一，且不能同时存在或同时为空',
          path: ['group_id', 'user_id']
        }
      ),
    response: baseResponseSchema
  },
  '/mark_group_msg_as_read': {
    description: '标记群消息已读',
    request: z.object({
      group_id: z.union([z.string(), z.number()])
    }),
    response: baseResponseSchema
  },
  '/mark_private_msg_as_read': {
    description: '标记私聊消息已读',
    request: z.object({
      user_id: z.union([z.string(), z.number()])
    }),
    response: baseResponseSchema
  },
  '/_mark_all_as_read': {
    description: '标记所有消息已读',
    request: z.object({}),
    response: baseResponseSchema
  },
  '/delete_msg': {
    description: '撤回消息',
    request: z.object({
      message_id: z.union([z.string(), z.number()])
    }),
    response: baseResponseSchema
  },
  '/get_msg': {
    description: '获取消息',
    request: z.object({
      message_id: z.union([z.string(), z.number()])
    }),
    response: baseResponseSchema.extend({
      data: z.object({})
    })
  },
  '/get_image': {
    description: '获取图片',
    request: z.object({
      file_id: z.string()
    }),
    response: baseResponseSchema.extend({
      data: fileSchema
    })
  },
  '/get_record': {
    description: '获取语音',
    request: z.object({
      file_id: z.string(),
      out_format: z.enum([
        'mp3',
        'amr',
        'wma',
        'm4a',
        'spx',
        'ogg',
        'wav',
        'flac'
      ])
    }),
    response: baseResponseSchema.extend({
      data: fileSchema
    })
  },
  '/get_file': {
    description: '获取文件',
    request: z.object({
      file_id: z.string()
    }),
    response: baseResponseSchema.extend({
      data: fileSchema
    })
  },
  '/get_group_msg_history': {
    description: '获取群消息历史',
    request: z.object({
      group_id: z.union([z.string(), z.number()]),
      message_seq: z.union([z.string(), z.number()]),
      count: z.number().int().positive(),
      reverseOrder: z.boolean()
    }),
    response: baseResponseSchema.extend({
      data: z.object({
        messages: z.array(messageSchema)
      })
    })
  },
  '/set_msg_emoji_like': {
    description: '贴表情',
    request: z.object({
      message_id: z.union([z.string(), z.number()]),
      emoji_id: z.number(),
      set: z.boolean()
    }),
    response: baseResponseSchema.extend({
      data: commonResponseDataSchema
    })
  },
  '/get_friend_msg_history': {
    description: '获取好友消息历史',
    request: z.object({
      user_id: z.union([z.string(), z.number()]),
      message_seq: z.union([z.string(), z.number()]),
      count: z.number().int().positive(),
      reverseOrder: z.boolean()
    }),
    response: baseResponseSchema.extend({
      data: z.object({
        messages: z.array(messageSchema)
      })
    })
  },
  '/get_recent_contact': {
    description: '最近消息列表',
    request: z.object({
      count: z.number().int().positive()
    }),
    response: baseResponseSchema.extend({
      data: z.array(
        z.object({
          lastestMsg: messageSchema,
          peerUin: z.string(),
          remark: z.string(),
          msgTime: z.string(),
          chatType: z.number(),
          msgId: z.string(),
          sendNickName: z.string(),
          sendMemberName: z.string(),
          peerName: z.string()
        })
      )
    })
  },
  '/fetch_emoji_like': {
    description: '获取贴表情详情',
    request: z.object({
      message_id: z.union([z.string(), z.number()]),
      emojiId: z.string(),
      emojiType: z.string(),
      group_id: z.union([z.string(), z.number()]).optional(),
      user_id: z.union([z.string(), z.number()]).optional(),
      count: z.number().int().positive().optional()
    }),
    response: baseResponseSchema.extend({
      data: z.object({
        result: z.number(),
        errMsg: z.string(),
        emojiLikesList: z.array(
          z.object({
            tinyId: z.string(),
            nickName: z.string(),
            headUrl: z.string()
          })
        ),
        cookie: z.string(),
        isLastPage: z.boolean(),
        isFirstPage: z.boolean()
      })
    })
  },
  '/get_forward_msg': {
    description: '获取合并转发消息',
    request: z.object({
      message_id: z.union([z.string(), z.number()])
    }),
    response: baseResponseSchema.extend({
      data: z.object({})
    })
  },
  '/send_forward_msg': {
    description: '发送合并转发消息',
    request: z.object({
      group_id: z.union([z.string(), z.number()]).optional(),
      user_id: z.union([z.string(), z.number()]).optional(),
      messages: z.array(messageNodeSchema),
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
      data: commonResponseDataSchema.extend({
        data: z.object({})
      })
    })
  }
} as const

export default oneBotHttpApiMessage
