<template>
  <div>
    <HomePage />
  </div>
</template>

<script>
import HomePage from '@/components/sections/homepage/HomePage'

export default {
  layout: 'default',
  components: {
    HomePage
  }
}
</script>

<style lang="scss">
@use "assets/css/base";
h5 {
  font-family: Arial,sans-serif;
}
</style>
