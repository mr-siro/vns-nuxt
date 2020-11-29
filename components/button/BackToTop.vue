<template>
  <div>
    <transition name="back-to-top-fade">
      <el-button
        class="vue-back-to-top"
        :style="`bottom:${this.bottom};right:${this.right};`"
        v-show="visible" @click="backToTop"
        type="success" icon="el-icon-caret-top"
        circle></el-button>
    </transition>
  </div>
</template>

<script>
export default {
name: "BackToTop",
  props: {
    title: {
      type: String,
      default: 'text'
    },
    visibleoffset: {
      type: [String, Number],
      default: 600
    },
    right: {
      type: String,
      default: '30px',
    },
    bottom: {
      type: String,
      default: '40px',
    },
  },
  data () {
    return {
      visible: false
    }
  },
  mounted () {
    window.smoothscroll = () => {
      let currentScroll = document.documentElement.scrollTop || document.body.scrollTop
      if (currentScroll > 0) {
        window.requestAnimationFrame(window.smoothscroll)
        window.scrollTo(0, Math.floor(currentScroll - (currentScroll / 5)))
      }
    }
    window.addEventListener('scroll', this.catchScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.catchScroll)
  },
  methods: {
    catchScroll () {
      this.visible = (window.pageYOffset > parseInt(this.visibleoffset))
    },

    backToTop () {
      window.smoothscroll()
      this.$emit('scrolled');
    }
  }
}
</script>

<style>
.back-to-top-fade-enter-active, .back-to-top-fade-leave-active {
  transition: opacity .7s;
}
.back-to-top-fade-enter, .back-to-top-fade-leave-to{
  opacity: 0;
}

.vue-back-to-top{
  position: fixed;
  z-index: 1000;
  cursor:pointer;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
}

.vue-back-to-top .default {
  width: 40px;
  color: #ffffff;
  text-align: center;
  line-height: 30px;
  background-color: #f5c85c;
  border-radius: 10px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.vue-back-to-top .default span{
  color:#ffffff;
}
</style>
