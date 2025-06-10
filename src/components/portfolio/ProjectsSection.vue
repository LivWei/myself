<template>
  <section id="projects" class="projects-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title scroll-animate" data-animation="fadeInUp">项目展示</h2>
        <p class="section-subtitle scroll-animate" data-animation="fadeInUp" data-delay="1s">
          10年来完成的各类型项目作品
        </p>
      </div>

      <div class="projects-grid" ref="gridRef">
        <el-row :gutter="30">
          <el-col
            v-for="project in projects"
            :key="project.id"
            :xs="24"
            :sm="12"
            :md="8"
            :lg="6"
            class="project-col"
          >
            <el-card
              class="project-card scroll-animate card-hover hover-lift"
              :body-style="{ padding: '0' }"
              shadow="hover"
              @click="openProjectDetail(project)"
              data-animation="fadeInUp"
            >
              <div class="project-image">
                <img v-if="project.image" :src="project.image" :alt="project.title" />
                <img v-else src="@/assets/default.png" alt="placeholder" />
                <div class="project-overlay">
                  <el-button type="primary" circle class="overlay-btn">
                    <el-icon><View /></el-icon>
                  </el-button>
                </div>
              </div>

              <div class="project-content">
                <h3 class="project-title">{{ project.title }}</h3>
                <p class="project-description">{{ project.description }}</p>

                <div class="project-tech">
                  <el-tag
                    v-for="tech in project.technologies"
                    :key="tech"
                    size="small"
                    class="tech-tag"
                  >
                    {{ tech }}
                  </el-tag>
                </div>

                <div class="project-actions">
                  <el-button
                    type="primary"
                    size="small"
                    @click.stop="viewDemo(project)"
                    class="action-btn btn-click hover-glow"
                  >
                    <el-icon><Link /></el-icon>
                    演示
                  </el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>

    <!-- 项目详情对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="selectedProject?.title"
      width="80%"
      :before-close="handleClose"
      class="project-dialog"
    >
      <div v-if="selectedProject" class="project-detail animate__animated animate__fadeIn">
        <el-row :gutter="20">
          <el-col :xs="24" :md="12">
            <img
              :src="selectedProject.image"
              :alt="selectedProject.title"
              class="detail-image animate__animated animate__zoomIn"
            />
          </el-col>
          <el-col :xs="24" :md="12">
            <div class="detail-content animate__animated animate__fadeInRight">
              <h3>项目概述</h3>
              <p>{{ selectedProject.fullDescription }}</p>

              <h3>技术栈</h3>
              <div class="tech-list">
                <el-tag v-for="tech in selectedProject.technologies" :key="tech" class="tech-tag">
                  {{ tech }}
                </el-tag>
              </div>

              <h3>核心功能</h3>
              <ul class="feature-list">
                <li v-for="feature in selectedProject.features" :key="feature">
                  {{ feature }}
                </li>
              </ul>
            </div>
          </el-col>
        </el-row>
      </div>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false" class="dialog-btn">关闭</el-button>
          <el-button type="primary" @click="viewDemo(selectedProject)" class="dialog-btn">
            查看演示
          </el-button>
        </span>
      </template>
    </el-dialog>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Project {
  id: number
  title: string
  description: string
  fullDescription: string
  image: string
  technologies: string[]
  features: string[]
  demoUrl?: string
  codeUrl?: string
}

const dialogVisible = ref(false)
const selectedProject = ref<Project | null>(null)

