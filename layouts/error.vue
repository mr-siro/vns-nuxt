<template>
<div>
  <h1 v-if="error.statusCode === 404">Không tìm thấy trang</h1>
  <h1 v-else-if="error.statusCode >= 500">Server sập</h1>
  <h1 v-else>Có lỗi xảy ra :(</h1>
  <NuxtLink to="/">Quay lại trang chủ</NuxtLink>
</div>
</template>

<script>
export default {
name: "error.vue",
  props: ['error'],
  layout: 'error'
}
</script>

<style >

</style>
