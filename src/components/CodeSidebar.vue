<template>
  <div class="sidebar">
    <div class="folder-tree">
      <h4 class="section-title">目录</h4>
      <div class="tree-container">
        <TreeNode
          v-for="node in fileTree"
          :key="node.id"
          :node="node"
          :selected-file-id="selectedFileId"
          @file-selected="selectFile"
          @toggle-directory="toggleDirectory"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, defineProps, onMounted } from 'vue'
import TreeNode from './TreeNode.vue'
import {
  buildFileTree,
  type CodeExample,
  type TreeNode as TreeNodeType,
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

// 文件树数据
const fileTree = ref<TreeNodeType[]>([])

// 初始化文件树
const initFileTree = async () => {
  try {
    const tree = await buildFileTree()
    fileTree.value = tree
    console.log(`已构建文件树，包含 ${tree.length} 个根节点`)
  } catch (error) {
    console.error('初始化文件树失败:', error)
  }
}

// 方法
const selectFile = (file: CodeExample) => {
  emit('fileSelected', file)
}

const toggleDirectory = (nodeId: string) => {
  const toggleNode = (nodes: TreeNodeType[]): boolean => {
    for (const node of nodes) {
      if (node.id === nodeId) {
        node.expanded = !node.expanded
        return true
      }
      if (node.children && toggleNode(node.children)) {
        return true
      }
    }
    return false
  }
  toggleNode(fileTree.value)
}

// 获取所有文件（用于获取默认文件）
const getAllFiles = (nodes: TreeNodeType[]): CodeExample[] => {
  const files: CodeExample[] = []
  for (const node of nodes) {
    if (node.type === 'file' && node.file) {
      files.push(node.file)
    }
    if (node.children) {
      files.push(...getAllFiles(node.children))
    }
  }
  return files
}

// 生命周期
onMounted(async () => {
  await initFileTree()
})

// 暴露方法供父组件调用
defineExpose({
  getDefaultFile: () => {
    const allFiles = getAllFiles(fileTree.value)
    if (allFiles.length > 0) {
      return allFiles[0]
    }
  },
})
</script>

<style scoped>
.sidebar {
  width: 300px;
  background: #ffffff;
  color: #333333;
  overflow-y: auto;
  border-right: 1px solid #e0e0e0;
}

.section-title {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  color: #333333;
  background: #f5f5f5;
}

.tree-container {
  padding: 0;
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
