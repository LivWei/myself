// 输入的颜色纹理
uniform sampler2D colorTexture; // 场景原始颜色纹理
// 控制雨滴下落速度
uniform float speed; // 雨滴速度
// 控制雨滴密度
uniform float density; // 雨滴密度
// 控制雨滴的衰减（影响雨滴形状）
uniform float falloff; // 雨滴衰减
// 控制雨滴倾斜角度
uniform float angle; // 雨滴倾斜角度
// 控制雨滴宽度
uniform float thickness; // 雨滴宽度（新增）

// 传入的纹理坐标
in vec2 v_textureCoordinates;
// 输出的片元颜色
out vec4 fragColor;

// 生成伪随机数的函数，用于雨滴分布
float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

// 多层雨滴效果函数
// uv: 纹理坐标
// time: 当前时间
// density: 雨滴密度
// speed: 雨滴速度
// falloff: 雨滴衰减
// angle: 雨滴倾斜角度
// thickness: 雨滴宽度
float rainLayer(vec2 uv, float time, float density, float speed, float falloff, float angle, float thickness) {
    // 根据密度缩放uv
    vec2 rainUv = uv * vec2(1.0, 1.0) * density;
    // 角度转弧度
    float radAngle = radians(angle);
    // 构建旋转矩阵，实现雨滴倾斜
    mat2 rotationMatrix = mat2(cos(radAngle), -sin(radAngle), sin(radAngle), cos(radAngle));
    rainUv = rotationMatrix * rainUv;
    // y方向随时间移动，实现下落
    rainUv.y += time * speed;
    // 生成随机值，打散雨滴分布
    float randomValue = rand(floor(rainUv * 10.0) / 10.0);
    // 计算雨滴主形状
    float rain = pow(fract(rainUv.y * randomValue), falloff);
    // 计算x方向的分布
    float xfract = fract(rainUv.x * randomValue);
    // 柔和雨滴边缘
    rain *= smoothstep(thickness, 0.0, xfract); // 柔和边缘
    return rain * randomValue;
}

void main(void)
{
    // 获取当前像素的纹理坐标
    vec2 uv = v_textureCoordinates;
    // 采样原始场景颜色
    vec3 finalColor = texture(colorTexture, uv).rgb;
    // 获取当前帧数，转为时间
    float time = czm_frameNumber / 60.0;

    float thickness1 = thickness; // 主层
    float thickness2 = thickness * 1.2; // 第二层更粗
    float thickness3 = thickness * 1.4; // 第三层最粗
    float thickness4 = thickness * 1.7; // 新增第四层

    float rain1 = rainLayer(uv, time, density, speed, falloff, angle, thickness1);
    float rain2 = rainLayer(uv, time + 10.0, density * 0.8, speed * 0.8, falloff * 0.9, angle + 5.0, thickness2);
    float rain3 = rainLayer(uv, time + 20.0, density * 0.6, speed * 0.6, falloff * 0.8, angle - 5.0, thickness3);
    float rain4 = rainLayer(uv, time + 30.0, density * 0.4, speed * 0.5, falloff * 0.7, angle + 10.0, thickness4);

    float rain = rain1 + rain2 * 0.8 + rain3 * 0.6 + rain4 * 0.4;

    // 体积感：底部更密集更亮
    float heightFade = smoothstep(0.0, 0.7, uv.y); // y越小越亮
    rain *= (1.0 - heightFade * 0.5);

    // 雾气效果：底部更浓
    float fog = smoothstep(0.7, 1.0, uv.y) * 0.3;

    // 闪电效果：周期性全屏变亮
    float lightning = step(0.98, fract(time * 0.05 + sin(time * 0.2))) * 0.7;

    // 雨滴颜色（带闪电影响）
    vec3 rainColor = vec3(0.85, 0.85, 0.95) + lightning;
    // 混合雨滴颜色和原始颜色
    finalColor = mix(finalColor, rainColor, clamp(rain, 0.0, 0.5));
    // 混合雾气
    finalColor = mix(finalColor, vec3(0.8, 0.8, 0.85), fog);
    // 叠加闪电
    finalColor += lightning;

    // 输出最终颜色
    fragColor = vec4(finalColor, 1.0);
}