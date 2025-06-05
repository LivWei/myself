<template>
  <div class="rain-container">
    <div
      class="rain-item"
      v-for="item in rainItems"
      :key="item.name"
      @click="handleRain(item.type)"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { addCustomRain, removeCustomRain } from './utils'
import { el } from 'element-plus/es/locales.mjs'

defineOptions({ name: 'CesiumRain' })

const rainItems = [
  { name: '小雨', type: 'light' },
  { name: '中雨', type: 'moderate' },
  { name: '大雨', type: 'heavy' },
  { name: '清除', type: 'clear' },
]

let viewer: any = null
let rainStage: any = null

onMounted(() => {
  viewer = (window as any).viewer
})

onUnmounted(() => {
  removeRain()
})

async function handleRain(type: string) {
  removeRain()
  if (!viewer) return
  if (type === 'clear') return

  let options = {}
  if (type === 'light') {
    options = {
      speed: 12.0, // 慢
      density: 2.5, // 稀疏
      falloff: 38.0, // 更细长
      angle: 18.0, // 角度大
      thickness: 0.009, // 更细
    }
  } else if (type === 'moderate') {
    options = {
      speed: 28.0, // 适中
      density: 7.0, // 适中
      falloff: 32.0, // 适中
      angle: 14.0, // 适中
      thickness: 0.016, // 适中
    }
  } else if (type === 'heavy') {
    options = {
      speed: 48.0, // 快
      density: 16.0, // 密集
      falloff: 25.0, // 更短更密
      angle: 10.0, // 角度小
      thickness: 0.028, // 更粗
    }
  }
  rainStage = await addCustomRain(viewer, options)
}

function removeRain() {
  if (rainStage && viewer) {
    removeCustomRain(viewer, rainStage)
    rainStage = null
  }
}
</script>

<style scoped>
.rain-container {
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
}

.rain-item {
  padding: 10px;
  border-radius: 5px;
  background-color: #fff;
  cursor: pointer;
  color: #000;
  border: 1px solid #000;
  margin-bottom: 10px;
}
</style>
