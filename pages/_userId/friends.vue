<template>
  <main>
    <el-card v-if="guestProfile">
      <b-row>
        <div class="col-md-6">
          <h5>Người theo dõi {{listFollower.length}}</h5>
          <el-divider></el-divider>
          <h6 v-if="listFollower.length === 0">{{guestProfile.name}} chưa có người theo dõi</h6>
          <div v-else v-for="(item, index) in listFollower" :key="index">
            <CardFriend :route-id="item._id" :friend-image="item.avatar" :friend-name="item.name" >
              <b-button v-if="item._id !== user._id" @click="goToProfile(item._id)" variant="primary" size="sm">Xem trang cá nhân</b-button>
            </CardFriend>
          </div>
        </div>
        <div class="col-md-6">
          <h5>Đang theo dõi {{listFollowing.length}}</h5>
          <el-divider></el-divider>
          <h6 v-if="listFollowing.length === 0">{{guestProfile.name}} chưa theo dõi ai</h6>
          <div v-else v-for="(item, index) in listFollowing" :key="index">
            <CardFriend :route-id="item._id" :friend-image="item.avatar" :friend-name="item.name">
              <b-button v-if="item._id !== user._id" @click="goToProfile(item._id)" variant="primary" size="sm">Xem trang cá nhân</b-button>
            </CardFriend>
          </div>
        </div>
      </b-row>
    </el-card>
  </main>
</template>

<script>
import { mapState,mapActions } from 'vuex'
import CardFriend from '@/components/card/CardFriend'
export default {
name: "friend",
  components: {
    CardFriend
  },
  created() {
  if(this.guestProfile) {
    this.listFollower = this.guestProfile.followers;
    this.listFollowing = this.guestProfile.following
  }
  },
  data() {
    return {
      listFollower:[],
      listFollowing:[]
    }

  },
  computed: {
    ...mapState({
      user: state => state.profile.user,
      guestProfile: state => state.profile.guestProfile
    }),

  },
  methods:{
    goToProfile(routeId) {
      this.$router.push({params:{userId:routeId},path:`/${routeId}` })
    },

  }
}
</script>

<style scoped>

</style>
