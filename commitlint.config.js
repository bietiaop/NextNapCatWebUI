export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'bug', // 此项特别针对bug号，用于向测试反馈bug列表的bug修改情况
        'feat', // 新功能（feature）
        'fix', // 修补bug
        'docs', // 文档（documentation）
        'style', // 格式优化
        'refactor', // 重构
        'test', // 增加测试
        'chore', // 构建过程或辅助工具的变动
        'revert', // 撤销之前的commit
        'merge', // 合并分支
        'release' // 发布版本
      ]
    ]
  }
}
