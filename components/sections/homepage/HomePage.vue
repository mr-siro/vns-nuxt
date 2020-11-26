<template>
  <div class="home-wrapper">
    <b-container style="max-width: 40rem">
      <div class="top-content">
        <CreatePost/>
      </div>
      <b-spinner v-if="isLoading" variant="success" label="Spinning"></b-spinner>
      <div class="main-content">
          <div v-for="(item,index) in listAllPost" :key="index">
            <CardPost :item="item" />
          </div>
          <b-button @click="getPost" variant="outline-success">See more</b-button>
        </div>
    </b-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CardPost from '@/components/card/CardPost'
import CreatePost from '@/components/card/CreatePost'
export default {
  name: 'HomePage',
  components: {
    CardPost,
    CreatePost
  },
  data() {
    return {
      pageQuery: {
        currentPage: 0,
        pageSize: 3,
        loadMore: true,
      },
      isLoading:false
    }
  },
  computed: {
    ...mapState({
      listAllPost: state => state.post.allPost,
      totalPage: state => state.post.pagination.pageCount
    })
  },
  created() {
    this.isLoading = true
    this.$store.dispatch('fetchAllPost', {
      currentPage: this.pageQuery.currentPage,
      pageSize: this.pageQuery.pageSize
    }).then(() => {
      this.isLoading = false
    })
  },
  methods: {
    getPost() {
      if (this.pageQuery.currentPage <= this.totalPage) {
        this.$store.dispatch('fetchAllPost', {
          currentPage: this.pageQuery.currentPage++,
          pageSize: this.pageQuery.pageSize
        })
      }
    }
  }
}
</script>

<style lang="scss">
@use "assets/css/base";

.top-content {
  margin-top: 1rem;
}
</style>
