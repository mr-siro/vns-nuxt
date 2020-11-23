<template>
  <div id="app">
    <div class="wrapper">
      <div class="wrapper-header">
        <DefaultHeader/>
      </div>
      <div class="wrapper-content">
        <Nuxt />
      </div>
      <div class="wrapper-footer"></div>
    </div>
  </div>
</template>

<script>
import DefaultHeader from '~/components/Header/DefaultHeader'
export default {
  components:{
    DefaultHeader
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

.wrapper {
  @include base.wrapper
}
.wrapper-header, .wrapper-content, .wrapper-footer {
  grid-column: 1/3;
  width: 100%;
}
.wrapper-footer {
  background-color: bisque;
  height: 200px;
}
</style>
