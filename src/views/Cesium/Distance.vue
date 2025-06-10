<template>
  <div class="draw-container">
    <div class="draw-item" v-for="item in measureItems" :key="item.name" @click="item.action()">
      {{ item.name }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { onUnmounted } from 'vue'

import CesiumDistanceMeasurer from './cesiumCtrl/distance.js'
// eslint-disable-next-line
let distanceMeasurer: any = null

// 由于 window.viewer 为全局变量，类型使用 any 兼容
const getViewer = () => (window as any).viewer as any // eslint-disable-line @typescript-eslint/no-explicit-any

const startMeasure = () => {
  const viewer = getViewer()
  if (!viewer) return
  if (!distanceMeasurer) {
    distanceMeasurer = new CesiumDistanceMeasurer(viewer)
  }
  distanceMeasurer.startDrawing('clampDistance')
}

const startSpaceMeasure = () => {
  const viewer = getViewer()
  if (!viewer) return
  if (!distanceMeasurer) {
    distanceMeasurer = new CesiumDistanceMeasurer(viewer)
  }
  distanceMeasurer.startDrawing('ctrlDistance')
}

const startClampArea = () => {
  const viewer = getViewer()
  if (!viewer) return
  if (!distanceMeasurer) {
    distanceMeasurer = new CesiumDistanceMeasurer(viewer)
  }
  distanceMeasurer.startDrawing('clampArea')
}

const startCtrlArea = () => {
  const viewer = getViewer()
  if (!viewer) return
  if (!distanceMeasurer) {
    distanceMeasurer = new CesiumDistanceMeasurer(viewer)
  }
  distanceMeasurer.startDrawing('ctrlArea')
}

const startTriangleMeasure = () => {
  const viewer = getViewer()
  if (!viewer) return
  if (!distanceMeasurer) {
    distanceMeasurer = new CesiumDistanceMeasurer(viewer)
  }
  distanceMeasurer.startDrawing('triangle')
}

const clearMeasure = () => {
  if (distanceMeasurer) {
    distanceMeasurer.clear()
  }
}

const measureItems = [
  { name: '贴地距离', action: startMeasure },
  { name: '空间距离', action: startSpaceMeasure },
  { name: '贴地面积', action: startClampArea },
  { name: '水平面积', action: startCtrlArea },
  { name: '三角测量', action: startTriangleMeasure },
  { name: '清除', action: clearMeasure },
]

onUnmounted(() => {
  clearMeasure()
})
</script>

<style scoped>
.draw-container {
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
}

.draw-item {
  padding: 10px;
  border-radius: 5px;
  background-color: #fff;
  cursor: pointer;
  color: #000;
  border: 1px solid #000;
  margin-bottom: 10px;
}
</style>
