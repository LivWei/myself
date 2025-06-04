<template>
  <div ref="cesiumContainer" style="width: 100vw; height: 100vh"></div>
  <CesiumBtns />
</template>

<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount } from 'vue'
import CesiumBtns from './Cesium/Btns.vue'

const cesiumContainer = ref<HTMLElement | null>(null)
let viewer: any = null
const TIANDITU_KEY = '3764ab3da844e87462f2f827afa0f9f3'

function createTdtVecLayer() {
  // @ts-expect-error: 通过 script 全局引入 Cesium
  const Cesium = window.Cesium
  return new Cesium.ImageryLayer(
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
}

onMounted(() => {
  // @ts-expect-error: 通过 script 全局引入 Cesium
  const Cesium = window.Cesium
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
  const vecLayer = createTdtVecLayer()
  viewer?.imageryLayers.add(vecLayer)
  viewer?.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(114.3162, 30.581, 20000.0),
    orientation: {
      heading: Cesium.Math.toRadians(0.0),
      pitch: Cesium.Math.toRadians(-90.0),
      roll: 0,
    },
  })

  // 默认加载地形（mars3d 地形，异步方式）
  Cesium.CesiumTerrainProvider.fromUrl('https://data.mars3d.cn/terrain', {
    requestVertexNormals: true,
  }).then((provider: any) => {
    viewer.terrainProvider = provider
  })

  window.viewer = viewer

  // 鼠标右键旋转视角，滚轮拖动为平移
  if (viewer) {
    viewer.scene.screenSpaceCameraController.tiltEventTypes = [Cesium.CameraEventType.RIGHT_DRAG]
    viewer.scene.screenSpaceCameraController.panningMode = Cesium.CameraEventType.MIDDLE_DRAG
  }
})

onBeforeUnmount(() => {
  if (viewer && typeof viewer.destroy === 'function') {
    viewer.destroy()
    viewer = null
  }
})
</script>

<script lang="ts">
export default { name: 'CesiumTdt' }
</script>

<style>
.cesium-viewer-bottom,
.cesium-viewer-toolbar,
.cesium-viewer-fullscreenContainer {
  display: none !important;
}
</style>
