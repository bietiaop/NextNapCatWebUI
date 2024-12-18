import { z } from 'zod'

// 通用响应格式
export const baseResponseSchema = z.object({
  status: z.enum(['ok', 'error']), // 状态
  retcode: z.number(), // 返回码
  data: z.null(),
  message: z.string(), // 提示信息
  wording: z.string(), // 人性化提示
  echo: z.string() // 请求回显内容
})

export const commonResponseDataSchema = z.object({
  result: z.number(),
  errMsg: z.string()
})
