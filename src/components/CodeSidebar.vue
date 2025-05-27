<template>
  <div class="sidebar">
    <h3 class="sidebar-title">博索</h3>
    <div class="folder-tree">
      <div class="tree-section">
        <h4 class="section-title">HTML 示例</h4>
        <ul class="file-list">
          <li
            v-for="item in htmlExamples"
            :key="item.id"
            @click="selectFile(item)"
            :class="{ active: selectedFileId === item.id }"
            class="file-item"
          >
            <span class="file-icon">🌐</span>
            {{ item.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, defineProps, onMounted } from 'vue'
import {
  autoDetectHtmlFiles,
  loadHtmlFile,
  getFileNameWithoutExtension,
  type CodeExample,
} from '../utils/htmlFileManager'

// 定义 props
interface Props {
  selectedFileId?: string
}

defineProps<Props>()

// 定义 emits
const emit = defineEmits<{
  fileSelected: [file: CodeExample]
}>()

// HTML 示例数据
const htmlExamples = ref<CodeExample[]>([])

// 初始化 HTML 示例
const initHtmlExamples = async () => {
  try {
    const htmlFiles = await autoDetectHtmlFiles()
    const examples: CodeExample[] = []

    for (const file of htmlFiles) {
      const code = await loadHtmlFile(file.fileName)
      examples.push({
        id: `html-${getFileNameWithoutExtension(file.fileName)}`,
        name: file.displayName,
        type: 'html',
        description: file.description || `${file.displayName} - ${file.fileName}`,
        code: code,
        filePath: `/codeHtml/${file.fileName}`,
      })
    }

    htmlExamples.value = examples
    console.log(`已加载 ${examples.length} 个 HTML 示例文件`)
  } catch (error) {
    console.error('初始化 HTML 示例失败:', error)
  }
}

// 方法
const selectFile = (file: CodeExample) => {
  emit('fileSelected', file)
}

// 生命周期
onMounted(async () => {
  await initHtmlExamples()
})

// 暴露方法供父组件调用
defineExpose({
  getDefaultFile: () => {
    if (htmlExamples.value.length > 0) {
      return htmlExamples.value[0]
    }
  },
})
</script>

<style scoped>
.sidebar {
  width: 200px;
  background: #ffffff;
  color: #333333;
  overflow-y: auto;
  border-right: 1px solid #e0e0e0;
}

.sidebar-title {
  padding: 16px;
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  border-bottom: 1px solid #e0e0e0;
  color: #333333;
}

.folder-tree {
  padding: 8px 0;
}

.tree-section {
  margin-bottom: 16px;
}

.section-title {
  padding: 8px 16px;
  margin: 0;
  font-size: 13px;
  font-weight: 500;
  color: #333333;
  background: #f5f5f5;
}

.file-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.file-item {
  display: flex;
  align-items: center;
  padding: 6px 24px;
  cursor: pointer;
  font-size: 13px;
  transition: background-color 0.2s;
}

.file-item:hover {
  background: #f0f0f0;
}

.file-item.active {
  background: #007acc;
  color: #ffffff;
}

.file-icon {
  margin-right: 8px;
  font-size: 12px;
}

/* 滚动条样式 */
.sidebar::-webkit-scrollbar {
  width: 8px;
}

.sidebar::-webkit-scrollbar-track {
  background: #ffffff;
}

.sidebar::-webkit-scrollbar-thumb {
  background: #c0c0c0;
  border-radius: 4px;
}
</style>
