// Cesium 测量工具类
// 依赖：Cesium

export default class CesiumDistanceMeasurer {
  constructor(viewer) {
    this.viewer = viewer;
    this.positions = [];
    this.entity = null;
    this.handler = null;
    this.tooltipDiv = null;
    this.drawType = null; // 'clampDistance' | 'ctrlDistance' | 'clampArea' | 'ctrlArea' | 'triangle'
    this.clampToGround = false;
    this._distanceLabels = [];
  }

  /**
   * @param {'clampDistance'|'ctrlDistance'|'clampArea'|'ctrlArea'|'triangle'} type
   * @param {Object} options
   * @param {boolean} options.clampToGround 是否贴地
   */
  startDrawing(type = 'clampDistance', options = {}) {
    this.clear();
    this.drawType = type;
    if (options.clampToGround !== undefined) {
      this.clampToGround = options.clampToGround;
    } else if (type === 'clampDistance' || type === 'clampArea') {
      this.clampToGround = true;
    } else if (type === 'ctrlDistance' || type === 'ctrlArea') {
      this.clampToGround = false;
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
      if (this.positions.length > 0) {
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
      if (this.positions.length === 0) {
        this.positions.push(cartesian.clone());
        this.positions.push(cartesian);
      } else {
        this.positions.splice(this.positions.length - 1, 0, cartesian);
      }
      this._drawEntity();
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    // 双击左键，结束绘制
    this.handler.setInputAction(() => {
      if ((this.drawType === 'clampDistance' || this.drawType === 'ctrlDistance') && this.positions.length > 1) {
        this.positions.pop();
        this._drawEntity();
      }
      if ((this.drawType === 'clampArea' || this.drawType === 'ctrlArea') && this.positions.length > 2) {
        this.positions.pop();
        this._drawEntity();
      }
      this._endDrawing();
    }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

    // 三角测量
    if (this.drawType === 'triangle') {
      let trianglePositions = [];
      let triangleEntity = null;
      let vLabel = null, hLabel = null, sLabel = null;
      this.handler.setInputAction((movement) => {
        const cartesian = this._getCatesian3FromScreen(movement.position);
        if (!cartesian) return;
        if (trianglePositions.length === 0) {
          trianglePositions.push(cartesian.clone());
          trianglePositions.push(cartesian.clone());
        } else if (trianglePositions.length === 2) {
          trianglePositions[1] = cartesian.clone();
        }
        this._drawTriangleEntity(trianglePositions, triangleEntity, vLabel, hLabel, sLabel, (e, v, h, s) => {
          triangleEntity = e; vLabel = v; hLabel = h; sLabel = s;
        });
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
      this.handler.setInputAction((movement) => {
        const cartesian = this._getCatesian3FromScreen(movement.endPosition);
        if (!cartesian) return;
        if (trianglePositions.length === 2) {
          trianglePositions[1] = cartesian;
        }
        this._drawTriangleEntity(trianglePositions, triangleEntity, vLabel, hLabel, sLabel, (e, v, h, s) => {
          triangleEntity = e; vLabel = v; hLabel = h; sLabel = s;
        });
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
      this.handler.setInputAction(() => {
        this._endDrawing();
      }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
      return;
    }
  }

  _drawEntity() {
    // 清除旧的label
    if (this._distanceLabels) {
      this._distanceLabels.forEach(label => this.viewer.entities.remove(label));
    }
    this._distanceLabels = [];
    if (this.entity) {
      this.viewer.entities.remove(this.entity);
      this.entity = null;
    }
    if (this.drawType === 'clampDistance' || this.drawType === 'ctrlDistance') {
      if (this.positions.length >= 2) {
        this.entity = this.viewer.entities.add({
          polyline: {
            positions: new Cesium.CallbackProperty(() => this.positions.slice(), false),
            width: 3,
            material: Cesium.Color.LIME,
            clampToGround: this.clampToGround,
          },
        });
        // 每段线段中点显示距离（不包括最后一段到终点）
        for (let i = 1; i < this.positions.length - 1; i++) {
          const p1 = this.positions[i - 1];
          const p2 = this.positions[i];
          const mid = new Cesium.Cartesian3(
            (p1.x + p2.x) / 2,
            (p1.y + p2.y) / 2,
            (p1.z + p2.z) / 2
          );
          const segLen = this.drawType === 'clampDistance' ? this._getClampDistance(p1, p2) : this._getSpaceDistance(p1, p2);
          let text = segLen >= 1000 ? `${(segLen / 1000).toFixed(2)} 公里` : `${segLen.toFixed(2)} 米`;
          const labelEntity = this.viewer.entities.add({
            position: mid,
            name: '__clamp_distance_label__',
            label: {
              text,
              font: '16px sans-serif',
              fillColor: Cesium.Color.BLACK,
              outlineColor: Cesium.Color.WHITE,
              outlineWidth: 2,
              style: Cesium.LabelStyle.FILL_AND_OUTLINE,
              pixelOffset: new Cesium.Cartesian2(0, -20),
              heightReference: this.clampToGround ? Cesium.HeightReference.CLAMP_TO_GROUND : Cesium.HeightReference.NONE,
              disableDepthTestDistance: Number.POSITIVE_INFINITY
            }
          });
          this._distanceLabels.push(labelEntity);
        }
        // 终点显示总距离
        const total = this._getDistanceTip(this.positions);
        const last = this.positions[this.positions.length - 1];
        const totalLabel = this.viewer.entities.add({
          position: last,
          name: '__clamp_distance_label__',
          label: {
            text: total.replace('距离：', ''),
            font: '18px sans-serif',
            fillColor: Cesium.Color.YELLOW,
            outlineColor: Cesium.Color.WHITE,
            outlineWidth: 2,
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            pixelOffset: new Cesium.Cartesian2(0, -30),
            heightReference: this.clampToGround ? Cesium.HeightReference.CLAMP_TO_GROUND : Cesium.HeightReference.NONE,
            disableDepthTestDistance: Number.POSITIVE_INFINITY,
            backgroundColor: Cesium.Color.BLACK.withAlpha(0.8),
            showBackground: true
          }
        });
        this._distanceLabels.push(totalLabel);
      }
    } else if (this.drawType === 'clampArea' || this.drawType === 'ctrlArea') {
      if (this.positions.length >= 3) {
        let polygonPositions = this.positions;
        let polygonOptions = {
          hierarchy: new Cesium.CallbackProperty(() => new Cesium.PolygonHierarchy(polygonPositions.slice()), false),
          material: Cesium.Color.BLUE.withAlpha(0.5),
          outline: false,
        };
        if (this.drawType === 'ctrlArea') {
          // 水平面积：每个点的z有效，polygon悬空
          polygonOptions.perPositionHeight = true;
          // 可选extrudedHeight，拉成立体体
          // polygonOptions.extrudedHeight = 1000;
        } else {
          // 贴地面积：z无效，polygon自动贴地
          // 不加perPositionHeight
        }
        this.entity = this.viewer.entities.add({
          polygon: polygonOptions,
        });
        // 计算面积
        let area = 0;
        if (this.drawType === 'clampArea') {
          area = this._getClampArea(this.positions);
        } else {
          area = this._getSpaceArea(this.positions);
        }
        let text = area >= 1000000 ? `${(area / 1000000).toFixed(2)} 平方公里` : `${area.toFixed(2)} 平方米`;
        // 取最后一个点显示面积
        const last = polygonPositions[polygonPositions.length - 1];
        const areaLabel = this.viewer.entities.add({
          position: last,
          name: '__clamp_distance_label__',
          label: {
            text,
            font: '18px sans-serif',
            fillColor: Cesium.Color.YELLOW,
            outlineColor: Cesium.Color.WHITE,
            outlineWidth: 2,
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            pixelOffset: new Cesium.Cartesian2(0, -30),
            heightReference: Cesium.HeightReference.NONE,
            disableDepthTestDistance: Number.POSITIVE_INFINITY,
            backgroundColor: Cesium.Color.BLACK.withAlpha(0.8),
            showBackground: true
          }
        });
        this._distanceLabels.push(areaLabel);
      }
    }
  }

  _getCatesian3FromScreen(position) {
    if (this.drawType === 'ctrlArea') {
      // 水平面积用 pickPosition 获取悬空点，失败时 fallback 到 globe.pick
      let cartesian = this.viewer.scene.pickPosition(position);
      if (!cartesian) {
        const ray = this.viewer.camera.getPickRay(position);
        if (!ray) return null;
        cartesian = this.viewer.scene.globe.pick(ray, this.viewer.scene);
      }
      return cartesian;
    } else {
      // 其它模式用 globe.pick 获取地表点
      const ray = this.viewer.camera.getPickRay(position);
      if (!ray) return null;
      return this.viewer.scene.globe.pick(ray, this.viewer.scene);
    }
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
    if (this.drawType === 'clampDistance') {
      return '左键点击添加测量点，双击结束测量（贴地）';
    } else if (this.drawType === 'ctrlDistance') {
      return '左键点击添加测量点，双击结束测量（空间）';
    } else if (this.drawType === 'clampArea') {
      return '左键点击添加多边形节点，双击结束测量（贴地面积）';
    } else if (this.drawType === 'ctrlArea') {
      return '左键点击添加多边形节点，双击结束测量（水平面积）';
    }
    return '';
  }

  _endDrawing() {
    this._destroyTooltip();
    if (this.handler) {
      this.handler.destroy();
      this.handler = null;
    }
  }

  clear() {
    // 彻底清除所有测量label
    const allEntities = this.viewer.entities.values;
    for (let i = allEntities.length - 1; i >= 0; i--) {
      const entity = allEntities[i];
      if (entity && (entity.name === '__clamp_distance_label__')) {
        this.viewer.entities.remove(entity);
      }
    }
    this._distanceLabels = [];
    if (this.entity) {
      this.viewer.entities.remove(this.entity);
      this.entity = null;
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

  // 贴地距离测量辅助方法
  _getDistanceTip(positions) {
    if (!positions || positions.length < 2) return '';
    let total = 0;
    for (let i = 1; i < positions.length; i++) {
      total += this._getClampDistance(positions[i - 1], positions[i]);
    }
    if (total >= 1000) {
      return `距离：${(total / 1000).toFixed(2)} 公里`;
    }
    return `距离：${total.toFixed(2)} 米`;
  }

  _getClampDistance(p1, p2) {
    if (!p1 || !p2) return 0;
    const ellipsoid = Cesium.Ellipsoid.WGS84;
    const c1 = ellipsoid.cartesianToCartographic(p1);
    const c2 = ellipsoid.cartesianToCartographic(p2);
    if (!c1 || !c2) return 0;
    const geodesic = new Cesium.EllipsoidGeodesic(c1, c2);
    return geodesic.surfaceDistance;
  }

  // 空间距离测量辅助方法
  _getSpaceDistance(p1, p2) {
    if (!p1 || !p2) return 0;
    return Cesium.Cartesian3.distance(p1, p2);
  }

  // 贴地面积测量
  _getClampArea(positions) {
    if (!positions || positions.length < 3) return 0;
    const ellipsoid = Cesium.Ellipsoid.WGS84;
    const radiansPerDegree = Math.PI / 180.0;
    const degreesPerRadian = 180.0 / Math.PI;
    let area = 0;
    // 转为经纬度
    const coords = positions.map(p => {
      const carto = ellipsoid.cartesianToCartographic(p);
      return [carto.longitude * degreesPerRadian, carto.latitude * degreesPerRadian];
    });
    // 球面多边形面积公式
    for (let i = 0; i < coords.length; i++) {
      const [lon1, lat1] = coords[i];
      const [lon2, lat2] = coords[(i + 1) % coords.length];
      area += (lon2 - lon1) * (2 + Math.sin(lat1 * radiansPerDegree) + Math.sin(lat2 * radiansPerDegree));
    }
    area = area * 6378137.0 * 6378137.0 / 2.0;
    return Math.abs(area);
  }

  // 水平面积测量
  _getSpaceArea(positions) {
    if (!positions || positions.length < 3) return 0;
    // 投影到平面后用 shoelace 公式
    const points2d = positions.map(p => [p.x, p.y]);
    let area = 0;
    for (let i = 0; i < points2d.length; i++) {
      const [x1, y1] = points2d[i];
      const [x2, y2] = points2d[(i + 1) % points2d.length];
      area += x1 * y2 - x2 * y1;
    }
    return Math.abs(area / 2.0);
  }

  _drawTriangleEntity(trianglePositions, triangleEntity, vLabel, hLabel, sLabel, setEntities) {
    // 清除旧实体
    if (triangleEntity) this.viewer.entities.remove(triangleEntity);
    if (vLabel) this.viewer.entities.remove(vLabel);
    if (hLabel) this.viewer.entities.remove(hLabel);
    if (sLabel) this.viewer.entities.remove(sLabel);
    if (!trianglePositions || trianglePositions.length < 2) return;
    const p1 = trianglePositions[0];
    const p2 = trianglePositions[1];
    if (!p1 || !p2) return;
    // 计算三角形三个点
    const carto1 = Cesium.Ellipsoid.WGS84.cartesianToCartographic(p1);
    const carto2 = Cesium.Ellipsoid.WGS84.cartesianToCartographic(p2);
    const height1 = carto1.height;
    const height2 = carto2.height;
    let bottom, top, zPoint;
    if (height1 > height2) {
      bottom = p2;
      top = p1;
      zPoint = Cesium.Cartesian3.fromRadians(carto2.longitude, carto2.latitude, height1);
    } else {
      bottom = p1;
      top = p2;
      zPoint = Cesium.Cartesian3.fromRadians(carto1.longitude, carto1.latitude, height2);
    }
    // 三角形路径
    const trianglePath = [bottom, zPoint, top, bottom];
    triangleEntity = this.viewer.entities.add({
      polyline: {
        positions: trianglePath,
        width: 3,
        material: Cesium.Color.ORANGE,
        clampToGround: false,
      },
    });
    // 计算距离
    const vDistance = Math.abs(height2 - height1);
    const sDistance = Cesium.Cartesian3.distance(p1, p2);
    const hDistance = Cesium.Cartesian3.distance(zPoint, top);
    // label 位置
    const midV = Cesium.Cartesian3.midpoint(bottom, zPoint, new Cesium.Cartesian3());
    const midH = Cesium.Cartesian3.midpoint(zPoint, top, new Cesium.Cartesian3());
    const midS = Cesium.Cartesian3.midpoint(p1, p2, new Cesium.Cartesian3());
    // label 文本
    const vText = `垂直距离：${vDistance.toFixed(2)} 米`;
    const hText = `水平距离：${hDistance.toFixed(2)} 米`;
    const sText = `空间距离：${sDistance.toFixed(2)} 米`;
    vLabel = this.viewer.entities.add({
      position: midV,
      label: {
        text: vText,
        font: '16px sans-serif',
        fillColor: Cesium.Color.YELLOW,
        outlineColor: Cesium.Color.BLACK,
        outlineWidth: 2,
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        pixelOffset: new Cesium.Cartesian2(0, -20),
        heightReference: Cesium.HeightReference.NONE,
        disableDepthTestDistance: Number.POSITIVE_INFINITY,
        backgroundColor: Cesium.Color.BLACK.withAlpha(0.8),
        showBackground: true
      }
    });
    hLabel = this.viewer.entities.add({
      position: midH,
      label: {
        text: hText,
        font: '16px sans-serif',
        fillColor: Cesium.Color.YELLOW,
        outlineColor: Cesium.Color.BLACK,
        outlineWidth: 2,
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        pixelOffset: new Cesium.Cartesian2(0, -20),
        heightReference: Cesium.HeightReference.NONE,
        disableDepthTestDistance: Number.POSITIVE_INFINITY,
        backgroundColor: Cesium.Color.BLACK.withAlpha(0.8),
        showBackground: true
      }
    });
    sLabel = this.viewer.entities.add({
      position: midS,
      label: {
        text: sText,
        font: '16px sans-serif',
        fillColor: Cesium.Color.YELLOW,
        outlineColor: Cesium.Color.BLACK,
        outlineWidth: 2,
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        pixelOffset: new Cesium.Cartesian2(0, -20),
        heightReference: Cesium.HeightReference.NONE,
        disableDepthTestDistance: Number.POSITIVE_INFINITY,
        backgroundColor: Cesium.Color.BLACK.withAlpha(0.8),
        showBackground: true
      }
    });
    setEntities(triangleEntity, vLabel, hLabel, sLabel);
  }
}
