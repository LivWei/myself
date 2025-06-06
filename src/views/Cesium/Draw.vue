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
import CesiumDynamicDrawer from './cesiumCtrl/draw'
// @ts-expect-error: no type declaration file for CesiumDynamicDrawer
// eslint-disable-next-line
import type { CesiumDynamicDrawer as CesiumDynamicDrawerType } from './cesiumCtrl/draw'

type DrawType = 'point' | 'polyline' | 'polygon' | 'clear'
const drawItems: { name: string; type: DrawType }[] = [
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

// eslint-disable-next-line
const drawer: any = new CesiumDynamicDrawer((window as any).viewer)

const handleDraw = (item: DrawType) => {
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
