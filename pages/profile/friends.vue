<template>
  <main>
    <el-card v-if="user">
<b-row>
  <div class="col-md-6">
    <h5>Người theo dõi {{user.followers.length}}</h5>
    <el-divider></el-divider>
    <div v-for="(item, index) in getFollower" :key="index">
      <CardFriend :friend-image="item.avatar" :friend-name="item.name" />
    </div>
  </div>
  <div class="col-md-6">
    <h5>Đang theo dõi {{user.following.length}}</h5>
    <el-divider></el-divider>
    <div v-for="(item, index) in getFollowing" :key="index">
      <CardFriend :friend-image="item.avatar" :friend-name="item.name">
        <b-button @click="unFollow(item)" variant="outline-danger" size="sm">Bỏ theo dõi</b-button>
      </CardFriend>
    </div>
  </div>
</b-row>
    </el-card>
  </main>
</template>

<script>
import { mapState, mapGetters,mapActions } from 'vuex'
import CardFriend from '@/components/card/CardFriend'
export default {
name: "friend",
  components: {
  CardFriend
  },
  computed: {
    ...mapState({
      user: state => state.profile.user
    }),
   ...mapGetters(['getFollower', 'getFollowing'])
  },
  methods:{
 ...mapActions(['unFollow'])
  }
}
</script>

<style lang="scss">

</style>
