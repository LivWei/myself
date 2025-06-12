<template>
  <section id="hero" class="hero-section">
    <div class="hero-container">
      <el-row :gutter="40" align="middle">
        <el-col :xs="24" :md="12" class="hero-content">
          <div class="hero-text">
            <h1 class="hero-title scroll-animate" data-animation="fadeInUp">
              <el-text class="greeting scroll-animate" data-animation="fadeInLeft" data-delay="1s"
                >你好，我是</el-text
              >
              <el-text class="name scroll-animate" data-animation="fadeInRight" data-delay="2s"
                >刘威</el-text
              >
            </h1>
            <h2 class="hero-subtitle scroll-animate" data-animation="fadeInUp" data-delay="3s">
              前端开发工程师
            </h2>
            <p class="hero-description scroll-animate" data-animation="fadeInUp" data-delay="4s">
              擅长Vue、React等主流前端框架，精通地图开发与工程化，具备丰富的团队管理和大型项目经验。热衷于技术创新与效率提升，致力于打造高质量的前端产品。
            </p>
            <div class="hero-stats scroll-animate" data-animation="fadeInUp" data-delay="5s">
              <div class="stat-item scroll-animate" data-animation="zoomIn" data-delay="6s">
                <el-statistic :value="9" suffix="年">
                  <template #title>
                    <div style="display: inline-flex; align-items: center; color: #fff">
                      <el-icon style="margin-right: 4px"><Timer /></el-icon>
                      工作经验
                    </div>
                  </template>
                </el-statistic>
              </div>
              <div class="stat-item scroll-animate" data-animation="zoomIn" data-delay="7s">
                <el-statistic :value="10" suffix="+">
                  <template #title>
                    <div style="display: inline-flex; align-items: center; color: #fff">
                      <el-icon style="margin-right: 4px"><Folder /></el-icon>
                      主要项目
                    </div>
                  </template>
                </el-statistic>
              </div>
              <div class="stat-item scroll-animate" data-animation="zoomIn" data-delay="8s">
                <el-statistic :value="15" suffix="+">
                  <template #title>
                    <div style="display: inline-flex; align-items: center; color: #fff">
                      <el-icon style="margin-right: 4px"><Trophy /></el-icon>
                      技能标签
                    </div>
                  </template>
                </el-statistic>
              </div>
            </div>
            <div class="hero-actions scroll-animate" data-animation="fadeInUp" data-delay="9s">
              <el-button
                type="primary"
                size="large"
                @click="downloadResume"
                class="action-btn btn-click hover-glow"
              >
                <el-icon><Download /></el-icon>
                下载简历
              </el-button>
            </div>
          </div>
        </el-col>

        <el-col :xs="24" :md="12" class="hero-avatar">
          <div class="avatar-container scroll-animate" data-animation="zoomIn" data-delay="1s">
            <el-avatar :size="200" :src="avatarImg" class="hero-avatar-img animate-float" />
            <div class="avatar-decoration"></div>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 滚动提示 -->
    <div class="scroll-indicator scroll-animate" data-animation="fadeInUp" data-delay="10s">
      <el-icon class="scroll-icon"><ArrowDown /></el-icon>
      <span>向下滚动探索更多</span>
    </div>
  </section>
</template>

<script setup lang="ts">
import avatarImg from '@/assets/1.jpg'

const downloadResume = () => {
  // 触发下载 public 目录下的 PDF 文件
  const link = document.createElement('a')
  link.href = '/刘威-本科-前端.pdf'
  link.download = '刘威-本科-前端.pdf'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const scrollToContact = () => {
  const element = document.getElementById('contact')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
.hero-section {
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  padding: 80px 0 60px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  overflow: hidden;
  margin: 0;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  opacity: 0.3;
}

.hero-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 1;
}

.hero-content {
  text-align: left;
}

.hero-text {
  color: #fff;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.greeting {
  display: block;
  font-size: 1.5rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 0.5rem;
}

.name {
  background: linear-gradient(45deg, #ffd700, #ffed4e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 32px;
}

.hero-subtitle {
  font-size: 1.8rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
  color: rgba(255, 255, 255, 0.9);
}

.hero-description {
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.8);
  max-width: 500px;
}

.hero-stats {
  display: flex;
  gap: 2rem;
  margin-bottom: 2.5rem;
}

.stat-item {
  text-align: center;
}

.stat-item :deep(.el-statistic__content) {
  color: #ffd700;
  font-weight: 700;
  font-size: 2rem;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.action-btn {
  transition: all 0.3s ease;
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.hero-avatar {
  text-align: center;
}

.avatar-container {
  position: relative;
  display: inline-block;
}

.hero-avatar-img {
  border: 4px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
}

.hero-avatar-img:hover {
  transform: scale(1.05);
}

.avatar-decoration {
  position: absolute;
  top: -20px;
  left: -20px;
  right: -20px;
  bottom: -20px;
  border: 2px solid rgba(255, 215, 0, 0.3);
  border-radius: 50%;
  animation: rotate 20s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.scroll-indicator {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  animation: bounce 2s infinite;
}

.scroll-icon {
  font-size: 24px;
  margin-bottom: 8px;
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateX(-50%) translateY(0);
  }
  40% {
    transform: translateX(-50%) translateY(-10px);
  }
  60% {
    transform: translateX(-50%) translateY(-5px);
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.4rem;
  }

  .hero-stats {
    justify-content: center;
    gap: 1rem;
  }

  .hero-actions {
    justify-content: center;
  }

  .hero-content {
    text-align: center;
    margin-bottom: 2rem;
  }
}
</style>
