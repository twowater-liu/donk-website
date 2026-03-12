const carousel = {
    currentIndex: 0,
    items: document.querySelectorAll('.carousel-item'),
    dots: document.querySelectorAll('.dot'),
    totalItems: document.querySelectorAll('.carousel-item').length,
    autoPlayInterval: null,

    init() {
        // 绑定事件
        document.querySelector('.prev').addEventListener('click', () => this.prev());
        document.querySelector('.next').addEventListener('click', () => this.next());
        
        // 小圆点点击
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goTo(index));
        });

        // 自动轮播
        this.startAutoPlay();

        // 鼠标悬停时暂停
        document.querySelector('.carousel-container').addEventListener('mouseenter', () => this.stopAutoPlay());
        document.querySelector('.carousel-container').addEventListener('mouseleave', () => this.startAutoPlay());
    },

    goTo(index) {
        // 移除所有active类
        this.items.forEach(item => item.classList.remove('active'));
        this.dots.forEach(dot => dot.classList.remove('active'));

        // 激活当前项
        this.items[index].classList.add('active');
        this.dots[index].classList.add('active');
        this.currentIndex = index;
    },

    next() {
        let index = this.currentIndex + 1;
        if (index >= this.totalItems) index = 0;
        this.goTo(index);
    },

    prev() {
        let index = this.currentIndex - 1;
        if (index < 0) index = this.totalItems - 1;
        this.goTo(index);
    },

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => this.next(), 5000); // 5秒切换
    },

    stopAutoPlay() {
        clearInterval(this.autoPlayInterval);
    }
};

// 初始化轮播图
document.addEventListener('DOMContentLoaded', () => carousel.init());
// 核心元素获取
const welcomeModal = document.getElementById('welcomeModal');
const musicModal = document.getElementById('musicModal');
const thanksModal = document.getElementById('thanksModal');
const welcomeBtn = document.getElementById('welcomeBtn');
const musicBtn = document.getElementById('musicBtn');
const thanksBtn = document.getElementById('thanksBtn');

// 1. 页面加载完成自动弹出欢迎窗
window.onload = function() {
  welcomeModal.classList.remove('hidden');
};

// 2. 点击欢迎窗确认 → 弹出音乐提示窗
welcomeBtn.addEventListener('click', function() {
  welcomeModal.classList.add('hidden');
  // 延迟500ms弹出，体验更流畅
  setTimeout(() => {
    musicModal.classList.remove('hidden');
  }, 500);
});

// 3. 点击音乐提示窗 → 关闭弹窗
musicBtn.addEventListener('click', function() {
  musicModal.classList.add('hidden');
});

// 4. 页面滚动到底部 OR 停留30秒后弹出感谢窗（二选一，可按需调整）
// 方式A：滚动到底部触发
window.addEventListener('scroll', function() {
  // 判断是否滚动到底部
  const isBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100;
  if (isBottom && !thanksModal.classList.contains('show')) {
    thanksModal.classList.remove('hidden');
    thanksModal.classList.add('show'); // 标记已弹出，避免重复触发
  }
});

// 方式B：页面加载后30秒自动触发（注释掉方式A，启用此段即可）
// setTimeout(() => {
//   thanksModal.classList.remove('hidden');
// }, 30000); // 30000 = 30秒

// 5. 点击感谢窗按钮 → 关闭弹窗
thanksBtn.addEventListener('click', function() {
  thanksModal.classList.add('hidden');
});