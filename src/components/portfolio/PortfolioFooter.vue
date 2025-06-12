<template>
  <footer class="portfolio-footer">
    <div class="container">
      <div class="footer-content">
        <el-row :gutter="40">
          <el-col :xs="24" :md="12">
            <div class="footer-section animate__animated animate__fadeInUp">
              <h3 class="footer-title">个人作品集</h3>
              <p class="footer-description">
                专注于全栈开发和技术创新，致力于构建高质量的软件产品。
                10年开发经验，期待与您的合作。
              </p>
            </div>
          </el-col>

          <el-col :xs="24" :md="12">
            <div class="footer-section animate__animated animate__fadeInUp animate__delay-2s">
              <h3 class="footer-title">联系信息</h3>
              <div class="contact-info">
                <div class="contact-item">
                  <el-icon><Message /></el-icon>
                  <span>893624020@qq.com</span>
                </div>
                <div class="contact-item">
                  <el-icon><Phone /></el-icon>
                  <span>+86 136-1860-8720</span>
                </div>
                <div class="contact-item">
                  <el-icon><Location /></el-icon>
                  <span>湖北省武汉市</span>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="footer-bottom animate__animated animate__fadeInUp animate__delay-3s">
        <el-divider />
        <div class="footer-bottom-content">
          <div class="copyright">
            <p>&copy; {{ currentYear }} 刘威. All rights reserved.</p>
          </div>
          <div class="powered-by">
            <p>
              Powered by
              <el-link type="primary" href="https://vuejs.org" target="_blank">Vue.js</el-link>
              &
              <el-link type="primary" href="https://element-plus.org" target="_blank"
                >Element Plus</el-link
              >
            </p>
          </div>
          <div class="back-to-top">
            <el-button circle type="primary" @click="scrollToTop" :icon="ArrowUp" />
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ArrowUp } from '@element-plus/icons-vue'

const currentYear = computed(() => new Date().getFullYear())

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const openLink = (url: string) => {
  window.open(url, '_blank')
}
</script>

<style scoped>
.portfolio-footer {
  width: 100%;
  background: #1a202c;
  color: #e2e8f0;
  padding: 60px 0 20px;
  margin: 0;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-content {
  margin-bottom: 40px;
}

.footer-section {
  margin-bottom: 30px;
}

.footer-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 20px;
}

.footer-description {
  line-height: 1.6;
  color: #a0aec0;
  margin-bottom: 20px;
}

.social-links {
  display: flex;
  gap: 10px;
}

.social-links .el-button {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #e2e8f0;
}

.social-links .el-button:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 12px;
}

.footer-links a {
  color: #a0aec0;
  text-decoration: none;
  transition: color 0.3s ease;
  cursor: pointer;
}

.footer-links a:hover {
  color: #667eea;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #a0aec0;
}

.contact-item .el-icon {
  color: #667eea;
}

.footer-bottom {
  border-top: 1px solid #2d3748;
  padding-top: 20px;
}

.footer-bottom-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.copyright p,
.powered-by p {
  margin: 0;
  color: #a0aec0;
  font-size: 0.9rem;
}

.powered-by {
  text-align: center;
}

.back-to-top {
  display: flex;
  justify-content: flex-end;
}

/* Element Plus 样式覆盖 */
:deep(.el-divider) {
  border-color: #2d3748;
  margin: 20px 0;
}

:deep(.el-link) {
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .portfolio-footer {
    padding: 40px 0 20px;
  }

  .footer-bottom-content {
    flex-direction: column;
    text-align: center;
    gap: 15px;
  }

  .back-to-top {
    justify-content: center;
  }

  .social-links {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .footer-section {
    text-align: center;
  }

  .contact-info {
    align-items: center;
  }
}
</style>
