import key from '@/const/key'

/**
 * 打开链接
 * @param url 链接地址
 * @param newTab 是否在新标签页打开
 */
export function openUrl(url: string, newTab = true) {
  if (newTab) {
    window.open(url)
  } else {
    window.location.href = url
  }
}

/**
 * 获取完整的服务器地址
 * @param path 路径
 */
export const getFullServerUrl = (path: string) => {
  let _storeURL =
    localStorage.getItem(key.storeURL) ?? '"http://localhost:6099"'
  _storeURL = JSON.parse(_storeURL)
  return _storeURL + path
}
