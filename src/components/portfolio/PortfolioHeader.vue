<template>
  <el-header class="portfolio-header animate__animated animate__slideInDown">
    <div class="header-container">
      <div class="logo animate__animated animate__fadeInLeft">
        <h2>个人介绍</h2>
      </div>

      <el-menu
        :default-active="activeIndex"
        class="header-menu animate__animated animate__fadeInUp animate__delay-1s"
        mode="horizontal"
        @select="handleSelect"
        background-color="transparent"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="hero">关于我</el-menu-item>
        <el-menu-item index="projects">项目展示</el-menu-item>
        <el-menu-item index="skills">技能栈</el-menu-item>
        <el-menu-item index="experience">工作经历</el-menu-item>
        <el-menu-item index="contact">联系方式</el-menu-item>
      </el-menu>

      <!-- 移动端菜单按钮 -->
      <el-button class="mobile-menu-btn" type="text" @click="mobileMenuVisible = true">
        <el-icon><Menu /></el-icon>
      </el-button>
    </div>

    <!-- 移动端抽屉菜单 -->
    <el-drawer v-model="mobileMenuVisible" title="导航菜单" direction="rtl" size="250px">
      <el-menu :default-active="activeIndex" @select="handleMobileSelect">
        <el-menu-item index="hero">关于我</el-menu-item>
        <el-menu-item index="projects">项目展示</el-menu-item>
        <el-menu-item index="skills">技能栈</el-menu-item>
        <el-menu-item index="experience">工作经历</el-menu-item>
        <el-menu-item index="contact">联系方式</el-menu-item>
      </el-menu>
    </el-drawer>
  </el-header>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeIndex = ref('hero')
const mobileMenuVisible = ref(false)

const handleSelect = (key: string) => {
  activeIndex.value = key
  scrollToSection(key)
}

const handleMobileSelect = (key: string) => {
  activeIndex.value = key
  mobileMenuVisible.value = false
  scrollToSection(key)
}

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
.portfolio-header {
  width: 100%;
  background: #000;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 60px;
  padding: 0;
  margin: 0;
}

.header-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 20px;
}

.logo h2 {
  color: #fff;
  margin: 0;
  font-weight: 600;
}

.header-menu {
  border-bottom: none;
  flex: 1;
  display: flex;
  justify-content: center;
}

.header-menu .el-menu-item {
  border-bottom: none;
  color: #fff;
  padding: 0 15px;
  white-space: nowrap;
}

.header-menu .el-menu-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.mobile-menu-btn {
  display: none;
  color: #fff;
  font-size: 20px;
}

@media (max-width: 900px) {
  .header-menu .el-menu-item {
    padding: 0 10px;
    font-size: 14px;
  }
}

@media (max-width: 768px) {
  .header-menu {
    display: none;
  }

  .mobile-menu-btn {
    display: block;
  }
}
</style>
