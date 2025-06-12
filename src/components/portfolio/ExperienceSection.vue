<template>
  <section id="experience" class="experience-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title scroll-animate" data-animation="fadeInUp">工作经历</h2>
        <p class="section-subtitle scroll-animate" data-animation="fadeInUp" data-delay="1s">
          9年职业发展历程与成长轨迹
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
    period: '2022/5 - 至今',
    position: '高级软件工程师',
    company: '航天宏图信息技术股份有限公司',
    description:
      '负责部门前端项目基础架构搭建，国土基础信息平台产品研发及项目交付，主导组件库和性能优化，指导团队技术提升。',
    achievements: [
      '搭建部门前端项目基础架构',
      '主导国土基础信息平台产品研发',
      '设计并实现组件库，提升代码复用率达60%',
      '主导性能优化项目，首屏加载时间减少50%',
      '指导初级工程师，组织技术分享会',
      '推动团队使用AI工具提升开发效率',
    ],
    technologies: ['Vue', 'Cesium', 'OpenLayers', 'Leaflet', 'Webpack', 'Vite', 'Git'],
    type: 'primary',
    size: 'large',
    icon: 'Trophy',
  },
  {
    id: 2,
    period: '2020/8 - 2022/5',
    position: '前端工程师',
    company: '上海原圈网络科技有限公司',
    description: '负责原圈营销云SaaS系统和CRM移动端开发，主力开发客户资产管理、低代码平台等模块。',
    achievements: [
      '主力开发客户资产管理模块、低代码平台模块',
      '封装element-ui表格和阿里云上传组件',
      '全权负责CRM移动端开发，集成微信SDK',
      '封装echarts和公共组件，提升开发效率',
    ],
    technologies: ['Vue', 'Element-UI', 'Vant', 'Echarts', '微信SDK'],
    type: 'success',
    size: 'normal',
    icon: 'Star',
  },
  {
    id: 3,
    period: '2018/6 - 2020/8',
    position: '前端工程师',
    company: '武汉长达系统工程有限公司',
    description: '负责湖北城乡垃圾治理举报平台小程序和房地产大数据检测平台开发。',
    achievements: [
      '独立开发小程序和大数据平台前端',
      '优化数据展示与交互体验',
      '参与需求分析与系统设计',
    ],
    technologies: ['Vue', '小程序', 'Echarts'],
    type: 'warning',
    size: 'normal',
    icon: 'Cpu',
  },
  {
    id: 4,
    period: '2016/6 - 2018/6',
    position: '前端工程师',
    company: '立得空间信息技术股份有限公司',
    description: '负责智慧珠海综合服务平台和立得BI系统开发。',
    achievements: ['开发智慧珠海综合服务平台', '参与立得BI系统开发', '积累大屏可视化开发经验'],
    technologies: ['Vue', 'BI', '大屏可视化'],
    type: 'info',
    size: 'normal',
    icon: 'Monitor',
  },
]

const stats: Stat[] = [
  { label: '工作年限', value: '9+', icon: 'Timer' },
  { label: '主要项目', value: '10+', icon: 'Folder' },
  { label: '团队管理', value: '有', icon: 'User' },
  { label: '技能标签', value: '15+', icon: 'Collection' },
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
