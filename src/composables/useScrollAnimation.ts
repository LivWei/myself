import { onMounted, onUnmounted, ref } from 'vue'

export function useScrollAnimation() {
  const observer = ref<IntersectionObserver | null>(null)

  const initScrollAnimation = () => {
    observer.value = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement

            // 添加基础动画类
            if (!element.classList.contains('animate__animated')) {
              element.classList.add('animate__animated')
            }

            // 根据元素的data属性添加相应的动画
            const animationType = element.dataset.animation || 'fadeInUp'
            const delay = element.dataset.delay || ''

            // 移除初始隐藏状态
            element.style.opacity = '1'
            element.style.transform = 'none'

            element.classList.add(`animate__${animationType}`)
            if (delay) {
              element.classList.add(`animate__delay-${delay}`)
            }

            // 动画完成后停止观察该元素
            observer.value?.unobserve(element)
          }
        })
      },
      {
        threshold: 0.01, // 元素1%可见时触发（非常早触发）
        rootMargin: '0px 0px 400px 0px', // 提前400px触发（元素距离视口很远就开始动画）
      },
    )

    // 初始化所有需要滚动动画的元素
    setTimeout(() => {
      const elements = document.querySelectorAll('.scroll-animate')
      elements.forEach((element) => {
        const el = element as HTMLElement
        // 初始状态设为不可见
        el.style.opacity = '0'
        el.style.transform = 'translateY(30px)'
        el.style.transition = 'none'
        observer.value?.observe(el)
      })
    }, 100)
  }

  const addScrollAnimation = (element: HTMLElement, animation: string, delay?: string) => {
    element.classList.add('scroll-animate')
    element.dataset.animation = animation
    if (delay) {
      element.dataset.delay = delay
    }
    // 设置初始状态
    element.style.opacity = '0'
    element.style.transform = 'translateY(30px)'
    observer.value?.observe(element)
  }

  onMounted(() => {
    initScrollAnimation()
  })

  onUnmounted(() => {
    observer.value?.disconnect()
  })

  return {
    addScrollAnimation,
    initScrollAnimation,
  }
}
