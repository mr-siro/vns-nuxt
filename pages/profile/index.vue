<template>
  <main>
    <b-row v-if="user">
      <div class="col-md-5 left-profile">
      <el-card>
        <h5>Chức năng sắp ra mắt</h5>
      </el-card>
      </div>
      <div class="col-md-7 right-profile">
        <el-card>
          <CreatePost />
          <div class="main-post-profile">
            <div v-for="(item,index) in listMyPost" :key="index">
              <CardPost :item="item" />
            </div>
            <infinite-loading @infinite="infiniteHandler"  force-use-infinite-wrapper=".b-row">
              <div slot="spinner">
                <b-spinner variant="success" label="Spinning"></b-spinner>
              </div>
              <div slot="no-more">Hết rồi!!!</div>
            </infinite-loading>
          </div>
        </el-card>
      </div>
    </b-row>
  </main>
</template>

<script>
import CreatePost from '@/components/card/CreatePost'
import CardPost from '@/components/card/CardPost'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      pageQuery: {
        currentPage: 1,
        pageSize: 3
      }
    }
  },
  components: {
    CreatePost,
    CardPost
  },
  computed: {
    ...mapState({
      user: state => state.profile.user,
      listMyPost:state => state.post.myPost,
      token: state => state.auth.token
    })
  },
  methods:{
    async infiniteHandler($state) {
      await this.$axios.$get(`/mypost?currentPage=${this.pageQuery.currentPage}&pageSize=${this.pageQuery.pageSize}`,
        {
          headers: { Authorization: 'Bearer ' + this.token }
        })
        .then((data) => {
          if (data.posts.length) {
            this.pageQuery.currentPage += 1
            this.listMyPost.push(...data.posts)
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

</style>
