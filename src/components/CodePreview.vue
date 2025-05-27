<template>
  <div class="preview-panel">
    <div class="preview-header">预览</div>

    <div class="preview-content" :style="{ transform: `scale(${zoomLevel})` }">
      <div v-if="isHtmlExample" class="html-preview">
        <iframe
          :srcdoc="previewHtml"
          class="preview-iframe"
          sandbox="allow-scripts allow-same-origin"
        ></iframe>
      </div>

      <div v-else class="output-console">
        <div class="console-header">控制台输出</div>
        <div class="console-content">
          <div v-for="(log, index) in consoleLogs" :key="index" class="console-line">
            {{ log }}
          </div>
          <div v-if="consoleLogs.length === 0" class="console-empty">点击运行按钮执行代码...</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps } from 'vue'

// 定义 props
interface Props {
  fileType?: string
  code?: string
  consoleLogs?: string[]
}

const props = defineProps<Props>()

// 响应式状态
const zoomLevel = ref(1)

// 计算属性
const isHtmlExample = computed(() => props.fileType === 'html')
const previewHtml = computed(() => {
  if (props.fileType === 'html' && props.code) {
    return props.code
  }
  return ''
})

const consoleLogs = computed(() => props.consoleLogs || [])

// 暴露方法
defineExpose({
  resetZoom: () => {
    zoomLevel.value = 1
  },
})
</script>

<style scoped>
.preview-panel {
  width: 100%;
  height: 100vh;
  background: #ffffff;
  border-left: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.preview-header {
  padding: 12px 16px;
  background: #f8f8f8;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  padding: 12px 16px;
  background: #ffffff;
  color: #333333;
  font-size: 13px;
  justify-content: center;
}

.zoom-btn:hover {
  background: #f0f0f0;
}

.preview-content {
  flex: 1;
  overflow: hidden;
  transform-origin: top left;
  transition: transform 0.2s;
}

.html-preview {
  width: 100%;
  height: 100%;
}

.preview-iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.output-console {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.console-header {
  padding: 8px 16px;
  background: #f0f0f0;
  border-bottom: 1px solid #e0e0e0;
  font-size: 12px;
  font-weight: 600;
  color: #666;
}

.console-content {
  flex: 1;
  padding: 16px;
  font-family: 'Monaco', 'Consolas', monospace;
  font-size: 12px;
  overflow-y: auto;
}

.console-line {
  margin-bottom: 4px;
  color: #333;
}

.console-empty {
  color: #999;
  font-style: italic;
}

/* 滚动条样式 */
.preview-content::-webkit-scrollbar,
.console-content::-webkit-scrollbar {
  width: 8px;
}

.preview-content::-webkit-scrollbar-track,
.console-content::-webkit-scrollbar-track {
  background: #f0f0f0;
}

.preview-content::-webkit-scrollbar-thumb,
.console-content::-webkit-scrollbar-thumb {
  background: #c0c0c0;
  border-radius: 4px;
}
</style>
