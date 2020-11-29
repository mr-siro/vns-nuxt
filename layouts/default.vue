<template>
  <div id="app">
    <div class="wrapper">
      <div class="wrapper-header">
        <DefaultHeader/>
      </div>
      <div class="wrapper-content">
        <Nuxt />
      </div>
      <div class="wrapper-footer">
        <div class="main-footer">
          <b-link target="_blank" href="https://play.google.com/store/apps/details?id=com.vnsocialmobile">
            <img alt="#" :src="chPlay" >
          </b-link>

          <em class="my-2">Phiên bản 0.0.2</em>
          <p style="font-size: 12px">Production with Nuxt js</p>
        </div>
      </div>
    </div>
    <BackToTop/>
  </div>
</template>

<script>
import DefaultHeader from '~/components/Header/DefaultHeader'
import {Images} from 'assets/Images'
import BackToTop from '@/components/button/BackToTop'
export default {
  created() {
    this.$store.dispatch('getUser');
  },
  data() {
    return {
      chPlay: Images.chPlay
    }
  },
  components:{
    DefaultHeader,
    BackToTop
  }
}
</script>
<style lang="scss">
@use "assets/css/base";

html {
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
h5, h6 {
  font-family: Arial,sans-serif;
}
.wrapper {
  @include base.wrapper
}
.wrapper-header, .wrapper-content, .wrapper-footer {
  grid-column: 1/3;
  width: 100%;
}
.wrapper-footer {
  background-color: base.$gray-c100;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
.main-footer {
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  img {
    max-width: 6rem;
  }
}
</style>
