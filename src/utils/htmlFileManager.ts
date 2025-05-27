// HTML 文件管理器 - 统一存储在 public/codeHtml/ 目录中
export interface HtmlFileConfig {
  fileName: string
  displayName: string
  description?: string
}

// 代码示例接口
export interface CodeExample {
  id: string
  name: string
  type: 'html' | 'javascript' | 'css'
  code: string
  description: string
  filePath?: string
}

// HTML 文件配置列表 - 文件存储在 public/codeHtml/ 目录
export const htmlFileConfigs: HtmlFileConfig[] = [
  {
    fileName: 'tianditu.html',
    displayName: '天地图示例',
    description: 'OpenLayers 集成天地图服务，定位武汉',
  },

  // 添加新的 HTML 文件：
  // 1. 在 public/codeHtml/ 目录中创建 HTML 文件
  // 2. 在此配置数组中添加文件信息
]

// 加载 HTML 文件内容的函数
export const loadHtmlFile = async (fileName: string): Promise<string> => {
  try {
    // 从 public 目录加载文件
    const response = await fetch(`/codeHtml/${fileName}`)
    if (response.ok) {
      return await response.text()
    } else {
      console.error(`Failed to load ${fileName}:`, response.statusText)
      return `<!-- 文件加载失败: ${fileName} -->
<html>
<head>
  <title>文件加载失败</title>
</head>
<body>
  <h1>文件加载失败</h1>
  <p>无法加载文件: ${fileName}</p>
  <p>请检查文件路径是否正确</p>
</body>
</html>`
    }
  } catch (error) {
    console.error(`Error loading ${fileName}:`, error)
    return `<!-- 文件加载失败: ${fileName} -->
<html>
<head>
  <title>文件加载失败</title>
</head>
<body>
  <h1>文件加载失败</h1>
  <p>加载文件时出错: ${fileName}</p>
  <p>错误信息: ${error}</p>
</body>
</html>`
  }
}

// 获取文件名（不含扩展名）
export const getFileNameWithoutExtension = (fileName: string): string => {
  return fileName.replace('.html', '')
}

// 获取所有配置的 HTML 文件
export const autoDetectHtmlFiles = async (): Promise<HtmlFileConfig[]> => {
  // 返回 public/codeHtml/ 目录中配置的文件列表
  return htmlFileConfigs
}
