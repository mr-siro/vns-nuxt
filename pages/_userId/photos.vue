<template>
  <main>
    <b-container>
      <div class="photo-user-wrapper d-flex flex-wrap justify-content-center">
        <div class="m-1" v-for="(item,index) in listData" :key="index">
          <b-img class="img-item"  v-if="item.photo" thumbnail fluid :src="item.photo" alt="#"></b-img>
        </div>
      </div>
    </b-container>
  </main>
</template>

<script>
export default {
  name: 'photos',
  data() {
    return {
      listData:[]
    }
  },
  created() {
    this.listData = this.$store.state.post.guestPost
  }
}
</script>

<style lang="scss">
.img-item {
  width: 15rem;
  height: 15rem;
}
@media only screen and (max-width: 767px) {
  .img-item {
    max-width: 5rem;
    max-height: 5rem;
  }
}
</style>
