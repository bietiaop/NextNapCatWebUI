import { z } from 'zod'

const messageNode = z.union([
  z.object({
    type: z.literal('text'),
    data: z.object({
      text: z.string()
    })
  }),
  z.object({
    type: z.literal('at'),
    data: z.object({
      qq: z.string()
    })
  }),
  z.object({
    type: z.literal('image'),
    data: z.object({
      file: z.string()
    })
  }),
  z.object({
    type: z.literal('face'),
    data: z.object({
      id: z.number()
    })
  }),
  z.object({
    type: z.literal('json'),
    data: z.object({
      data: z.string()
    })
  }),
  z.object({
    type: z.literal('record'),
    data: z.object({
      file: z.string()
    })
  }),
  z.object({
    type: z.literal('video'),
    data: z.object({
      file: z.string()
    })
  }),
  z.object({
    type: z.literal('reply'),
    data: z.object({
      id: z.number()
    })
  }),
  z.object({
    type: z.literal('music'),
    data: z.union([
      z.object({
        type: z.enum(['qq', '163']),
        id: z.string()
      }),
      z.object({
        type: z.literal('custom'),
        url: z.string(),
        audio: z.string(),
        title: z.string(),
        image: z.string()
      })
    ])
  }),
  z.object({
    type: z.literal('dice')
  }),
  z.object({
    type: z.literal('rps')
  }),
  z.object({
    type: z.literal('file'),
    data: z.object({
      file: z.string()
    })
  })
])

export const nodeMessage = z.object({
  type: z.literal('node'),
  data: z.object({
    user_id: z.string(),
    nickname: z.string(),
    content: z.array(messageNode)
  })
})

const messageNodeSchema = z.union([messageNode, nodeMessage])

export default messageNodeSchema
