import { z } from 'zod'

import messageNodeSchema from './message/node'
import { baseResponseSchema, commonResponseDataSchema } from './response'

const oneBotHttpApiGroup = {
  '/set_group_kick': {
    description: '群踢人',
    request: z.object({
      group_id: z.union([z.string(), z.number()]),
      user_id: z.union([z.string(), z.number()]),
      reject_add_request: z.boolean()
    }),
    response: baseResponseSchema
  },
  '/set_group_ban': {
    description: '群禁言',
    request: z.object({
      group_id: z.union([z.string(), z.number()]),
      user_id: z.union([z.string(), z.number()]),
      duration: z.number()
    }),
    response: baseResponseSchema
  },
  '/get_group_system_msg': {
    description: '获取群系统消息',
    request: z.object({
      group_id: z.union([z.string(), z.number()])
    }),
    response: baseResponseSchema.extend({
      data: z.object({
        InvitedRequest: z.array(
          z.object({
            request_id: z.string(),
            invitor_uin: z.string(),
            invitor_nick: z.string(),
            group_id: z.string(),
            group_name: z.string(),
            checked: z.boolean(),
            actor: z.string()
          })
        ),
        join_requests: z.array(
          z.object({
            request_id: z.string(),
            requester_uin: z.string(),
            requester_nick: z.string(),
            group_id: z.string(),
            group_name: z.string(),
            checked: z.boolean(),
            actor: z.string()
          })
        )
      })
    })
  },
  '/get_essence_msg_list': {
    description: '获取精华消息',
    request: z.object({
      group_id: z.union([z.string(), z.number()])
    }),
    response: baseResponseSchema.extend({
      data: z.array(
        z.object({
          msg_seq: z.number(),
          msg_random: z.number(),
          sender_id: z.number(),
          sender_nick: z.string(),
          operator_id: z.number(),
          operator_nick: z.string(),
          message_id: z.string(),
          operator_time: z.string(),
          content: z.array(messageNodeSchema)
        })
      )
    })
  },
  '/set_group_whole_ban': {
    description: '全员禁言',
    request: z.object({
      group_id: z.union([z.string(), z.number()]),
      enable: z.boolean()
    }),
    response: baseResponseSchema
  },
  '/set_group_portrait': {
    description: '设置群头像',
    request: z.object({
      group_id: z.union([z.string(), z.number()]),
      file: z.string()
    }),
    response: baseResponseSchema.extend({
      data: commonResponseDataSchema
    })
  },
  '/set_group_admin': {
    description: '设置群管理',
    request: z.object({
      group_id: z.union([z.string(), z.number()]),
      user_id: z.union([z.string(), z.number()]),
      enable: z.boolean()
    }),
    response: baseResponseSchema
  },
  '/set_essence_msg': {
    description: '设置群精华消息',
    request: z.object({
      message_id: z.union([z.string(), z.number()])
    }),
    response: baseResponseSchema.extend({
      data: z.object({
        errCode: z.number(),
        errMsg: z.string(),
        result: z.object({
          wording: z.string(),
          digestUin: z.string(),
          digestTime: z.number(),
          msg: z.object({
            groupCode: z.string(),
            msgSeq: z.number(),
            msgRandom: z.number(),
            msgContent: z.array(messageNodeSchema),
            textSize: z.string(),
            picSize: z.string(),
            videoSize: z.string(),
            senderUin: z.string(),
            senderTime: z.number(),
            addDigestUin: z.string(),
            addDigestTime: z.number(),
            startTime: z.number(),
            latestMsgSeq: z.number(),
            opType: z.number()
          }),
          errorCode: z.number()
        })
      })
    })
  },
  '/set_group_card': {
    description: '设置群成员名片',
    request: z.object({
      group_id: z.union([z.string(), z.number()]),
      user_id: z.union([z.string(), z.number()]),
      card: z.string()
    }),
    response: baseResponseSchema
  },
  '/delete_essence_msg': {
    description: '删除群精华消息',
    request: z.object({
      message_id: z.union([z.string(), z.number()])
    }),

    response: baseResponseSchema.extend({
      data: z.object({
        errCode: z.number(),
        errMsg: z.string(),
        result: z.object({
          wording: z.string(),
          digestUin: z.string(),
          digestTime: z.number(),
          msg: z.object({
            groupCode: z.string(),
            msgSeq: z.number(),
            msgRandom: z.number(),
            msgContent: z.array(messageNodeSchema),
            textSize: z.string(),
            picSize: z.string(),
            videoSize: z.string(),
            senderUin: z.string(),
            senderTime: z.number(),
            addDigestUin: z.string(),
            addDigestTime: z.number(),
            startTime: z.number(),
            latestMsgSeq: z.number(),
            opType: z.number()
          }),
          errorCode: z.number()
        })
      })
    })
  },
  '/set_group_name': {
    description: '设置群名称',
    request: z.object({
      group_id: z.union([z.string(), z.number()]),
      group_name: z.string()
    }),
    response: baseResponseSchema
  },
  '/set_group_leave': {
    description: '退出群聊',
    request: z.object({
      group_id: z.union([z.string(), z.number()])
    }),
    response: baseResponseSchema
  },
  '/_send_group_notice': {
    description: '发送群公告',
    request: z.object({
      group_id: z.union([z.string(), z.number()]),
      content: z.string(),
      image: z.string().optional()
    }),
    response: baseResponseSchema
  },
  '/_get_group_notice': {
    description: '获取群公告',
    request: z.object({
      group_id: z.union([z.string(), z.number()])
    }),
    response: baseResponseSchema.extend({
      data: z.array(
        z.object({
          notice_id: z.string(),
          sender_id: z.number(),
          publish_time: z.number(),
          message: z.object({
            text: z.string(),
            image: z.array(
              z.object({
                id: z.string(),
                height: z.string(),
                width: z.string()
              })
            )
          })
        })
      )
    })
  },
  '/set_group_special_title': {
    description: '设置群成员专属头衔',
    request: z.object({
      group_id: z.union([z.string(), z.number()]),
      user_id: z.union([z.string(), z.number()]),
      special_title: z.string()
    }),
    response: baseResponseSchema
  },
  '/upload_group_file': {
    description: '上传群文件',
    request: z.object({
      group_id: z.union([z.string(), z.number()]),
      file: z.string(),
      name: z.string(),
      folder_id: z.string()
    }),
    response: baseResponseSchema.extend({
      data: commonResponseDataSchema
    })
  },
  '/set_group_add_request': {
    description: '处理加群请求',
    request: z.object({
      flag: z.string(),
      approve: z.boolean(),
      reason: z.string().optional()
    }),
    response: baseResponseSchema
  },
  '/get_group_info': {
    description: '获取群信息',
    request: z.object({
      group_id: z.union([z.string(), z.number()])
    }),
    response: baseResponseSchema.extend({
      data: z.object({})
    })
  },
  '/get_group_info_ex': {
    description: '获取群信息扩展',
    request: z.object({
      group_id: z.union([z.string(), z.number()])
    }),
    response: baseResponseSchema.extend({
      data: z.object({
        groupCode: z.string(),
        resultCode: z.number(),
        extInfo: z.object({
          groupInfoExtSeq: z.number(),
          reserve: z.number(),
          luckyWordId: z.string(),
          lightCharNum: z.number(),
          luckyWord: z.string(),
          starId: z.number(),
          essentialMsgSwitch: z.number(),
          todoSeq: z.number(),
          blacklistExpireTime: z.number(),
          isLimitGroupRtc: z.number(),
          companyId: z.number(),
          hasGroupCustomPortrait: z.number(),
          bindGuildId: z.string(),
          groupOwnerId: z.object({
            memberUin: z.string(),
            memberUid: z.string(),
            memberQid: z.string()
          }),
          essentialMsgPrivilege: z.number(),
          msgEventSeq: z.string(),
          inviteRobotSwitch: z.number(),
          gangUpId: z.string(),
          qqMusicMedalSwitch: z.number(),
          showPlayTogetherSwitch: z.number(),
          groupFlagPro1: z.string(),
          groupBindGuildIds: z.object({
            guildIds: z.array(z.string())
          }),
          viewedMsgDisappearTime: z.string(),
          groupExtFlameData: z.object({
            switchState: z.number(),
            state: z.number(),
            dayNums: z.array(z.number()),
            version: z.number(),
            updateTime: z.string(),
            isDisplayDayNum: z.boolean()
          }),
          groupBindGuildSwitch: z.number(),
          groupAioBindGuildId: z.string(),
          groupExcludeGuildIds: z.object({
            guildIds: z.array(z.string())
          }),
          fullGroupExpansionSwitch: z.number(),
          fullGroupExpansionSeq: z.string(),
          inviteRobotMemberSwitch: z.number(),
          inviteRobotMemberExamine: z.number(),
          groupSquareSwitch: z.number()
        })
      })
    })
  },
  '/create_group_file_folder': {
    description: '创建群文件夹',
    request: z.object({
      group_id: z.union([z.string(), z.number()]),
      folder_name: z.string()
    }),
    response: baseResponseSchema.extend({
      data: z.object({
        result: z.object({
          retCode: z.number(),
          retMsg: z.string(),
          clientWording: z.string()
        }),
        groupItem: z.object({
          peerId: z.string(),
          type: z.string(),
          folderInfo: z.object({
            folderId: z.string(),
            parentFolderId: z.string(),
            folderName: z.string(),
            createTime: z.number(),
            modifyTime: z.number(),
            createUin: z.string(),
            creatorName: z.string(),
            totalFileCount: z.string(),
            modifyUin: z.string(),
            modifyName: z.string(),
            usedSpace: z.string()
          })
        })
      })
    })
  },
  '/delete_group_file': {
    description: '删除群文件',
    request: z.object({
      group_id: z.union([z.string(), z.number()]),
      file_id: z.string()
    }),
    response: baseResponseSchema.extend({
      data: z.object({
        result: z.number(),
        errMsg: z.string(),
        transGroupFileResult: z.object({
          result: z.object({
            retCode: z.number(),
            retMsg: z.string(),
            clientWording: z.string()
          }),
          successFileIdList: z.array(z.string()),
          failFileIdList: z.array(z.string())
        })
      })
    })
  },
  '/delete_group_folder': {
    description: '删除群文件夹',
    request: z.object({
      group_id: z.union([z.string(), z.number()]),
      folder_id: z.string()
    }),
    response: baseResponseSchema.extend({
      data: z.object({
        retCode: z.number(),
        retMsg: z.string(),
        clientWording: z.string()
      })
    })
  },
  '/get_group_file_system_info': {
    description: '获取群文件系统信息',
    request: z.object({
      group_id: z.union([z.string(), z.number()])
    }),
    response: baseResponseSchema.extend({
      data: z.object({
        file_count: z.number(),
        limit_count: z.number(),
        used_space: z.number(),
        total_space: z.number()
      })
    })
  },
  '/get_group_root_files': {
    description: '获取群根目录文件列表',
    request: z.object({
      group_id: z.union([z.string(), z.number()])
    }),
    response: baseResponseSchema.extend({
      data: z.array(
        z.object({
          files: z.array(
            z.object({
              group_id: z.number(),
              file_id: z.string(),
              file_name: z.string(),
              busid: z.number(),
              size: z.number(),
              upload_time: z.number(),
              dead_time: z.number(),
              modify_time: z.number(),
              download_times: z.number(),
              uploader: z.number(),
              uploader_name: z.string()
            })
          ),
          folders: z.array(
            z.object({
              group_id: z.number(),
              folder_id: z.string(),
              folder: z.string(),
              folder_name: z.string(),
              create_time: z.string(),
              creator: z.string(),
              creator_name: z.string(),
              total_file_count: z.string()
            })
          )
        })
      )
    })
  },
  '/get_group_files_by_folder': {
    description: '获取群子目录文件列表',
    request: z.object({
      group_id: z.union([z.string(), z.number()]),
      folder_id: z.string(),
      file_count: z.number()
    }),
    response: baseResponseSchema.extend({
      data: z.object({
        files: z.array(
          z.object({
            group_id: z.number(),
            file_id: z.string(),
            file_name: z.string(),
            busid: z.number(),
            size: z.number(),
            upload_time: z.number(),
            dead_time: z.number(),
            modify_time: z.number(),
            download_times: z.number(),
            uploader: z.number(),
            uploader_name: z.string()
          })
        ),
        folders: z.array(
          z.object({
            group_id: z.number(),
            folder_id: z.string(),
            folder: z.string(),
            folder_name: z.string(),
            create_time: z.string(),
            creator: z.string(),
            creator_name: z.string(),
            total_file_count: z.string()
          })
        )
      })
    })
  },
  '/get_group_file_url': {
    description: '获取群文件下载链接',
    request: z.object({
      group_id: z.union([z.string(), z.number()]),
      file_id: z.string()
    }),
    response: baseResponseSchema.extend({
      data: z.object({
        url: z.string()
      })
    })
  },
  '/get_group_list': {
    description: '获取群列表',
    request: z.object({
      next_token: z.string().optional()
    }),
    response: baseResponseSchema.extend({
      data: z.array(z.object({}))
    })
  },
  '/get_group_member_info': {
    description: '获取群成员信息',
    request: z.object({
      group_id: z.union([z.string(), z.number()]),
      user_id: z.union([z.string(), z.number()]),
      no_cache: z.boolean()
    }),
    response: baseResponseSchema.extend({
      data: z.object({})
    })
  },
  '/get_group_member_list': {
    description: '获取群成员列表',
    request: z.object({
      group_id: z.union([z.string(), z.number()]),
      no_cache: z.boolean()
    }),
    response: baseResponseSchema.extend({
      data: z.array(z.object({}))
    })
  },
  '/get_group_honor_info': {
    description: '获取群荣誉',
    request: z.object({
      group_id: z.union([z.string(), z.number()])
    }),
    response: baseResponseSchema.extend({
      data: z.object({
        group_id: z.string(),
        current_talkative: z.object({
          user_id: z.number(),
          avatar: z.string(),
          nickname: z.string(),
          day_count: z.number(),
          description: z.string()
        }),
        talkative_list: z.array(
          z.object({
            user_id: z.number(),
            avatar: z.string(),
            nickname: z.string(),
            day_count: z.number(),
            description: z.string()
          })
        ),
        performer_list: z.array(
          z.object({
            user_id: z.number(),
            avatar: z.string(),
            nickname: z.string(),
            description: z.string()
          })
        ),
        legend_list: z.array(z.string()),
        emotion_list: z.array(z.string()),
        strong_newbie_list: z.array(z.string())
      })
    })
  },
  '/get_group_at_all_remain': {
    description: '获取群 @全体成员 剩余次数',
    request: z.object({
      group_id: z.union([z.string(), z.number()])
    }),
    response: baseResponseSchema.extend({
      data: z.object({
        can_at_all: z.boolean(),
        remain_at_all_count_for_group: z.number(),
        remain_at_all_count_for_uin: z.number()
      })
    })
  },
  '/get_group_ignored_notifies': {
    description: '获取群过滤系统消息',
    request: z.object({
      group_id: z.union([z.string(), z.number()])
    }),
    response: baseResponseSchema.extend({
      data: z.object({
        join_requests: z.array(
          z.object({
            request_id: z.string(),
            requester_uin: z.string(),
            requester_nick: z.string(),
            group_id: z.string(),
            group_name: z.string(),
            checked: z.boolean(),
            actor: z.string()
          })
        )
      })
    })
  },
  '/set_group_sign': {
    description: '设置群打卡',
    request: z.object({
      group_id: z.union([z.string(), z.number()])
    }),
    response: baseResponseSchema
  },
  '/send_group_sign': {
    description: '发送群打卡',
    request: z.object({
      group_id: z.union([z.string(), z.number()])
    }),
    response: baseResponseSchema
  },
  '/get_ai_characters': {
    description: '获取AI语音人物',
    request: z.object({
      group_id: z.union([z.string(), z.number()]),
      chat_type: z.union([z.string(), z.number()])
    }),
    response: baseResponseSchema.extend({
      data: z.array(
        z.object({
          type: z.string(),
          characters: z.array(
            z.object({
              character_id: z.string(),
              character_name: z.string(),
              preview_url: z.string()
            })
          )
        })
      )
    })
  },
  '/send_group_ai_record': {
    description: '发送群AI语音',
    request: z.object({
      group_id: z.union([z.string(), z.number()]),
      character: z.string(),
      text: z.string()
    }),
    response: baseResponseSchema.extend({
      data: z.object({
        message_id: z.string()
      })
    })
  },
  '/get_ai_record': {
    description: '获取AI语音',
    request: z.object({
      group_id: z.string(),
      character: z.string(),
      text: z.string()
    }),
    response: baseResponseSchema.extend({
      data: z.string()
    })
  }
} as const

export default oneBotHttpApiGroup
