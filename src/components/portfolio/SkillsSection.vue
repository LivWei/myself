<template>
  <section id="skills" class="skills-section">
    <div class="container">
      <!-- 技能标签云 -->
      <div class="skills-cloud scroll-animate" data-animation="fadeInUp" data-delay="4s">
        <h3 class="cloud-title">技能标签</h3>
        <div class="tags-container">
          <el-tag
            v-for="tag in skillTags"
            :key="tag.name"
            :type="tag.type"
            :size="tag.size"
            class="skill-tag animate__animated animate__zoomIn"
            effect="plain"
          >
            {{ tag.name }}
          </el-tag>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Skill {
  name: string
  color: string
}

interface SkillTag {
  name: string
  type: 'primary' | 'success' | 'info' | 'warning' | 'danger'
  size: 'large' | 'default' | 'small'
}

const skillTags: SkillTag[] = [
  { name: 'Vue', type: 'primary', size: 'default' },
  { name: 'React', type: 'success', size: 'default' },
  { name: 'Express', type: 'info', size: 'default' },
  { name: 'HTML5/CSS3', type: 'warning', size: 'default' },
  { name: 'JavaScript(ES6+)', type: 'danger', size: 'default' },
  { name: '地图开发(leaflet/openlayers/cesium)', type: 'primary', size: 'default' },
  { name: 'Node.js', type: 'success', size: 'default' },
  { name: '工程化(Webpack/Vite/Rollup/Babel/ESLint)', type: 'info', size: 'default' },
  { name: '性能优化', type: 'warning', size: 'default' },
  { name: '版本控制(Git/SVN)', type: 'danger', size: 'default' },
  { name: '多端开发(PC/桌面/移动/小程序)', type: 'primary', size: 'default' },
  { name: '技术管理', type: 'success', size: 'default' },
  { name: 'AI技能(Cursor/ChatGPT/Gemeni)', type: 'info', size: 'default' },
  { name: 'turf', type: 'primary', size: 'default' },
  { name: 'proj4', type: 'success', size: 'default' },
  { name: 'wkt', type: 'info', size: 'default' },
  { name: 'echarts', type: 'warning', size: 'default' },
  { name: 'html2canvas', type: 'danger', size: 'default' },
  { name: 'jspdf', type: 'primary', size: 'default' },
  { name: 'element-ui', type: 'success', size: 'default' },
  { name: 'vant', type: 'info', size: 'default' },
  { name: 'logicflow', type: 'warning', size: 'default' },
  { name: 'dayjs', type: 'danger', size: 'default' },
  { name: 'Sass/Less', type: 'primary', size: 'default' },
  { name: 'TailwindCSS', type: 'success', size: 'default' },
  { name: 'uniapp', type: 'info', size: 'default' },
  { name: 'Electron', type: 'warning', size: 'default' },
]
</script>

<style scoped>
.skills-section {
  width: 100%;
  padding: 80px 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  margin: 0;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 1rem;
}

.section-subtitle {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
  max-width: 600px;
  margin: 0 auto;
}

.skills-cloud {
  margin-top: 60px;
  text-align: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 40px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.cloud-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 30px;
  color: #fff;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
}

.skill-tag {
  transition: all 0.3s ease;
  cursor: pointer;
}

.skill-tag:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }

  .skills-section {
    padding: 60px 0;
  }

  .tags-container {
    gap: 8px;
  }
}
</style>
