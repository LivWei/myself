// Cesium 动态绘制工具类（仅保留点、线、面绘制功能，移除测量相关代码）
// 依赖：Cesium

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
    this._polygonEdgeLabels = [];
  }

  /**
   * @param {'point'|'polyline'|'polygon'} type
   * @param {Object} options
   * @param {boolean} options.clampToGround 是否贴地
   */
  startDrawing(type = 'polyline', options = {}) {
    this.clear();
    this.drawType = type;
    if (options.clampToGround !== undefined) {
      this.clampToGround = options.clampToGround;
    } else {
      this.clampToGround = true;
    }
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
      let tip = this._getTipText();
      this._updateTooltip(movement.endPosition, tip);
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
    // 清除旧的边长label
    if (this._polygonEdgeLabels) {
      this._polygonEdgeLabels.forEach(label => this.viewer.entities.remove(label));
    }
    this._polygonEdgeLabels = [];
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
      } else if ((this.drawType === 'polyline') && this.positions.length >= 2) {
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
    // polygon边长和总长label
    if (this.drawType === 'polygon' && this.positions.length >= 2) {
      let total = 0;
      for (let i = 0; i < this.positions.length; i++) {
        const p1 = this.positions[i];
        const p2 = this.positions[(i + 1) % this.positions.length];
        if (i === this.positions.length - 1 && this.positions.length < 3) break;
        // 计算边长
        const len = this._getSpaceDistance(p1, p2);
        total += len;
        // 计算中点
        const mid = new Cesium.Cartesian3(
          (p1.x + p2.x) / 2,
          (p1.y + p2.y) / 2,
          (p1.z + p2.z) / 2
        );
        let text = len >= 1000 ? `${(len / 1000).toFixed(2)} 公里` : `${len.toFixed(2)} 米`;
        const labelEntity = this.viewer.entities.add({
          position: mid,
          name: '__polygon_edge_label__',
          label: {
            text,
            font: '16px sans-serif',
            fillColor: Cesium.Color.YELLOW,
            outlineColor: Cesium.Color.BLACK,
            outlineWidth: 2,
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            pixelOffset: new Cesium.Cartesian2(0, -20),
            heightReference: this.clampToGround ? Cesium.HeightReference.CLAMP_TO_GROUND : Cesium.HeightReference.NONE,
            disableDepthTestDistance: Number.POSITIVE_INFINITY
          }
        });
        this._polygonEdgeLabels.push(labelEntity);
      }
      // 总周长label，显示在最后一个点
      if (this.positions.length >= 3) {
        let totalText = total >= 1000 ? `总长：${(total / 1000).toFixed(2)} 公里` : `总长：${total.toFixed(2)} 米`;
        const last = this.positions[this.positions.length - 1];
        const totalLabel = this.viewer.entities.add({
          position: last,
          name: '__polygon_edge_label__',
          label: {
            text: totalText,
            font: '18px sans-serif',
            fillColor: Cesium.Color.LIME,
            outlineColor: Cesium.Color.BLACK,
            outlineWidth: 2,
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            pixelOffset: new Cesium.Cartesian2(0, -30),
            heightReference: this.clampToGround ? Cesium.HeightReference.CLAMP_TO_GROUND : Cesium.HeightReference.NONE,
            disableDepthTestDistance: Number.POSITIVE_INFINITY
          }
        });
        this._polygonEdgeLabels.push(totalLabel);
      }
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
    // 彻底清除所有label
    const allEntities = this.viewer.entities.values;
    for (let i = allEntities.length - 1; i >= 0; i--) {
      const entity = allEntities[i];
      if (entity && (entity.name === '__polygon_edge_label__')) {
        this.viewer.entities.remove(entity);
      }
    }
    this._polygonEdgeLabels = [];
    if (this.entity) {
      this.viewer.entities.remove(this.entity);
      this.entity = null;
    }
    if (this.borderEntity) {
      this.viewer.entities.remove(this.borderEntity);
      this.borderEntity = null;
    }
    this._destroyTooltip();
    if (this.handler) {
      this.handler.destroy();
      this.handler = null;
    }
    this.positions = [];
    this.drawType = null;
    this.clampToGround = false;
    this.tooltipDiv = null;
  }

  // 空间距离测量辅助方法（仅用于polygon边长）
  _getSpaceDistance(p1, p2) {
    if (!p1 || !p2) return 0;
    return Cesium.Cartesian3.distance(p1, p2);
  }
}
