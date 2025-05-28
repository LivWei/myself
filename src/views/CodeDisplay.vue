<template>
  <div class="code-display">
    <!-- <div class="header">
      <div class="header-left">代码示例</div>

      <div class="tab-list">
        <div class="tab-item">openlayers</div>
      </div>
    </div> -->

    <div class="content">
      <!-- 左侧目录 -->
      <CodeSidebar
        :selectedFileId="selectedFile?.id"
        @fileSelected="handleFileSelected"
        ref="sidebarRef"
      />

      <!-- 中间代码编辑器 -->
      <div class="editor-container" :style="{ width: editorWidth + 'px' }">
        <CodeEditor
          :code="currentCode"
          :selectedFileName="selectedFile?.name"
          :fileType="selectedFile?.type"
          @codeChanged="handleCodeChanged"
          @copyCode="handleCopyCode"
          @runCode="handleRunCode"
          ref="editorRef"
        />
      </div>

      <!-- 拖拽分割线 -->
      <div class="resizer" @mousedown="startResize"></div>

      <!-- 右侧预览区域 -->
      <div class="preview-container" :style="{ width: previewWidth + 'px' }">
        <CodePreview
          :fileType="selectedFile?.type"
          :code="currentCode"
          :consoleLogs="consoleLogs"
          ref="previewRef"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { CodeExample } from '../utils/htmlFileManager'
import CodeSidebar from '../components/CodeSidebar.vue'
import CodeEditor from '../components/CodeEditor.vue'
import CodePreview from '../components/CodePreview.vue'

// 响应式状态
const selectedFile = ref<CodeExample | null>(null)
const currentCode = ref('')
const consoleLogs = ref<string[]>([])

// 拖拽调整宽度相关状态
const editorWidth = ref(600)
const previewWidth = ref(400)
const isResizing = ref(false)
const startX = ref(0)
const startEditorWidth = ref(0)
const containerWidth = ref(1200)
const minWidth = 200 // 最小宽度

// 组件引用
const sidebarRef = ref<InstanceType<typeof CodeSidebar>>()
const editorRef = ref<InstanceType<typeof CodeEditor>>()
const previewRef = ref<InstanceType<typeof CodePreview>>()

// 事件处理方法
/**
 * 处理文件选择事件
 * @param file 选中的代码示例文件
 */
const handleFileSelected = (file: CodeExample) => {
  // 更新当前选中的文件
  selectedFile.value = file
  // 将文件内容加载到代码编辑器
  currentCode.value = file.code
  // 清空控制台日志
  consoleLogs.value = []

  // 文件选择处理完成
}

/**
 * 处理代码编辑器内容变化事件
 * @param code 更新后的代码内容
 */
const handleCodeChanged = (code: string) => {
  // 同步更新当前代码内容
  currentCode.value = code
}

/**
 * 处理代码复制事件
 */
const handleCopyCode = () => {
  // 添加复制成功提示到控制台
  consoleLogs.value.push('代码已复制到剪贴板')
}

/**
 * 处理代码运行事件
 * @param code 要执行的代码内容
 * @param fileType 文件类型
 */
const handleRunCode = (code: string, fileType: string) => {
  // 清空之前的控制台输出
  consoleLogs.value = []

  // 只支持JavaScript代码的直接运行
  if (fileType === 'javascript') {
    try {
      // 保存原始的console.log方法
      const originalLog = console.log
      // 重定向console.log到我们的日志数组
      console.log = (...args) => {
        // 将输出内容添加到控制台日志
        consoleLogs.value.push(args.join(' '))
        // 同时保持原始控制台输出
        originalLog.apply(console, args)
      }

      // 执行用户代码
      eval(code)

      // 恢复原始console.log方法
      console.log = originalLog

      // 如果没有任何输出，显示执行完成信息
      if (consoleLogs.value.length === 0) {
        consoleLogs.value.push('代码执行完成，无输出')
      }
    } catch (error) {
      // 捕获并显示代码执行错误
      consoleLogs.value.push('错误: ' + error)
    }
  } else {
    // 其他文件类型暂不支持直接运行
    consoleLogs.value.push('此文件类型不支持直接运行')
  }
}

// 拖拽调整宽度相关方法
/**
 * 开始拖拽调整宽度
 * @param event 鼠标按下事件
 */
