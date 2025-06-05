export default class CesiumDynamicDrawer {
  constructor(viewer) {
    this.viewer = viewer;
    this.positions = [];
    this.entity = null;
    this.borderEntity = null;
    this.handler = null;
    this.tooltipDiv = null;
    this.drawType = null; // 'point' | 'polyline' | 'polygon'
    this.clampToGround = false;
  }

  /**
   * @param {'point'|'polyline'|'polygon'} type
   * @param {Object} options
   * @param {boolean} options.clampToGround 是否贴地
   */
  startDrawing(type = 'polyline', options = {}) {
    this.clear();
    this.drawType = type;
    this.clampToGround = options.clampToGround !== undefined ? options.clampToGround : true;
    this.positions = [];
    this._createTooltip();
    this._bindEvents();
  }

  _bindEvents() {
    if (this.handler) {
      this.handler.destroy();
    }
    this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);

    // 鼠标移动，显示提示和动态图形
    this.handler.setInputAction((movement) => {
      const cartesian = this._getCatesian3FromScreen(movement.endPosition);
      if (!cartesian) return;
      this._updateTooltip(movement.endPosition, this._getTipText());
      if (this.positions.length > 0 && this.drawType !== 'point') {
        if (this.positions.length === 1) {
          this.positions.push(cartesian);
        } else {
          this.positions[this.positions.length - 1] = cartesian;
        }
        this._drawEntity();
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    // 左键点击，添加点
    this.handler.setInputAction((movement) => {
      const cartesian = this._getCatesian3FromScreen(movement.position);
      if (!cartesian) return;
      if (this.drawType === 'point') {
        this.positions = [cartesian];
        this._drawEntity();
        this._endDrawing();
      } else if (this.positions.length === 0) {
        this.positions.push(cartesian.clone());
        this.positions.push(cartesian);
      } else {
        this.positions.splice(this.positions.length - 1, 0, cartesian);
      }
      this._drawEntity();
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    // 双击左键，结束绘制
    this.handler.setInputAction(() => {
      if (this.drawType === 'polyline' && this.positions.length > 1) {
        this.positions.pop();
        this._drawEntity();
      }
      if (this.drawType === 'polygon' && this.positions.length > 2) {
        this.positions.pop();
        this._drawEntity();
      }
      this._endDrawing();
    }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
  }

  _drawEntity() {
    if (!this.entity) {
      if (this.drawType === 'point' && this.positions.length === 1) {
        this.entity = this.viewer.entities.add({
          position: new Cesium.CallbackProperty(() => this.positions[0], false),
          point: {
            pixelSize: 10,
            color: Cesium.Color.YELLOW,
            outlineColor: Cesium.Color.BLACK,
            outlineWidth: 2,
            heightReference: this.clampToGround
              ? Cesium.HeightReference.CLAMP_TO_GROUND
              : Cesium.HeightReference.NONE,
          },
        });
      } else if (this.drawType === 'polyline' && this.positions.length >= 2) {
        this.entity = this.viewer.entities.add({
          polyline: {
            positions: new Cesium.CallbackProperty(() => this.positions.slice(), false),
            width: 3,
            material: Cesium.Color.RED,
            clampToGround: this.clampToGround,
          },
        });
      } else if (this.drawType === 'polygon' && this.positions.length >= 3) {
        this.entity = this.viewer.entities.add({
          polygon: {
            hierarchy: new Cesium.CallbackProperty(() => new Cesium.PolygonHierarchy(this.positions.slice()), false),
            material: Cesium.Color.BLUE.withAlpha(0.5),
            outline: false,
            heightReference: this.clampToGround
              ? Cesium.HeightReference.CLAMP_TO_GROUND
              : Cesium.HeightReference.NONE,
          },
        });
        this.borderEntity = this.viewer.entities.add({
          polyline: {
            positions: new Cesium.CallbackProperty(() => {
              if (this.positions.length < 2) return [];
              const arr = this.positions.slice();
              if (arr.length > 2 && !arr[0].equals(arr[arr.length - 1])) {
                arr.push(arr[0]);
              }
              return arr;
            }, false),
            width: 3,
            material: Cesium.Color.RED,
            clampToGround: this.clampToGround,
          },
        });
      }
    }
    if (this.drawType === 'point' && this.entity && this.positions.length === 1) {
      this.entity.position = new Cesium.CallbackProperty(() => this.positions[0], false);
    }
    if (this.drawType === 'polygon' && this.borderEntity) {
      this.borderEntity.polyline.positions = new Cesium.CallbackProperty(() => {
        if (this.positions.length < 2) return [];
        const arr = this.positions.slice();
        if (arr.length > 2 && !arr[0].equals(arr[arr.length - 1])) {
          arr.push(arr[0]);
        }
        return arr;
      }, false);
    }
  }

  _getCatesian3FromScreen(position) {
    const ray = this.viewer.camera.getPickRay(position);
    if (!ray) return null;
    return this.viewer.scene.globe.pick(ray, this.viewer.scene);
  }

  _createTooltip() {
    if (this.tooltipDiv) return;
    this.tooltipDiv = document.createElement('div');
    this.tooltipDiv.className = 'cesium-drawer-tooltip';
    this.tooltipDiv.style.position = 'fixed';
    this.tooltipDiv.style.pointerEvents = 'none';
    this.tooltipDiv.style.background = 'rgba(42, 42, 42, 0.8)';
    this.tooltipDiv.style.color = '#fff';
    this.tooltipDiv.style.padding = '4px 10px';
    this.tooltipDiv.style.borderRadius = '4px';
    this.tooltipDiv.style.fontSize = '14px';
    this.tooltipDiv.style.zIndex = 9999;
    document.body.appendChild(this.tooltipDiv);
  }

  _updateTooltip(screenPosition, message) {
    this.tooltipDiv = document.querySelector('.cesium-drawer-tooltip');
    if (!this.tooltipDiv) return;
    this.tooltipDiv.style.left = `${screenPosition.x + 15}px`;
    this.tooltipDiv.style.top = `${screenPosition.y + 10}px`;
    this.tooltipDiv.innerHTML = message;
  }

  _destroyTooltip() {
    document.querySelectorAll('.cesium-drawer-tooltip').forEach(div => {
      div.remove();
    });
    this.tooltipDiv = null;
  }

  _getTipText() {
    if (this.drawType === 'point') {
      return '左键点击添加点';
    } else if (this.drawType === 'polyline') {
      return '左键点击添加线节点，双击结束绘制';
    } else if (this.drawType === 'polygon') {
      return '左键点击添加面节点，双击结束绘制';
    }
    return '';
  }

  _endDrawing() {
    this._destroyTooltip();
    if (this.handler) {
      this.handler.destroy();
      this.handler = null;
    }
    if (this.borderEntity) {
      this.viewer.entities.remove(this.borderEntity);
      this.borderEntity = null;
    }
  }

  clear() {
    if (this.entity) {
      this.viewer.entities.remove(this.entity);
      this.entity = null;
    }
    if (this.borderEntity) {
      this.viewer.entities.remove(this.borderEntity);
      this.borderEntity = null;
    }
    this._endDrawing();
    this.positions = [];
    this.drawType = null;
    this.clampToGround = false;
    this.tooltipDiv = null;
  }
}

// ================= 使用示例 =================
// import CesiumDynamicDrawer from './utils';
// const drawer = new CesiumDynamicDrawer(viewer);
//
// // 绘制点
// drawer.startDrawing('point');
//
// // 绘制贴地点
// drawer.startDrawing('point', { clampToGround: true });
//
// // 绘制线
// drawer.startDrawing('polyline');
//
// // 绘制贴地线
// drawer.startDrawing('polyline', { clampToGround: true });
//
// // 绘制面
// drawer.startDrawing('polygon');
//
// // 绘制贴地面
// drawer.startDrawing('polygon', { clampToGround: true });
//
// // 清除
// drawer.clear();

// ================= 自定义Shader雨特效 =================

/**
 * 使用自定义Shader实现雨特效（异步加载 public 下的 rain.glsl）
 * @param {Object} viewer Cesium.Viewer 实例
 * @param {Object} options 雨特效选项
 * @param {number} options.rainSpeed 雨速（默认1.0）
 * @param {number} options.rainSize 雨滴大小（默认1.0）
 * @returns {Promise<any>} 返回雨特效对象，后续可用于清除
 */
export async function addCustomRain(viewer, options = {}) {
  if (!viewer) return null;
  const {
    speed = 40.0,      // 大雨更快
    density = 12.0,    // 大雨更密
    falloff = 35.0,
    angle = 15.0,
    thickness = 0.02,  // 新增参数，默认大雨更粗
  } = options;

  // 动态加载 public 下的 rain.glsl
  const res = await fetch('/Shader/rain.glsl');
  const shader = (await res.text()).trimStart();

  const rainStage = new Cesium.PostProcessStage({
    name: 'czm_custom_rain',
    fragmentShader: shader,
    uniforms: {
      speed,
      density,
      falloff,
      angle,
      thickness, // 新增
    }
  });
  viewer.scene.postProcessStages.add(rainStage);
  return rainStage;
}


/**
 * 清除自定义雨特效
 * @param {Object} viewer Cesium.Viewer 实例
 * @param {any} stage 雨特效对象
 */
export function removeCustomRain(viewer, stage) {
  if (viewer && stage) {
    viewer.scene.postProcessStages.remove(stage);
  }
}

// ================= 自定义Shader雨特效使用示例 =================
// import { addCustomRain, removeCustomRain } from './utils';
//
// let rainStage = addCustomRain(viewer, { rainSpeed: 1.5, rainSize: 1.2 });
// removeCustomRain(viewer, rainStage);
