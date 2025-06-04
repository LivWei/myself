<template>
  <div class="draw-container">
    <div
      class="draw-item"
      v-for="item in drawItems"
      :key="item.name"
      @click="handleDraw(item.type)"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'CesiumDraw' })
import CesiumDynamicDrawer from './utils'

const drawItems = [
  {
    name: '绘制点',
    type: 'point',
  },
  {
    name: '绘制线',
    type: 'polyline',
  },
  {
    name: '绘制面',
    type: 'polygon',
  },
  {
    name: '清除',
    type: 'clear',
  },
]

const drawer = new CesiumDynamicDrawer(window.viewer)

const handleDraw = (item: string) => {
  if (item === 'clear') {
    drawer.clear()
  } else {
    drawer.startDrawing(item)
  }
}
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