const projects: Project[] = [
  {
    id: 1,
    title: '广东省块数据平台',
    description: '前端负责人 | 2024/7 - 2025/6',
    fullDescription:
      '参与需求分析与设计，主导前端通用模板、登录、二三维地图模块开发，对接一网共享平台单点登录及多种地图服务，优化行政区划数据加载，封装openlayers地图功能，开发安全预警小程序。',
    image: new URL('@/assets/块数据平台.png', import.meta.url).href,
    technologies: ['Vue2', 'OpenLayers', 'Leaflet', 'Cesium', 'Taro', 'Web Worker'],
    features: [
      '通用模板搭建',
      '单点登录对接',
      '多地图服务集成',
      '行政区划数据懒加载',
      'openlayers地图功能封装',
      '安全预警小程序开发',
    ],
    demoUrl: '',
  },
  {
    id: 2,
    title: '黄冈时空大数据平台',
    description: '前端负责人 | 2023/4 - 2024/7',
    fullDescription:
      '主导三维分析、专题制图、定位飞行测量等功能开发，负责多端地图App开发，支持离线切片、加密解密等。',
    image: new URL('@/assets/时空大数据平台.png', import.meta.url).href,
    technologies: ['Vue2', 'Cesium', 'Leaflet', 'Uni-app'],
    features: [
      '三维分析功能',
      '专题制图',
      '定位飞行测量',
      '多端地图App',
      '离线切片加载',
      '切片加密解密',
    ],
    demoUrl: '',
  },
  {
    id: 3,
    title: '国土基础信息平台+“一张图”实施监督信息系统',
    description: '前端负责人 | 2022/5 - 2023/4',
    fullDescription:
      '搭建vue2+cesium基础框架，封装三维地图基础方法，开发分析评价、成果审查、监测预警等子系统，支撑多地项目验收。',
    image: new URL('@/assets/国基.png', import.meta.url).href,
    technologies: ['Vue2', 'Cesium', 'OpenLayers'],
    features: [
      '三维地图基础方法封装',
      '分析评价子系统',
      '成果审查子系统',
      '监测预警子系统',
      '多地项目支撑',
    ],
    demoUrl: '',
  },
  {
    id: 4,
    title: '原圈营销云SaaS系统',
    description: '前端开发 | 2020/8 - 2022/5',
    fullDescription:
      '主力开发客户资产管理、低代码平台等模块，封装element-ui表格、阿里云上传组件和各类工具函数。',
    image: '',
    technologies: ['Vue', 'Element-UI', '阿里云'],
    features: ['客户资产管理模块', '低代码平台模块', '表格与上传组件封装', '工具函数封装'],
    demoUrl: '',
  },
  {
    id: 5,
    title: '原圈CRM移动端',
    description: '前端开发 | 2020/8 - 2022/5',
    fullDescription: '全权负责移动端开发，集成微信SDK，封装公共组件和echarts，提升开发效率。',
    image: '',
    technologies: ['Vue', 'Vant', 'Echarts', '微信SDK'],
    features: ['移动端全权开发', '微信SDK集成', '公共组件封装', 'echarts封装'],
    demoUrl: '',
  },
  {
    id: 6,
    title: '湖北城乡垃圾治理举报平台小程序',
    description: '前端开发 | 2018/6 - 2020/8',
    fullDescription: '独立开发小程序前端，优化数据展示与交互体验。',
    image: '',
    technologies: ['小程序', 'Vue'],
    features: ['小程序独立开发', '数据展示优化', '交互体验优化'],
    demoUrl: '',
  },
  {
    id: 7,
    title: '智慧珠海综合服务平台',
    description: '前端开发 | 2016/6 - 2018/6',
    fullDescription: '负责平台前端开发，积累大屏可视化开发经验。',
    image: '',
    technologies: ['Vue', 'BI', '大屏可视化'],
    features: ['大屏可视化开发', '平台前端开发'],
    demoUrl: '',
  },
]

const openProjectDetail = (project: Project) => {
  selectedProject.value = project
  dialogVisible.value = true
}

const handleClose = () => {
  dialogVisible.value = false
  selectedProject.value = null
}

const viewDemo = (project: Project | null) => {
  if (project?.demoUrl) {
    window.open(project.demoUrl, '_blank')
  } else {
    console.log('查看演示:', project?.title)
  }
}
</script>

<style scoped>
.projects-section {
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

.projects-grid {
  margin-bottom: 40px;
}

.project-col {
  margin-bottom: 30px;
}

.project-card {
  height: 100%;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 12px;
  overflow: hidden;
}

.project-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.project-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.project-card:hover .project-image img {
  transform: scale(1.1);
}

.project-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-card:hover .project-overlay {
  opacity: 1;
}

.project-content {
  padding: 20px;
}

.project-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1a202c;
  margin-bottom: 8px;
}

.project-description {
  color: #718096;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 15px;
}

.project-tech {
  margin-bottom: 15px;
}

.tech-tag {
  margin-right: 8px;
  margin-bottom: 4px;
}

.project-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  transition: all 0.3s ease;
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
}

.detail-image {
  width: 100%;
  border-radius: 8px;
}

.detail-content h3 {
  color: #1a202c;
  margin: 20px 0 10px 0;
}

.detail-content h3:first-child {
  margin-top: 0;
}

.tech-list {
  margin-bottom: 20px;
}

.feature-list {
  list-style: none;
  padding: 0;
  max-height: 400px;
  overflow-y: auto;
}

.feature-list li {
  padding: 4px 0;
  color: #4a5568;
}

.feature-list li::before {
  content: '✓';
  color: #48bb78;
  font-weight: bold;
  margin-right: 8px;
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }

  .projects-section {
    padding: 60px 0;
  }
}
</style>
