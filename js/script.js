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