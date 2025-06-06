// Cesium 自定义Shader雨特效
// 依赖：Cesium

// rain.glsl 内容内嵌（简洁版）
const rainGLSL = `
uniform sampler2D colorTexture;
in vec2 v_textureCoordinates;
uniform float tiltAngle;
uniform float rainSize;
uniform float rainSpeed;
float hash(float x) {
    return fract(sin(x * 133.3) * 13.13);
}
out vec4 fragColor;
void main(void) {
    float time = czm_frameNumber / rainSpeed;
    vec2 resolution = czm_viewport.zw;
    vec2 uv = (gl_FragCoord.xy * 2. - resolution.xy) / min(resolution.x, resolution.y);
    vec3 c = vec3(.6, .7, .8);
    float a = tiltAngle;
    float si = sin(a), co = cos(a);
    uv *= mat2(co, -si, si, co);
    uv *= length(uv + vec2(0, 4.9)) * rainSize + 1.;
    float v = 1. - sin(hash(floor(uv.x * 100.)) * 2.);
    float b = clamp(abs(sin(20. * time * v + uv.y * (5. / (2. + v)))) - .95, 0., 1.) * 20.;
    c *= v * b;
    fragColor = mix(texture(colorTexture, v_textureCoordinates), vec4(c, 1), .5);
}
`;

/**
 * 使用自定义Shader实现雨特效（简洁版 rain.glsl 内容）
 * @param {Object} viewer Cesium.Viewer 实例
 * @param {Object} options 雨特效选项
 * @param {number} options.rainSpeed 雨速（默认60.0）
 * @param {number} options.rainSize 雨滴大小（默认0.3）
 * @param {number} options.tiltAngle 雨滴倾斜角度（默认0.3）
 * @returns {Promise<any>} 返回雨特效对象，后续可用于清除
 */
export async function addCustomRain(viewer, options = {}) {
  if (!viewer) return null;
  const {
    rainSpeed = 60.0,
    rainSize = 0.3,
    tiltAngle = 0.3,
  } = options;

  const rainStage = new Cesium.PostProcessStage({
    name: 'czm_custom_rain',
    fragmentShader: rainGLSL,
    uniforms: {
      rainSpeed,
      rainSize,
      tiltAngle,
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