const startResize = (event: MouseEvent) => {
  // 设置拖拽状态为true
  isResizing.value = true
  // 记录拖拽开始时的鼠标X坐标
  startX.value = event.clientX
  // 记录拖拽开始时的编辑器宽度
  startEditorWidth.value = editorWidth.value

  // 实时计算容器总宽度
  updateContainerWidth()

  // 获取主容器元素
  const codeDisplay = document.querySelector('.code-display') as HTMLElement
  if (codeDisplay) {
    // 添加拖拽状态样式类
    codeDisplay.classList.add('resizing')
  }

  // 添加全局鼠标移动和释放事件监听，passive: false 确保能阻止默认行为
  document.addEventListener('mousemove', handleResize, { passive: false })
  document.addEventListener('mouseup', stopResize, { passive: false })

  // 阻止默认行为和事件冒泡
  event.preventDefault()
  event.stopPropagation()
}

/**
 * 处理拖拽过程中的鼠标移动
 * @param event 鼠标移动事件
 */
const handleResize = (event: MouseEvent) => {
  // 如果不在拖拽状态，直接返回
  if (!isResizing.value) return

  // 阻止默认行为，避免选择文本
  event.preventDefault()
  event.stopPropagation()

  // 计算鼠标移动的距离
  const deltaX = event.clientX - startX.value
  // 计算新的编辑器宽度
  let newEditorWidth = startEditorWidth.value + deltaX

  // 定义最小宽度约束
  const minEditorWidth = minWidth
  const minPreviewWidth = minWidth
  const resizerWidth = 6 // 拖拽条宽度
  // 计算编辑器最大宽度（容器宽度 - 预览区最小宽度 - 拖拽条宽度）
  const maxEditorWidth = containerWidth.value - minPreviewWidth - resizerWidth

  // 限制宽度在合理范围内
  newEditorWidth = Math.max(minEditorWidth, Math.min(newEditorWidth, maxEditorWidth))

  // 使用 requestAnimationFrame 优化性能，减少重绘次数
  requestAnimationFrame(() => {
    // 更新编辑器宽度
    editorWidth.value = newEditorWidth
    // 更新预览区宽度（总宽度 - 编辑器宽度 - 拖拽条宽度）
    previewWidth.value = containerWidth.value - newEditorWidth - resizerWidth
  })
}

/**
 * 停止拖拽调整宽度
 */
const stopResize = () => {
  // 如果不在拖拽状态，直接返回
  if (!isResizing.value) return

  // 设置拖拽状态为false
  isResizing.value = false

  // 获取主容器元素
  const codeDisplay = document.querySelector('.code-display') as HTMLElement
  if (codeDisplay) {
    // 移除拖拽状态样式类
    codeDisplay.classList.remove('resizing')
  }

  // 移除全局鼠标事件监听器
  document.removeEventListener('mousemove', handleResize)
  document.removeEventListener('mouseup', stopResize)
}

/**
 * 更新容器宽度的辅助函数
 * 计算并更新编辑器和预览区的宽度分配
 */
const updateContainerWidth = () => {
  // 获取主容器元素
  const codeDisplay = document.querySelector('.code-display') as HTMLElement
  if (codeDisplay) {
    // 侧边栏宽度（固定280px）
    const sidebarWidth = 280
    // 拖拽条宽度（固定6px）
    const resizerWidth = 6
    // 计算可用于编辑器和预览区的总宽度
    containerWidth.value = codeDisplay.offsetWidth - sidebarWidth

    // 计算当前内容区域的总宽度
    const totalContentWidth = editorWidth.value + previewWidth.value + resizerWidth
    // 如果当前宽度分配与容器宽度差异较大（超过5px），则重新调整
    if (Math.abs(totalContentWidth - containerWidth.value) > 5) {
      // 计算当前编辑器宽度占比
      const ratio = editorWidth.value / (editorWidth.value + previewWidth.value)
      // 按比例重新分配编辑器宽度
      editorWidth.value = Math.floor((containerWidth.value - resizerWidth) * ratio)
      // 计算预览区宽度（剩余宽度）
      previewWidth.value = containerWidth.value - editorWidth.value - resizerWidth
    }
  }
}

/**
 * 组件挂载后的生命周期处理
 * 初始化默认文件选择、容器宽度计算和窗口大小监听
 */
