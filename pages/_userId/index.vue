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
          <div class="main-post-profile">
            <div v-for="(item,index) in listGuestPost" :key="index">
              <CardPost :item="item" />
            </div>
            <infinite-loading @infinite="infiniteHandler" force-use-infinite-wrapper=".b-row">
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
      listGuestPost:state => state.post.guestPost,
      guestProfile: state => state.profile.guestProfile,
      token: state => state.auth.token
    }),
  },
  methods:{
    async infiniteHandler($state) {
      await this.$axios.$get(
        `/getguestpost?postedBy=${this.guestProfile._id}&currentPage=${this.pageQuery.currentPage}&pageSize=${this.pageQuery.pageSize}`,
        {
          headers: { Authorization: 'Bearer ' + this.token }
        })
        .then((data) => {
          if (data.posts.length) {
            this.pageQuery.currentPage += 1
            this.listGuestPost.push(...data.posts)
            $state.loaded()
          } else {
            $state.complete()
          }
        })
    }
  }
}
</script>

<style >

</style>
