// TypeScript 声明文件 for fileConfig.js

export interface DirectoryConfig {
  name: string
  displayName: string
  description?: string
  files: string[]
}

export interface HtmlFileConfig {
  fileName: string
  displayName: string
  description?: string
}

declare const directoryConfigs: DirectoryConfig[]
declare const htmlFileConfigs: HtmlFileConfig[]

export { directoryConfigs, htmlFileConfigs }
