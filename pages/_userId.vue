<template>
  <div v-if="guestProfile" class="profile-wrapper">
    <b-container class="py-3">
      <div :style="{ backgroundImage: `url(${guestProfile.coverPhoto})` }" class="top-profile">
        <div class="avt-user">
          <img alt="#" :src="guestProfile.avatar">
        </div>
      </div>
      <div class="view-name-profile my-4">
        <h3>{{ guestProfile.name }}</h3>
        <p style="word-break: break-all; white-space: normal">{{ guestProfile.aboutMe }}</p>

        <b-button @click="handleFollow"  pill variant="success">{{getTitleBtn}}</b-button>
      </div>
      <el-divider></el-divider>
      <div class="profile-nav">
        <el-menu :default-active="'1'" mode="horizontal">
          <el-menu-item @click="$router.push(`/${$route.params.userId}`)" index="1">Bài viết</el-menu-item>
          <el-menu-item @click="$router.push(`/${$route.params.userId}/about`)" index="2">Giới thiệu</el-menu-item>
          <el-menu-item @click="$router.push(`/${$route.params.userId}/friends`)" index="3">Bạn bè</el-menu-item>
          <el-menu-item @click="$router.push(`/${$route.params.userId}/photos`)" index="4">Ảnh</el-menu-item>
        </el-menu>
      </div>
      <div class="content-profile">
        <nuxt-child />
      </div>
    </b-container>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {

  created() {
    this.$store.dispatch('fetchGuestProfile', this.$route.params.userId)
  },
  data() {
  return {
  }
  },
  computed: {
    ...mapState({
      guestProfile: state => state.profile.guestProfile,
      user: state => state.profile.user
    }),
    isFollowing() {
      return this.user.following.includes(this.$route.params.userId)
    },
    getTitleBtn() {
       const filteredData = this.user.following.find(item => item._id === this.$route.params.userId)
      if(filteredData) {
        return 'Bỏ theo dõi'
      } else {
        return 'Theo dõi'
      }
    }
  },
  methods: {
    ...mapActions(['follow', 'unFollow']),

    handleFollow() {
      const filteredData = this.user.following.find(item => item._id === this.$route.params.userId)
      if (this.user.following.includes(filteredData)) {

        this.unFollow(this.guestProfile)
      } else {

        this.follow(this.guestProfile)
      }
    }
  }
}
</script>

<style lang="scss">
.profile-wrapper {
  background: linear-gradient(0deg, rgba(183, 223, 163, 1) 35%, rgba(255, 255, 255, 1) 100%);
  padding-bottom: 1rem;
}

.top-profile {
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 25rem;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

@media only screen and (max-width: 767px) {
  .top-profile {
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    max-height: 10rem;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  .avt-user {
    img {
      max-width: 5rem;
      max-height: 5rem;

    }
  }
}

.avt-user {
  button#btn-avt {
    position: relative;
    right: 12%;
  }

  img {
    width: 10rem;
    height: 10rem;
    border-radius: 50%;
    border: 5px solid;
    position: relative;
    top: 0.5rem;
  }
}

.view-name-profile {
  line-height: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h3 {
    font-weight: 600;
  }
}

.wrap-about {
  margin-top: 1rem;
}

.content-profile {
  margin-top: 1rem;
}

.up-cover {
  position: relative;
  top: 1rem;
}
</style>
