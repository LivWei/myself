<template>
  <section id="contact" class="contact-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title scroll-animate" data-animation="fadeInUp">联系方式</h2>
        <p class="section-subtitle scroll-animate" data-animation="fadeInUp" data-delay="1s">
          期待与您的合作交流
        </p>
      </div>

      <el-row :gutter="40">
        <!-- 联系信息 -->
        <el-col :xs="24" :lg="12">
          <div class="contact-info scroll-animate" data-animation="fadeInLeft" data-delay="2s">
            <h3 class="info-title">联系信息</h3>
            <div class="contact-items">
              <div class="contact-item">
                <div class="contact-icon">
                  <el-icon><Message /></el-icon>
                </div>
                <div class="contact-content">
                  <h4>邮箱</h4>
                  <p>your.email@example.com</p>
                </div>
              </div>

              <div class="contact-item">
                <div class="contact-icon">
                  <el-icon><Phone /></el-icon>
                </div>
                <div class="contact-content">
                  <h4>电话</h4>
                  <p>+86 138-xxxx-xxxx</p>
                </div>
              </div>

              <div class="contact-item">
                <div class="contact-icon">
                  <el-icon><Location /></el-icon>
                </div>
                <div class="contact-content">
                  <h4>位置</h4>
                  <p>北京市朝阳区</p>
                </div>
              </div>

              <div class="contact-item">
                <div class="contact-icon">
                  <el-icon><Link /></el-icon>
                </div>
                <div class="contact-content">
                  <h4>GitHub</h4>
                  <p>github.com/yourusername</p>
                </div>
              </div>
            </div>

            <!-- 社交媒体链接 -->
            <div class="social-links">
              <h4>社交媒体</h4>
              <div class="social-buttons">
                <el-button
                  circle
                  type="primary"
                  @click="openLink('https://github.com')"
                  class="social-btn"
                >
                  <el-icon><Platform /></el-icon>
                </el-button>
                <el-button
                  circle
                  type="info"
                  @click="openLink('https://linkedin.com')"
                  class="social-btn"
                >
                  <el-icon><User /></el-icon>
                </el-button>
                <el-button
                  circle
                  type="success"
                  @click="openLink('https://twitter.com')"
                  class="social-btn"
                >
                  <el-icon><ChatDotRound /></el-icon>
                </el-button>
                <el-button
                  circle
                  type="warning"
                  @click="downloadResume"
                  class="social-btn btn-click animate-pulse"
                >
                  <el-icon><Download /></el-icon>
                </el-button>
              </div>
            </div>
          </div>
        </el-col>

        <!-- 联系表单 -->
        <el-col :xs="24" :lg="12">
          <div class="contact-form scroll-animate" data-animation="fadeInRight" data-delay="2s">
            <h3 class="form-title">发送消息</h3>
            <el-form
              ref="formRef"
              :model="form"
              :rules="rules"
              label-position="top"
              @submit.prevent="submitForm"
            >
              <el-form-item label="姓名" prop="name">
                <el-input v-model="form.name" placeholder="请输入您的姓名" size="large" />
              </el-form-item>

              <el-form-item label="邮箱" prop="email">
                <el-input
                  v-model="form.email"
                  type="email"
                  placeholder="请输入您的邮箱"
                  size="large"
                />
              </el-form-item>

              <el-form-item label="主题" prop="subject">
                <el-input v-model="form.subject" placeholder="请输入消息主题" size="large" />
              </el-form-item>

              <el-form-item label="消息内容" prop="message">
                <el-input
                  v-model="form.message"
                  type="textarea"
                  :rows="5"
                  placeholder="请输入您想说的话..."
                  size="large"
                />
              </el-form-item>

              <el-form-item>
                <el-button
                  type="primary"
                  size="large"
                  :loading="loading"
                  @click="submitForm"
                  style="width: 100%"
                >
                  <el-icon v-if="!loading"><Promotion /></el-icon>
                  {{ loading ? '发送中...' : '发送消息' }}
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'

const formRef = ref<FormInstance>()
const loading = ref(false)

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const rules: FormRules = {
  name: [
    { required: true, message: '请输入您的姓名', trigger: 'blur' },
    { min: 2, max: 20, message: '姓名长度应在 2 到 20 个字符', trigger: 'blur' },
  ],
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' },
  ],
  subject: [
    { required: true, message: '请输入消息主题', trigger: 'blur' },
    { min: 5, max: 50, message: '主题长度应在 5 到 50 个字符', trigger: 'blur' },
  ],
  message: [
    { required: true, message: '请输入消息内容', trigger: 'blur' },
    { min: 10, max: 500, message: '消息内容应在 10 到 500 个字符', trigger: 'blur' },
  ],
}

const submitForm = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()
    loading.value = true

    // 模拟发送请求
    await new Promise((resolve) => setTimeout(resolve, 2000))

    ElMessage.success('消息发送成功！我会尽快回复您。')

    // 重置表单
    formRef.value.resetFields()
  } catch {
    ElMessage.error('请检查表单信息是否正确')
  } finally {
    loading.value = false
  }
}

const openLink = (url: string) => {
  window.open(url, '_blank')
}

const downloadResume = () => {
  // 这里可以添加下载简历的逻辑
  ElMessage.info('简历下载功能开发中...')
}
</script>

<style scoped>
.contact-section {
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

.contact-info,
.contact-form {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 40px;
  height: 100%;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.info-title,
.form-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 30px;
  color: #fff;
}

.contact-items {
  margin-bottom: 40px;
}

.contact-item {
  display: flex;
  align-items: center;
  margin-bottom: 25px;
}

.contact-icon {
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  color: #ffd700;
  font-size: 20px;
}

.contact-content h4 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 5px;
  color: #fff;
}

.contact-content p {
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
}

.social-links h4 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: #fff;
}

.social-buttons {
  display: flex;
  gap: 15px;
}

.social-buttons .el-button {
  width: 50px;
  height: 50px;
}

.social-btn {
  transition: all 0.3s ease;
}

.social-btn:hover {
  transform: translateY(-3px) scale(1.1);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

/* 表单样式覆盖 */
:deep(.el-form-item__label) {
  color: #fff !important;
  font-weight: 500;
}

:deep(.el-input__wrapper) {
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}

:deep(.el-input__wrapper:hover) {
  border-color: rgba(255, 255, 255, 0.5);
}

:deep(.el-input__wrapper.is-focus) {
  border-color: #ffd700;
  box-shadow: 0 0 0 1px rgba(255, 215, 0, 0.3);
}

:deep(.el-input__inner) {
  color: #fff;
}

:deep(.el-input__inner::placeholder) {
  color: rgba(255, 255, 255, 0.6);
}

:deep(.el-textarea__inner) {
  background-color: transparent;
  color: #fff;
  border: none;
}

:deep(.el-textarea__inner::placeholder) {
  color: rgba(255, 255, 255, 0.6);
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }

  .contact-section {
    padding: 60px 0;
  }

  .contact-info,
  .contact-form {
    padding: 30px 20px;
    margin-bottom: 30px;
  }

  .contact-item {
    margin-bottom: 20px;
  }

  .contact-icon {
    width: 40px;
    height: 40px;
    margin-right: 15px;
    font-size: 18px;
  }

  .social-buttons {
    justify-content: center;
  }
}
</style>
