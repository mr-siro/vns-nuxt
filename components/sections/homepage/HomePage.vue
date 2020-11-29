<template>
  <div class="home-wrapper">
    <b-container style="max-width: 40rem">
      <div class="top-content">
        <CreatePost />
      </div>
      <div class="main-content">
        <div v-for="(item, index) in listAllPost" :key="index">
          <CardPost :item="item" />
        </div>
        <infinite-loading @infinite="infiniteHandler" force-use-infinite-wrapper=".b-container">
          <div slot="spinner">
            <b-spinner variant="success" label="Spinning"></b-spinner>
          </div>
          <div slot="no-more">Hết rồi!!!</div>
        </infinite-loading>
      </div>
    </b-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CardPost from '@/components/card/CardPost'
import CreatePost from '@/components/card/CreatePost'
import InfiniteLoading from 'vue-infinite-loading'

export default {
  name: 'HomePage',
  components: {
    CardPost,
    CreatePost,
    InfiniteLoading
  },
  data() {
    return {
      pageQuery: {
        currentPage: 1,
        pageSize: 3
      }
    }
  },
  computed: {
    ...mapState({
      listAllPost: state => state.post.allPost,
      token: state => state.auth.token
    })
  },

  methods: {
    async infiniteHandler($state) {
      await this.$axios.$get(`/allpost?currentPage=${this.pageQuery.currentPage}&pageSize=${this.pageQuery.pageSize}`,
        {
          headers: { Authorization: 'Bearer ' + this.token }
        })
        .then((data) => {
          if (data.posts.length) {
            this.pageQuery.currentPage += 1
            this.listAllPost.push(...data.posts)
            $state.loaded()
          } else {
            $state.complete()
          }
        })
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
