<template>
  <div class="portfolio-page">
    <!-- 导航栏 -->
    <PortfolioHeader />

    <!-- 英雄区域 -->
    <HeroSection />

    <!-- 项目展示区域 -->
    <ProjectsSection />

    <!-- 技能栈展示 -->
    <SkillsSection />

    <!-- 工作经历时间线 -->
    <ExperienceSection />

    <!-- 联系方式 -->
    <ContactSection />

    <!-- 页脚 -->
    <PortfolioFooter />
  </div>
</template>

<script setup lang="ts" name="PortfolioPage">
import PortfolioHeader from '@/components/portfolio/PortfolioHeader.vue'
import HeroSection from '@/components/portfolio/HeroSection.vue'
import ProjectsSection from '@/components/portfolio/ProjectsSection.vue'
import SkillsSection from '@/components/portfolio/SkillsSection.vue'
import ExperienceSection from '@/components/portfolio/ExperienceSection.vue'
import ContactSection from '@/components/portfolio/ContactSection.vue'
import PortfolioFooter from '@/components/portfolio/PortfolioFooter.vue'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

// 初始化滚动动画
useScrollAnimation()
</script>

<style scoped>
.portfolio-page {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}
</style>
