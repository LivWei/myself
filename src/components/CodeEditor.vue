<template>
  <div class="editor-panel">
    <div class="editor-header">
      <div class="file-tabs">
        <div class="tab active">
          <span>{{ selectedFileName || '源代码' }}</span>
          <button class="copy-btn" @click="copyCode" title="复制代码">📋</button>
          <button class="run-btn" @click="runCode" title="运行">▶️</button>
        </div>
      </div>
    </div>

    <div class="editor-content">
      <div class="line-numbers">
        <div v-for="n in lineCount" :key="n" class="line-number">
          {{ n }}
        </div>
      </div>

      <textarea
        v-model="localCode"
        class="code-editor"
        spellcheck="false"
        @input="handleInput"
        @scroll="syncScroll"
        ref="codeEditorRef"
      ></textarea>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, defineEmits, defineProps } from 'vue'

// 定义 props
interface Props {
  code: string
  selectedFileName?: string
  fileType?: string
}

const props = defineProps<Props>()

// 定义 emits
const emit = defineEmits<{
  codeChanged: [code: string]
  copyCode: []
  runCode: [code: string, fileType: string]
}>()

// 响应式状态
const localCode = ref('')
const lineCount = ref(1)
const codeEditorRef = ref<HTMLTextAreaElement>()

// 方法
const updateLineCount = () => {
  lineCount.value = localCode.value.split('\n').length
}

const handleInput = () => {
  updateLineCount()
  emit('codeChanged', localCode.value)
}

// 监听外部代码变化
watch(
  () => props.code,
  (newCode) => {
    localCode.value = newCode
    updateLineCount()
  },
  { immediate: true },
)

// 计算属性
const selectedFileName = computed(() => props.selectedFileName)

const syncScroll = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  const lineNumbers = document.querySelector('.line-numbers') as HTMLElement
  if (lineNumbers) {
    lineNumbers.scrollTop = target.scrollTop
  }
}

const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(localCode.value)
    emit('copyCode')
  } catch (err) {
    console.error('复制失败:', err)
  }
}

const runCode = () => {
  emit('runCode', localCode.value, props.fileType || 'javascript')
}

// 暴露方法
defineExpose({
  focus: () => {
    codeEditorRef.value?.focus()
  },
})
</script>

<style scoped>
.editor-panel {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #ffffff;
}

.editor-header {
  background: #f5f5f5;
  border-bottom: 1px solid #e0e0e0;
}

.file-tabs {
  display: flex;
}

.tab {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background: #ffffff;
  color: #333333;
  font-size: 13px;
  border-right: 1px solid #e0e0e0;
  gap: 8px;
}

.copy-btn,
.run-btn {
  background: none;
  border: none;
  color: #666666;
  cursor: pointer;
  padding: 4px;
  border-radius: 3px;
  transition: background-color 0.2s;
}

.copy-btn:hover,
.run-btn:hover {
  background: #f0f0f0;
}

.editor-content {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.line-numbers {
  width: 50px;
  background: #f8f8f8;
  border-right: 1px solid #e0e0e0;
  overflow: hidden;
  user-select: none;
  padding-top: 16px;
}

.line-number {
  height: 20px;
  padding: 0 8px;
  font-size: 13px;
  font-family: 'Monaco', 'Consolas', monospace;
  color: #999999;
  text-align: right;
  line-height: 20px;
}

.code-editor {
  flex: 1;
  background: #ffffff;
  color: #333333;
  border: none;
  outline: none;
  resize: none;
  font-family: 'Monaco', 'Consolas', monospace;
  font-size: 13px;
  line-height: 20px;
  padding: 16px;
  white-space: pre;
  overflow-wrap: normal;
  overflow-x: auto;
}
</style>
