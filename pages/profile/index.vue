<template>
  <main>
    <b-row v-if="user">
      <div class="col-md-5 left-profile">
      <el-card></el-card>
      </div>
      <div class="col-md-7 right-profile">
        <el-card>
          <CreatePost />
          <div class="main-post-profile" v-if="mapMyPost">
            <div v-for="(item,index) in mapMyPost" :key="index">
              <CardPost :item="item" />
            </div>
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
  created() {
    this.$store.dispatch('fetchMyPost')
  },

  data() {
    return {
      listMyPost:[]
    }
  },
  components: {
    CreatePost,
    CardPost,
  },
  computed: {
    ...mapState({
      user: state => state.profile.user
    }),
    mapMyPost() {
      return this.listMyPost = this.$store.state.post.myPost
    },
  },
}
</script>

<style lang="scss">
@use "assets/css/base";

</style>
