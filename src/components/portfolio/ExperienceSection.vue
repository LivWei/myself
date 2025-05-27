<template>
  <section id="experience" class="experience-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title scroll-animate" data-animation="fadeInUp">工作经历</h2>
        <p class="section-subtitle scroll-animate" data-animation="fadeInUp" data-delay="1s">
          10年职业发展历程与成长轨迹
        </p>
      </div>

      <div class="timeline-container scroll-animate" data-animation="fadeInUp" data-delay="2s">
        <el-timeline>
          <el-timeline-item
            v-for="(experience, index) in experiences"
            :key="experience.id"
            :timestamp="experience.period"
            placement="top"
            :type="experience.type"
            :size="experience.size"
            :hollow="index !== 0"
          >
            <el-card
              class="experience-card scroll-animate"
              shadow="hover"
              data-animation="fadeInUp"
            >
              <div class="experience-header">
                <div class="company-info">
                  <h3 class="position">{{ experience.position }}</h3>
                  <h4 class="company">{{ experience.company }}</h4>
                </div>
                <div class="experience-icon">
                  <el-icon :size="24">
                    <component :is="experience.icon" />
                  </el-icon>
                </div>
              </div>

              <div class="experience-content">
                <p class="description">{{ experience.description }}</p>

                <div class="achievements">
                  <h5>主要成就：</h5>
                  <ul class="achievement-list">
                    <li v-for="achievement in experience.achievements" :key="achievement">
                      {{ achievement }}
                    </li>
                  </ul>
                </div>

                <div class="technologies">
                  <h5>技术栈：</h5>
                  <div class="tech-tags">
                    <el-tag
                      v-for="tech in experience.technologies"
                      :key="tech"
                      size="small"
                      class="tech-tag"
                    >
                      {{ tech }}
                    </el-tag>
                  </div>
                </div>
              </div>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>

      <!-- 统计数据 -->
      <div class="stats-section scroll-animate" data-animation="fadeInUp" data-delay="3s">
        <el-row :gutter="30">
          <el-col :xs="12" :sm="6" v-for="stat in stats" :key="stat.label">
            <div class="stat-card scroll-animate" data-animation="zoomIn">
              <div class="stat-icon">
                <el-icon :size="32">
                  <component :is="stat.icon" />
                </el-icon>
              </div>
              <div class="stat-content">
                <div class="stat-number">{{ stat.value }}</div>
                <div class="stat-label">{{ stat.label }}</div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Experience {
  id: number
  period: string
  position: string
  company: string
  description: string
  achievements: string[]
  technologies: string[]
  type: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  size: 'normal' | 'large'
  icon: string
}

interface Stat {
  label: string
  value: string
  icon: string
}

const experiences: Experience[] = [
  {
    id: 1,
    period: '2024年至今',
    position: '高级架构师',
    company: '某知名互联网公司',
    description:
      '负责公司核心产品的技术架构设计，带领团队进行技术创新和系统优化，推动公司数字化转型。',
    achievements: [
      '设计并实施微服务架构，系统性能提升40%',
      '建立完善的技术规范和代码审查流程',
      '带领20人技术团队，成功交付多个重要项目',
      '推动DevOps实践，部署效率提升60%',
    ],
    technologies: ['微服务', 'Kubernetes', 'Docker', 'Spring Cloud', 'Redis'],
    type: 'primary',
    size: 'large',
    icon: 'Trophy',
  },
  {
    id: 2,
    period: '2021-2024年',
    position: '高级开发工程师',
    company: '某科技公司',
    description: '担任项目技术负责人，负责全栈开发和技术选型，参与产品架构设计和团队技术培训。',
    achievements: [
      '独立完成3个大型项目的技术架构设计',
      '优化系统性能，响应时间减少50%',
      '建立前端组件库，提升开发效率30%',
      '指导初级开发人员，提升团队整体技术水平',
    ],
    technologies: ['Vue.js', 'React', 'Node.js', 'MySQL', 'MongoDB'],
    type: 'success',
    size: 'normal',
    icon: 'Star',
  },
  {
    id: 3,
    period: '2018-2021年',
    position: '软件工程师',
    company: '某创业公司',
    description: '参与公司核心产品的开发，负责前端和移动端开发工作，积累了丰富的全栈开发经验。',
    achievements: [
      '开发并维护公司主要产品的前端界面',
      '使用React Native开发跨平台移动应用',
      '参与API设计和后端服务开发',
      '建立自动化测试流程，bug率降低35%',
    ],
    technologies: ['React', 'React Native', 'JavaScript', 'Python', 'PostgreSQL'],
    type: 'warning',
    size: 'normal',
    icon: 'Cpu',
  },
  {
    id: 4,
    period: '2015-2018年',
    position: '初级开发工程师',
    company: '某软件公司',
    description:
      '作为新人开发者，主要负责Web前端开发和简单的后端功能实现，在这个阶段快速学习和成长。',
    achievements: [
      '快速掌握前端开发技能，独立完成多个页面开发',
      '学习并应用多种前端框架和工具',
      '参与代码重构，提升代码质量',
      '积极参与技术分享，获得团队认可',
    ],
    technologies: ['HTML', 'CSS', 'JavaScript', 'jQuery', 'PHP'],
    type: 'info',
    size: 'normal',
    icon: 'Monitor',
  },
]

