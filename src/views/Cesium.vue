<template>
  <div ref="cesiumContainer" style="width: 100vw; height: 100vh"></div>
</template>

<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount } from 'vue'

const cesiumContainer = ref<HTMLElement | null>(null)
let viewer: unknown = null

onMounted(() => {
  // @ts-expect-error: 通过 script 全局引入 Cesium
  const Cesium = window.Cesium
  const TIANDITU_KEY = '3764ab3da844e87462f2f827afa0f9f3'

  viewer = new Cesium.Viewer(cesiumContainer.value, {
    animation: false,
    timeline: false,
    baseLayerPicker: false,
    geocoder: false,
    homeButton: false,
    sceneModePicker: true,
    navigationHelpButton: false,
    infoBox: false,
    imageryProvider: false, // 不加载默认底图
  })

  // 添加天地图影像图层（经纬度投影）
  const tdtLayer = new Cesium.ImageryLayer(
    new Cesium.WebMapTileServiceImageryProvider({
      url: 'https://t{s}.tianditu.gov.cn/img_c/wmts?tk=' + TIANDITU_KEY,
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
  const v = viewer as {
    imageryLayers: { add: (layer: InstanceType<typeof Cesium.ImageryLayer>) => void }
    camera: { setView: (options: Record<string, unknown>) => void }
  }
  v.imageryLayers.add(tdtLayer)
  v.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(114.3162, 30.581, 20000.0),
    orientation: {
      heading: Cesium.Math.toRadians(0.0),
      pitch: Cesium.Math.toRadians(-90.0),
      roll: 0,
    },
  })
})

onBeforeUnmount(() => {
  if (viewer && typeof (viewer as { destroy?: () => void }).destroy === 'function') {
    ;(viewer as { destroy: () => void }).destroy()
    viewer = null
  }
})
</script>

<script lang="ts">
// 遵循 vue SFC 规范，导出多词组件名
export default { name: 'CesiumTdt' }
</script>

<style scoped></style>
