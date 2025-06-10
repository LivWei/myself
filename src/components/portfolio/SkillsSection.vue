<template>
  <section id="skills" class="skills-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title scroll-animate" data-animation="fadeInUp">技能栈</h2>
        <p class="section-subtitle scroll-animate" data-animation="fadeInUp" data-delay="1s">
          10年来积累的技术能力与专业技能
        </p>
      </div>

      <el-row :gutter="40">
        <el-col :xs="24" :lg="12">
          <div
            class="skills-category scroll-animate hover-lift"
            data-animation="fadeInLeft"
            data-delay="2s"
          >
            <h3 class="category-title">
              <el-icon><Monitor /></el-icon>
              前端技术
            </h3>
            <div class="skills-list">
              <div v-for="skill in frontendSkills" :key="skill.name" class="skill-item">
                <div class="skill-header">
                  <span class="skill-name">{{ skill.name }}</span>
                  <span class="skill-percentage">{{ skill.level }}%</span>
                </div>
                <el-progress
                  :percentage="skill.level"
                  :color="skill.color"
                  :stroke-width="8"
                  class="skill-progress"
                />
              </div>
            </div>
          </div>
        </el-col>

        <el-col :xs="24" :lg="12">
          <div
            class="skills-category scroll-animate hover-lift"
            data-animation="fadeInRight"
            data-delay="2s"
          >
            <h3 class="category-title">
              <el-icon><Server /></el-icon>
              后端技术
            </h3>
            <div class="skills-list">
              <div v-for="skill in backendSkills" :key="skill.name" class="skill-item">
                <div class="skill-header">
                  <span class="skill-name">{{ skill.name }}</span>
                  <span class="skill-percentage">{{ skill.level }}%</span>
                </div>
                <el-progress
                  :percentage="skill.level"
                  :color="skill.color"
                  :stroke-width="8"
                  class="skill-progress"
                />
              </div>
            </div>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="40" style="margin-top: 40px">
        <el-col :xs="24" :lg="12">
          <div
            class="skills-category scroll-animate hover-lift"
            data-animation="fadeInLeft"
            data-delay="3s"
          >
            <h3 class="category-title">
              <el-icon><Coin /></el-icon>
              数据库
            </h3>
            <div class="skills-list">
              <div v-for="skill in databaseSkills" :key="skill.name" class="skill-item">
                <div class="skill-header">
                  <span class="skill-name">{{ skill.name }}</span>
                  <span class="skill-percentage">{{ skill.level }}%</span>
                </div>
                <el-progress
                  :percentage="skill.level"
                  :color="skill.color"
                  :stroke-width="8"
                  class="skill-progress"
                />
              </div>
            </div>
          </div>
        </el-col>

        <el-col :xs="24" :lg="12">
          <div
            class="skills-category scroll-animate hover-lift"
            data-animation="fadeInRight"
            data-delay="3s"
          >
            <h3 class="category-title">
              <el-icon><CloudUpload /></el-icon>
              云服务与工具
            </h3>
            <div class="skills-list">
              <div v-for="skill in cloudSkills" :key="skill.name" class="skill-item">
                <div class="skill-header">
                  <span class="skill-name">{{ skill.name }}</span>
                  <span class="skill-percentage">{{ skill.level }}%</span>
                </div>
                <el-progress
                  :percentage="skill.level"
                  :color="skill.color"
                  :stroke-width="8"
                  class="skill-progress"
                />
              </div>
            </div>
          </div>
        </el-col>
      </el-row>

      <!-- 技能标签云 -->
      <div class="skills-cloud scroll-animate" data-animation="fadeInUp" data-delay="4s">
        <h3 class="cloud-title">其他技能</h3>
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
  level: number
  color: string
}

interface SkillTag {
  name: string
  type: 'primary' | 'success' | 'info' | 'warning' | 'danger'
  size: 'large' | 'default' | 'small'
}

const frontendSkills: Skill[] = [
  { name: 'Vue', level: 95, color: '#4fc08d' },
  { name: 'React', level: 85, color: '#61dafb' },
  { name: 'Express', level: 70, color: '#000' },
  { name: 'HTML5/CSS3', level: 92, color: '#e34f26' },
  { name: 'JavaScript(ES6+)', level: 95, color: '#f7df1e' },
]

const backendSkills: Skill[] = [
  { name: '地图开发(leaflet/openlayers/cesium)', level: 90, color: '#2d8cf0' },
  { name: 'Node.js', level: 70, color: '#339933' },
  { name: 'Express', level: 70, color: '#000' },
]

const databaseSkills: Skill[] = [
  { name: '工程化(Webpack/Vite/Rollup/Babel/ESLint)', level: 90, color: '#fca311' },
  { name: '性能优化', level: 85, color: '#e63946' },
  { name: '版本控制(Git/SVN)', level: 90, color: '#24292e' },
]

const cloudSkills: Skill[] = [
  { name: '多端开发(PC/桌面/移动/小程序)', level: 85, color: '#00bcd4' },
  { name: '技术管理', level: 80, color: '#8e44ad' },
  { name: 'AI技能(Cursor/ChatGPT/Gemeni)', level: 80, color: '#ff9800' },
]

const skillTags: SkillTag[] = [
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

.skills-category {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 30px;
  height: 100%;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.category-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 25px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #fff;
}

.skills-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.skill-item {
  margin-bottom: 10px;
}

.skill-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.skill-name {
  font-weight: 500;
  color: #fff;
}

.skill-percentage {
  font-weight: 600;
  color: #ffd700;
}

.skill-progress {
  margin-bottom: 5px;
}

.skill-progress :deep(.el-progress-bar__outer) {
  background-color: rgba(255, 255, 255, 0.2);
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

  .skills-category {
    margin-bottom: 30px;
  }

  .category-title {
    font-size: 1.3rem;
  }

  .tags-container {
    gap: 8px;
  }
}
</style>