onMounted(() => {
  // 检查侧边栏引用是否可用
  if (sidebarRef.value) {
    // 获取默认要显示的文件
    const defaultFile = sidebarRef.value.getDefaultFile()
    if (defaultFile) {
      // 选择并显示默认文件
      handleFileSelected(defaultFile)
    }
  }

  // 延迟初始化容器宽度，确保DOM已渲染完成
  setTimeout(() => {
    updateContainerWidth()

    // 根据屏幕尺寸自动调整初始宽度分配
    const codeDisplay = document.querySelector('.code-display') as HTMLElement
    if (codeDisplay) {
      const sidebarWidth = 280
      const resizerWidth = 6
      const availableWidth = codeDisplay.offsetWidth - sidebarWidth - resizerWidth

      // 按 6:4 的比例分配编辑器和预览区宽度
      editorWidth.value = Math.floor(availableWidth * 0.6)
      previewWidth.value = availableWidth - editorWidth.value
    }
  }, 0)

  // 定义窗口大小变化的防抖延时器
  let resizeTimeout: number
  /**
   * 处理窗口大小变化事件
   * 使用防抖技术避免频繁触发重新计算
   */
  const handleWindowResize = () => {
    // 清除之前的延时器
    clearTimeout(resizeTimeout)
    // 设置新的延时器，100ms后执行宽度重新计算
    resizeTimeout = window.setTimeout(() => {
      updateContainerWidth()
    }, 100)
  }

  // 添加窗口大小变化监听器
  window.addEventListener('resize', handleWindowResize)

  // 组件卸载时的清理函数
  return () => {
    // 移除窗口大小变化监听器，防止内存泄漏
    window.removeEventListener('resize', handleWindowResize)
  }
})
</script>

<style scoped>
.code-display {
  display: flex;
  width: 100vw;
  height: 100vh;
  background: #f5f5f5;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.header {
  height: 60px;
  width: 100%;
  background: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  box-sizing: border-box;
}

.header-left {
  font-size: 20px;
  font-weight: 600;
}

.tab-list {
  display: flex;
  align-items: center;
}

.tab-item {
  padding: 8px 16px;
  font-size: 18px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  cursor: pointer;
}

.tab-item:hover {
  background: #007acc;
  color: #ffffff;
}

.content {
  flex: 1;
  height: 0;
  display: flex;
}

.editor-container {
  display: flex;
  flex-direction: column;
}

.preview-container {
  display: flex;
  flex-direction: column;
}

.resizer {
  width: 6px;
  background: linear-gradient(to right, #f0f0f0, #e8e8e8, #f0f0f0);
  cursor: col-resize;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
  transition: all 0.2s ease;
  position: relative;
  flex-shrink: 0;
  z-index: 10;
  box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.1);
}

.resizer:hover {
  background: linear-gradient(to right, #007acc, #0056b3, #007acc);
  border-color: #007acc;
  box-shadow:
    inset 0 0 3px rgba(0, 122, 204, 0.3),
    0 0 8px rgba(0, 122, 204, 0.2);
  transform: scaleX(1.2);
}

.resizer:active {
  background: linear-gradient(to right, #005a9e, #004085, #005a9e);
  border-color: #005a9e;
  box-shadow:
    inset 0 0 4px rgba(0, 90, 158, 0.4),
    0 0 12px rgba(0, 90, 158, 0.3);
  transform: scaleX(1.3);
}

/* 为拖拽添加一个更大的可点击区域 */
.resizer::before {
  content: '';
  position: absolute;
  top: 0;
  left: -6px;
  right: -6px;
  bottom: 0;
  cursor: col-resize;
  z-index: 11;
}

/* 拖拽指示器 */
.resizer::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 2px;
  height: 20px;
  background: rgba(255, 255, 255, 0.6);
  transform: translate(-50%, -50%);
  border-radius: 1px;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.resizer:hover::after {
  opacity: 1;
}

/* 拖拽时禁用文本选择和优化性能 */
.code-display.resizing {
  user-select: none;
  cursor: col-resize;
  pointer-events: none;
}

.code-display.resizing .resizer {
  pointer-events: auto;
  background: linear-gradient(to right, #005a9e, #004085, #005a9e);
  border-color: #005a9e;
  box-shadow:
    inset 0 0 4px rgba(0, 90, 158, 0.4),
    0 0 12px rgba(0, 90, 158, 0.3),
    0 0 20px rgba(0, 90, 158, 0.2);
  transform: scaleX(1.4);
}

.code-display.resizing .resizer::after {
  opacity: 1;
  background: rgba(255, 255, 255, 0.8);
  height: 30px;
}

.code-display.resizing * {
  cursor: col-resize !important;
  pointer-events: none;
}

.code-display.resizing .resizer * {
  pointer-events: auto;
}

/* 为容器添加硬件加速 */
.editor-container,
.preview-container {
  will-change: width;
  transform: translateZ(0);
}

/* 减少重绘 */
.code-display.resizing .editor-container,
.code-display.resizing .preview-container {
  pointer-events: none;
}
</style>
