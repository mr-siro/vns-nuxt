<template>
  <main>
    <el-card v-if="user">
      <b-row>
        <div class="col-md-6">
          <h5>Người theo dõi {{ user.followers.length }}</h5>
          <el-divider></el-divider>
          <h6 v-if="user.followers.length === 0">Chưa có người theo dõi</h6>
          <div v-else v-for="(item, index) in getFollower" :key="index">
            <CardFriend :route-id="item._id" :friend-image="item.avatar" :friend-name="item.name" />
          </div>
        </div>
        <div class="col-md-6">
          <h5>Đang theo dõi {{ user.following.length }}</h5>
          <el-divider></el-divider>
          <h6 v-if="user.following.length === 0">Bạn chưa theo dõi ai</h6>
          <div v-else v-for="(item, index) in getFollowing" :key="index">
            <CardFriend :route-id="item._id" :friend-image="item.avatar" :friend-name="item.name">
              <b-button @click="unFollow(item)" variant="outline-danger" size="sm">Bỏ theo dõi</b-button>
            </CardFriend>
          </div>
        </div>
      </b-row>
    </el-card>
  </main>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import CardFriend from '@/components/card/CardFriend'

export default {
  name: 'friend',
  components: {
    CardFriend
  },
  computed: {
    ...mapState({
      user: state => state.profile.user
    }),
    ...mapGetters(['getFollower', 'getFollowing'])
  },
  methods: {
    ...mapActions(['unFollow']),
  }
}
</script>

<style lang="scss">

</style>
