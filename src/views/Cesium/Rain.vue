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
import { addCustomRain, removeCustomRain } from './cesiumCtrl/rain'

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

  let options: { rainSpeed: number; rainSize: number; tiltAngle: number }
  if (type === 'light') {
    options = {
      rainSpeed: 80.0, // 慢
      rainSize: 0.18, // 小雨
      tiltAngle: 0.5, // 倾斜
    }
  } else if (type === 'moderate') {
    options = {
      rainSpeed: 60.0, // 适中
      rainSize: 0.28, // 中雨
      tiltAngle: 0.3, // 适中
    }
  } else if (type === 'heavy') {
    options = {
      rainSpeed: 40.0, // 快
      rainSize: 0.38, // 大雨
      tiltAngle: 0.1, // 直落
    }
  } else {
    // 默认参数，防止 options 未定义
    options = {
      rainSpeed: 60.0,
      rainSize: 0.28,
      tiltAngle: 0.3,
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
