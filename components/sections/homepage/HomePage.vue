<template>
<div class="home-wrapper">
  <b-container>
    <div class="top-content">this is top</div>
    <div class="main-content">
      <b-button variant="outline-success" @click="getPost">getData</b-button>
    </div>
  </b-container>
</div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'HomePage',
  data() {
    return {
      pageQuery:{
        currentPage:0,
        pageSize:3
      }
    }
  },
  methods:{
    getPost() {
      this.$store.dispatch('fetchAllPost', {
        currentPage:this.pageQuery.currentPage,
        pageSize:this.pageQuery.pageSize
      }).then(data => console.log(data))
      .catch(err => console.log(err))
    }
  }
}
</script>

<style lang="scss">
@use "assets/css/base";
.top-content {
  height: 300px;
  background-color: #D3DCE6;
  border: 5px solid;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
