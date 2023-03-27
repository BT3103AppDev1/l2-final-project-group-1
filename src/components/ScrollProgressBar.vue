<template>
    <div class="scroll-progress-bar-container" ref="container">
      <div class="scroll-progress-bar" :style="{ width: progressBarWidth + '%' }" @scroll="handleScroll"></div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        progressBarWidth: 0,
        containerHeight: 0,
      };
    },
    mounted() {
      window.addEventListener('scroll', this.updateProgressBar);
      this.containerHeight = this.$refs.container.clientHeight;
    },
    methods: {
      handleScroll() {
        const customScroll = this.$refs.querySelector(".custom-scroll"); 
        const customScrollTop = customScroll.scrollTop;
      },
      updateProgressBar() {
        const scrollPosition = window.pageYOffset;
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        const percentageScrolled = Math.floor((scrollPosition / maxScroll) * 100);
        this.progressBarWidth = percentageScrolled;
      },
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.updateProgressBar);
    },
  };
  </script>
  
  <style scoped>
  .scroll-progress-bar-container {
    position: fixed;
    top: 0;
    left: 0;
    height: 6px;
    width: 100%;
    background-color: var(--light);
    z-index: 9999;
  }
  
  .scroll-progress-bar {
    height: 100%; 
    background-image: linear-gradient(to right, var(--primary), var(--purple));
  }
  </style>
  
