<template>
  <div class="bottom-btns">
    <div class="btn-item" v-for="item in layers" :key="item" @click="handleClick(item)">
      {{ item }}
    </div>
  </div>
  <CesiumDraw v-if="showDraw" />
</template>

<script lang="ts">
export default { name: 'CesiumBtns' }
</script>

<script setup lang="ts">
import { ref } from 'vue'
import CesiumDraw from './Draw.vue'

const showDraw = ref(false)
const layers = ['矢量', '影像', '绘制']
const TIANDITU_KEY = '3764ab3da844e87462f2f827afa0f9f3'
// @ts-expect-error: 通过 script 全局引入 Cesium
const Cesium = window.Cesium

const handleClick = (item: string) => {
  console.log(item)
  currentLayer(item)
}

const currentLayer = (value: string) => {
  if (value === '矢量') {
    window.viewer.imageryLayers.removeAll()
    const vecLayer = new Cesium.ImageryLayer(
      new Cesium.WebMapTileServiceImageryProvider({
        url: `https://t{s}.tianditu.gov.cn/vec_c/wmts?tk=${TIANDITU_KEY}`,
        layer: 'vec',
        style: 'default',
        format: 'tiles',
        tileMatrixSetID: 'c',
        subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
        tilingScheme: new Cesium.GeographicTilingScheme(),
        tileMatrixLabels: Array.from({ length: 18 }, (_, i) => (i + 1).toString()),
        maximumLevel: 17,
      }),
    )
    window.viewer.imageryLayers.add(vecLayer)
  } else if (value === '影像') {
    window.viewer.imageryLayers.removeAll()
    const imgLayer = new Cesium.ImageryLayer(
      new Cesium.WebMapTileServiceImageryProvider({
        url: `https://t{s}.tianditu.gov.cn/img_c/wmts?tk=${TIANDITU_KEY}`,
        layer: 'img',
        style: 'default',
        format: 'tiles',
        tileMatrixSetID: 'c',
        subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
        tilingScheme: new Cesium.GeographicTilingScheme(),
        tileMatrixLabels: Array.from({ length: 18 }, (_, i) => (i + 1).toString()),
        maximumLevel: 17,
      }),
    )
    window.viewer.imageryLayers.add(imgLayer)
  } else if (value === '绘制') {
    showDraw.value = true
  }
}
</script>

<style scoped>
.bottom-btns {
  position: fixed;
  bottom: 16px;
  height: 50px;
  width: calc(100% - 32px);
  left: 16px;
  right: 16px;
  display: flex;
  align-items: center;
  z-index: 10;
  background-color: #fff;
  border-radius: 8px;
  padding: 8px;
  box-sizing: border-box;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}

.btn-item {
  margin-right: 10px;
  padding: 8px 12px;
  border-radius: 4px;
  background-color: #f0f0f0;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-item:hover {
  background-color: #e0e0e0;
}
</style>
