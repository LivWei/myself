// HTML 文件管理器 - 统一存储在 public/codeHtml/ 目录中
import { htmlFileConfigs, directoryConfigs } from './fileConfig.js'
import type { DirectoryConfig, HtmlFileConfig as BaseHtmlFileConfig } from './fileConfig.d.ts'

export interface HtmlFileConfig extends BaseHtmlFileConfig {
  directory?: string // 添加目录字段
}

// 代码示例接口
export interface CodeExample {
  id: string
  name: string
  type: 'html' | 'javascript' | 'css'
  code: string
  description: string
  filePath?: string
  directory?: string // 添加目录字段
}

// 目录树节点接口
export interface TreeNode {
  id: string
  name: string
  type: 'directory' | 'file'
  children?: TreeNode[]
  file?: CodeExample
  expanded?: boolean
}

// 导出配置，供其他模块使用
export { htmlFileConfigs, directoryConfigs }

// 加载 HTML 文件内容的函数
export const loadHtmlFile = async (fileName: string, directory?: string): Promise<string> => {
  try {
    // 构建文件路径
    const filePath = directory ? `/codeHtml/${directory}/${fileName}` : `/codeHtml/${fileName}`
    const response = await fetch(filePath)
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

// 扫描目录中的 HTML 文件
export const scanDirectoryFiles = async (directory: string): Promise<string[]> => {
  try {
    // 这里我们需要根据已知的目录配置来获取文件列表
    // 由于浏览器环境限制，我们无法直接扫描目录
    // 所以我们需要在配置中预定义文件列表
    const dirConfig = directoryConfigs.find((d: DirectoryConfig) => d.name === directory)
    if (dirConfig && dirConfig.files) {
      return dirConfig.files
    }
    return []
  } catch (error) {
    console.error(`Error scanning directory ${directory}:`, error)
    return []
  }
}

// 获取所有配置的 HTML 文件（包括目录中的文件）
export const autoDetectHtmlFiles = async (): Promise<HtmlFileConfig[]> => {
  const allFiles: HtmlFileConfig[] = [...htmlFileConfigs]

  // 扫描配置的目录
  for (const dirConfig of directoryConfigs) {
    const files = await scanDirectoryFiles(dirConfig.name)
    for (const fileName of files) {
      // 为特定文件提供更好的显示名称
      const displayName = getFileNameWithoutExtension(fileName)

      allFiles.push({
        fileName,
        displayName,
        description: `${dirConfig.displayName} - ${displayName}`,
        directory: dirConfig.name,
      })
    }
  }

  return allFiles
}

// 构建树形结构
export const buildFileTree = async (): Promise<TreeNode[]> => {
  const tree: TreeNode[] = []
  const allFiles = await autoDetectHtmlFiles()

  // 创建目录节点映射
  const directoryNodes = new Map<string, TreeNode>()

  // 首先创建所有目录节点
  for (const dirConfig of directoryConfigs) {
    const dirNode: TreeNode = {
      id: `dir-${dirConfig.name}`,
      name: dirConfig.displayName,
      type: 'directory',
      children: [],
      expanded: true, // 默认展开
    }
    directoryNodes.set(dirConfig.name, dirNode)
    tree.push(dirNode)
  }

  // 然后添加文件节点
  for (const fileConfig of allFiles) {
    const code = await loadHtmlFile(fileConfig.fileName, fileConfig.directory)
    const fileExample: CodeExample = {
      id: fileConfig.directory
        ? `html-${fileConfig.directory}-${getFileNameWithoutExtension(fileConfig.fileName)}`
        : `html-${getFileNameWithoutExtension(fileConfig.fileName)}`,
      name: fileConfig.displayName,
      type: 'html',
      description: fileConfig.description || `${fileConfig.displayName} - ${fileConfig.fileName}`,
      code: code,
      filePath: fileConfig.directory
        ? `/codeHtml/${fileConfig.directory}/${fileConfig.fileName}`
        : `/codeHtml/${fileConfig.fileName}`,
      directory: fileConfig.directory,
    }

    const fileNode: TreeNode = {
      id: fileExample.id,
      name: fileExample.name,
      type: 'file',
      file: fileExample,
    }

    if (fileConfig.directory) {
      // 添加到对应目录
      const dirNode = directoryNodes.get(fileConfig.directory)
      if (dirNode && dirNode.children) {
        dirNode.children.push(fileNode)
      }
    } else {
      // 添加到根级别
      tree.push(fileNode)
    }
  }

  return tree
}
