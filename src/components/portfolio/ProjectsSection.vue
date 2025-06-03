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
                <img :src="project.image" :alt="project.title" />
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
import openlayersImg from '../../assets/openlayers.png'
import { directoryConfigs } from '../../utils/fileConfig.js'

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

const openlayersConfig = directoryConfigs.find((cfg) => cfg.name === 'openlayers')

const projects: Project[] = [
  {
    id: 1,
    title: 'openlayers',
    description: 'openlayers示例',
    fullDescription: '这是一个openlayers示例。',
    image: openlayersImg,
    technologies: ['openlayers', 'turf'],
    features: openlayersConfig ? openlayersConfig.files : [],
    demoUrl: '/code-display',
  },
  {
    id: 2,
    title: '企业管理系统',
    description: 'React和Java构建的企业级管理系统',
    fullDescription:
      '为中大型企业打造的综合管理系统，包含人事管理、财务管理、项目管理等多个模块，提供完整的企业运营解决方案。',
    image: 'https://via.placeholder.com/300x200/059669/ffffff?text=企业管理',
    technologies: ['React', 'Java', 'Spring Boot', 'PostgreSQL'],
    features: ['人事管理', '财务管理', '项目管理', '权限控制', '数据分析'],
  },
  {
    id: 3,
    title: '移动应用',
    description: 'Flutter开发的跨平台移动应用',
    fullDescription:
      '使用Flutter框架开发的跨平台移动应用，支持iOS和Android双平台，提供流畅的用户体验和丰富的功能。',
    image: 'https://via.placeholder.com/300x200/dc2626/ffffff?text=移动应用',
    technologies: ['Flutter', 'Dart', 'Firebase'],
    features: ['跨平台支持', '实时通讯', '离线缓存', '推送通知', '社交分享'],
  },
  {
    id: 4,
    title: '数据分析平台',
    description: 'Python和机器学习构建的数据分析平台',
    fullDescription:
      '基于Python和机器学习技术的数据分析平台，提供数据可视化、预测分析、智能报告等功能。',
    image: 'https://via.placeholder.com/300x200/7c3aed/ffffff?text=数据分析',
    technologies: ['Python', 'TensorFlow', 'Django', 'MongoDB'],
    features: ['数据可视化', '机器学习', '预测分析', '自动报告', 'API接口'],
  },
  {
    id: 5,
    title: '区块链项目',
    description: 'Solidity智能合约开发项目',
    fullDescription:
      '基于以太坊的去中心化应用，包含智能合约开发、DeFi功能、NFT交易等区块链核心功能。',
    image: 'https://via.placeholder.com/300x200/f59e0b/ffffff?text=区块链',
    technologies: ['Solidity', 'Web3.js', 'Ethereum', 'IPFS'],
    features: ['智能合约', 'DeFi功能', 'NFT交易', '去中心化存储', '代币经济'],
  },
  {
    id: 6,
    title: 'AI智能助手',
    description: 'TensorFlow构建的人工智能助手',
    fullDescription: '基于深度学习的智能助手系统，支持自然语言处理、语音识别、图像识别等AI功能。',
    image: 'https://via.placeholder.com/300x200/10b981/ffffff?text=AI助手',
    technologies: ['TensorFlow', 'Python', 'NLP', 'OpenAI'],
    features: ['自然语言处理', '语音识别', '图像识别', '智能对话', '学习能力'],
  },
  {
    id: 7,
    title: '物联网平台',
    description: 'C++和嵌入式开发的物联网平台',
    fullDescription: '面向工业4.0的物联网平台，支持设备接入、数据采集、远程控制、智能分析等功能。',
    image: 'https://via.placeholder.com/300x200/8b5cf6/ffffff?text=物联网',
    technologies: ['C++', '嵌入式', 'MQTT', 'InfluxDB'],
    features: ['设备管理', '数据采集', '远程控制', '实时监控', '智能分析'],
  },
  {
    id: 8,
    title: '游戏开发',
    description: 'Unity和C#开发的3D游戏',
    fullDescription: '使用Unity引擎开发的3D动作游戏，包含完整的游戏机制、关卡设计、角色系统等。',
    image: 'https://via.placeholder.com/300x200/ef4444/ffffff?text=游戏开发',
    technologies: ['Unity', 'C#', '3D建模', 'Photon'],
    features: ['3D渲染', '物理引擎', '多人联机', '关卡编辑', '角色系统'],
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
