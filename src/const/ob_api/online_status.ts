import { z } from 'zod'

// 定义 set_online_status 的 data 格式
const onlineStatusDataSchema = z.union([
  // 在线
  z.object({
    status: z.literal(10),
    ext_status: z.literal(0),
    battery_status: z.literal(0)
  }),
  // Q我吧
  z.object({
    status: z.literal(60),
    ext_status: z.literal(0),
    battery_status: z.literal(0)
  }),
  // 离开
  z.object({
    status: z.literal(30),
    ext_status: z.literal(0),
    battery_status: z.literal(0)
  }),
  // 忙碌
  z.object({
    status: z.literal(50),
    ext_status: z.literal(0),
    battery_status: z.literal(0)
  }),
  // 请勿打扰
  z.object({
    status: z.literal(70),
    ext_status: z.literal(0),
    battery_status: z.literal(0)
  }),
  // 隐身
  z.object({
    status: z.literal(40),
    ext_status: z.literal(0),
    battery_status: z.literal(0)
  }),
  // 听歌中
  z.object({
    status: z.literal(10),
    ext_status: z.literal(1028),
    battery_status: z.literal(0)
  }),
  // 春日限定
  z.object({
    status: z.literal(10),
    ext_status: z.literal(2037),
    battery_status: z.literal(0)
  }),
  // 一起元梦
  z.object({
    status: z.literal(10),
    ext_status: z.literal(2025),
    battery_status: z.literal(0)
  }),
  // 求星搭子
  z.object({
    status: z.literal(10),
    ext_status: z.literal(2026),
    battery_status: z.literal(0)
  }),
  // 被掏空
  z.object({
    status: z.literal(10),
    ext_status: z.literal(2014),
    battery_status: z.literal(0)
  }),
  // 今日天气
  z.object({
    status: z.literal(10),
    ext_status: z.literal(1030),
    battery_status: z.literal(0)
  }),
  // 我crash了
  z.object({
    status: z.literal(10),
    ext_status: z.literal(2019),
    battery_status: z.literal(0)
  }),
  // 爱你
  z.object({
    status: z.literal(10),
    ext_status: z.literal(2006),
    battery_status: z.literal(0)
  }),
  // 恋爱中
  z.object({
    status: z.literal(10),
    ext_status: z.literal(1051),
    battery_status: z.literal(0)
  }),
  // 好运锦鲤
  z.object({
    status: z.literal(10),
    ext_status: z.literal(1071),
    battery_status: z.literal(0)
  }),
  // 水逆退散
  z.object({
    status: z.literal(10),
    ext_status: z.literal(1201),
    battery_status: z.literal(0)
  }),
  // 嗨到飞起
  z.object({
    status: z.literal(10),
    ext_status: z.literal(1056),
    battery_status: z.literal(0)
  }),
  // 元气满满
  z.object({
    status: z.literal(10),
    ext_status: z.literal(1058),
    battery_status: z.literal(0)
  }),
  // 宝宝认证
  z.object({
    status: z.literal(10),
    ext_status: z.literal(1070),
    battery_status: z.literal(0)
  }),
  // 一言难尽
  z.object({
    status: z.literal(10),
    ext_status: z.literal(1063),
    battery_status: z.literal(0)
  }),
  // 难得糊涂
  z.object({
    status: z.literal(10),
    ext_status: z.literal(2001),
    battery_status: z.literal(0)
  }),
  // emo中
  z.object({
    status: z.literal(10),
    ext_status: z.literal(1401),
    battery_status: z.literal(0)
  }),
  // 我太难了
  z.object({
    status: z.literal(10),
    ext_status: z.literal(1062),
    battery_status: z.literal(0)
  }),
  // 我想开了
  z.object({
    status: z.literal(10),
    ext_status: z.literal(2013),
    battery_status: z.literal(0)
  }),
  // 我没事
  z.object({
    status: z.literal(10),
    ext_status: z.literal(1052),
    battery_status: z.literal(0)
  }),
  // 想静静
  z.object({
    status: z.literal(10),
    ext_status: z.literal(1061),
    battery_status: z.literal(0)
  }),
  // 悠哉哉
  z.object({
    status: z.literal(10),
    ext_status: z.literal(1059),
    battery_status: z.literal(0)
  }),
  // 去旅行
  z.object({
    status: z.literal(10),
    ext_status: z.literal(2015),
    battery_status: z.literal(0)
  }),
  // 信号弱
  z.object({
    status: z.literal(10),
    ext_status: z.literal(1011),
    battery_status: z.literal(0)
  }),
  // 出去浪
  z.object({
    status: z.literal(10),
    ext_status: z.literal(2003),
    battery_status: z.literal(0)
  }),
  // 肝作业
  z.object({
    status: z.literal(10),
    ext_status: z.literal(2012),
    battery_status: z.literal(0)
  }),
  // 学习中
  z.object({
    status: z.literal(10),
    ext_status: z.literal(1018),
    battery_status: z.literal(0)
  }),
  // 搬砖中
  z.object({
    status: z.literal(10),
    ext_status: z.literal(2023),
    battery_status: z.literal(0)
  }),
  // 摸鱼中
  z.object({
    status: z.literal(10),
    ext_status: z.literal(1300),
    battery_status: z.literal(0)
  }),
  // 无聊中
  z.object({
    status: z.literal(10),
    ext_status: z.literal(1060),
    battery_status: z.literal(0)
  }),
  // timi中
  z.object({
    status: z.literal(10),
    ext_status: z.literal(1027),
    battery_status: z.literal(0)
  }),
  // 睡觉中
  z.object({
    status: z.literal(10),
    ext_status: z.literal(1016),
    battery_status: z.literal(0)
  }),
  // 熬夜中
  z.object({
    status: z.literal(10),
    ext_status: z.literal(1032),
    battery_status: z.literal(0)
  }),
  // 追剧中
  z.object({
    status: z.literal(10),
    ext_status: z.literal(1021),
    battery_status: z.literal(0)
  }),
  // 我的电量
  z.object({
    status: z.literal(10),
    ext_status: z.literal(1000),
    battery_status: z.literal(0)
  })
])

export default onlineStatusDataSchema