const stats: Stat[] = [
  { label: '工作年限', value: '10+', icon: 'Timer' },
  { label: '完成项目', value: '50+', icon: 'Folder' },
  { label: '团队规模', value: '20+', icon: 'User' },
  { label: '技术栈', value: '15+', icon: 'Collection' },
]
</script>

<style scoped>
.experience-section {
  width: 100%;
  padding: 80px 0;
  background: #f8fafc;
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
  color: #1a202c;
  margin-bottom: 1rem;
}

.section-subtitle {
  font-size: 1.1rem;
  color: #718096;
  max-width: 600px;
  margin: 0 auto;
}

.timeline-container {
  margin-bottom: 60px;
}

.experience-card {
  margin-left: 20px;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.experience-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.experience-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}

.company-info {
  flex: 1;
}

.position {
  font-size: 1.3rem;
  font-weight: 600;
  color: #1a202c;
  margin-bottom: 5px;
}

.company {
  font-size: 1.1rem;
  color: #4a5568;
  margin-bottom: 0;
}

.experience-icon {
  color: #667eea;
}

.experience-content {
  color: #4a5568;
}

.description {
  line-height: 1.6;
  margin-bottom: 20px;
}

.achievements {
  margin-bottom: 20px;
}

.achievements h5,
.technologies h5 {
  font-size: 1rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 10px;
}

.achievement-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.achievement-list li {
  padding: 4px 0;
  position: relative;
  padding-left: 20px;
}

.achievement-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #48bb78;
  font-weight: bold;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tech-tag {
  margin: 0;
}

.stats-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  padding: 40px;
  color: #fff;
}

.stat-card {
  text-align: center;
  padding: 20px;
}

.stat-icon {
  margin-bottom: 15px;
  color: #ffd700;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 5px;
  color: #fff;
}

.stat-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
}

/* Timeline 样式覆盖 */
:deep(.el-timeline) {
  padding-left: 0;
}

:deep(.el-timeline-item__timestamp) {
  font-weight: 600;
  color: #667eea;
  font-size: 1rem;
}

:deep(.el-timeline-item__node) {
  background-color: #667eea;
  border-color: #667eea;
}

:deep(.el-timeline-item__node--primary) {
  background-color: #409eff;
  border-color: #409eff;
}

:deep(.el-timeline-item__node--success) {
  background-color: #67c23a;
  border-color: #67c23a;
}

:deep(.el-timeline-item__node--warning) {
  background-color: #e6a23c;
  border-color: #e6a23c;
}

:deep(.el-timeline-item__node--info) {
  background-color: #909399;
  border-color: #909399;
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }

  .experience-section {
    padding: 60px 0;
  }

  .experience-card {
    margin-left: 10px;
  }

  .experience-header {
    flex-direction: column;
    gap: 10px;
  }

  .stats-section {
    padding: 30px 20px;
  }

  .stat-number {
    font-size: 2rem;
  }
}
</style>
