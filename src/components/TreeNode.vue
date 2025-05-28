<template>
  <div class="tree-node">
    <div
      @click="handleClick"
      :class="{
        'tree-item': true,
        'tree-directory': node.type === 'directory',
        'tree-file': node.type === 'file',
        active: node.type === 'file' && selectedFileId === node.id,
        expanded: node.type === 'directory' && node.expanded,
      }"
    >
      <span class="tree-icon">
        <template v-if="node.type === 'directory'">
          {{ node.expanded ? '📂' : '📁' }}
        </template>
        <template v-else> 🌐 </template>
      </span>
      <span class="tree-label" :title="node.name">{{ node.name }}</span>
    </div>

    <div v-if="node.type === 'directory' && node.expanded && node.children" class="tree-children">
      <TreeNode
        v-for="child in node.children"
        :key="child.id"
        :node="child"
        :selected-file-id="selectedFileId"
        @file-selected="$emit('fileSelected', $event)"
        @toggle-directory="$emit('toggleDirectory', $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TreeNode, CodeExample } from '../utils/htmlFileManager'

interface TreeNodeProps {
  node: TreeNode
  selectedFileId?: string
}

const props = defineProps<TreeNodeProps>()

const emit = defineEmits<{
  fileSelected: [file: CodeExample]
  toggleDirectory: [nodeId: string]
}>()

const handleClick = () => {
  if (props.node.type === 'directory') {
    emit('toggleDirectory', props.node.id)
  } else if (props.node.file) {
    emit('fileSelected', props.node.file)
  }
}
</script>

<style scoped>
.tree-node {
  user-select: none;
}

.tree-item {
  display: flex;
  align-items: center;
  padding: 6px 16px;
  cursor: pointer;
  font-size: 13px;
  transition: background-color 0.2s;
}

.tree-item:hover {
  background: #f0f0f0;
}

.tree-item.active {
  background: #007acc;
  color: #ffffff;
}

.tree-directory {
  font-weight: 500;
}

.tree-file {
  padding-left: 32px; /* 文件缩进 */
}

.tree-children {
  padding: 0 16px;
  box-sizing: border-box;
}

.tree-children .tree-file {
  padding-left: 16px; /* 子文件缩进调整 */
  box-sizing: border-box;
}

.tree-icon {
  margin-right: 8px;
  font-size: 12px;
  min-width: 16px;
}

.tree-label {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
