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
  { name: 'Vue.js', level: 95, color: '#4fc08d' },
  { name: 'React', level: 90, color: '#61dafb' },
  { name: 'TypeScript', level: 88, color: '#3178c6' },
  { name: 'JavaScript', level: 95, color: '#f7df1e' },
  { name: 'HTML5/CSS3', level: 92, color: '#e34f26' },
]

const backendSkills: Skill[] = [
  { name: 'Node.js', level: 90, color: '#339933' },
  { name: 'Java', level: 85, color: '#ed8b00' },
  { name: 'Python', level: 88, color: '#3776ab' },
  { name: 'C#', level: 80, color: '#239120' },
  { name: 'Go', level: 75, color: '#00add8' },
]

const databaseSkills: Skill[] = [
  { name: 'MySQL', level: 85, color: '#4479a1' },
  { name: 'MongoDB', level: 82, color: '#47a248' },
  { name: 'Redis', level: 80, color: '#dc382d' },
  { name: 'PostgreSQL', level: 78, color: '#336791' },
]

const cloudSkills: Skill[] = [
  { name: 'AWS', level: 80, color: '#ff9900' },
  { name: 'Docker', level: 85, color: '#2496ed' },
  { name: 'Kubernetes', level: 75, color: '#326ce5' },
  { name: 'Nginx', level: 82, color: '#009639' },
]

const skillTags: SkillTag[] = [
  { name: 'Git', type: 'primary', size: 'large' },
  { name: 'Webpack', type: 'success', size: 'default' },
  { name: 'Vite', type: 'info', size: 'default' },
  { name: 'Jest', type: 'warning', size: 'small' },
  { name: 'Cypress', type: 'danger', size: 'small' },
  { name: 'GraphQL', type: 'primary', size: 'default' },
  { name: 'REST API', type: 'success', size: 'large' },
  { name: 'Microservices', type: 'info', size: 'default' },
  { name: 'Agile', type: 'warning', size: 'default' },
  { name: 'Scrum', type: 'danger', size: 'small' },
  { name: 'CI/CD', type: 'primary', size: 'default' },
  { name: 'Linux', type: 'success', size: 'default' },
  { name: 'Figma', type: 'info', size: 'small' },
  { name: 'Photoshop', type: 'warning', size: 'small' },
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
