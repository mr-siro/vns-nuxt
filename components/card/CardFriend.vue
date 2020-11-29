<template>
<div class="friend-wrapper mb-3">
  <div class="d-flex flex-row justify-content-between align-items-center friend-items">
    <div class="d-flex flex-row left-friend justify-content-center align-items-center m-2">
      <img @click="goToProfile(routeId)" alt="#" :src="friendImage">
      <h6 class="ml-2">{{friendName}}</h6>
    </div>
    <div class="right-friend mr-2">
      <slot></slot>
    </div>
  </div>
</div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
name: "CardFriend",
  props: {
    friendImage:{
      type:String
    },
    friendName:{
      type: String
    },
    routeId:{
      type:String
    }
  },
  computed: {
    ...mapState({
      user: state => state.profile.user
    })
  },
  methods:{
    goToProfile(routeId) {
      if(routeId !== this.user._id)
      {
        this.$router.push({params:{userId:routeId},path:`/${routeId}` })
      }
    },
  }
}
</script>

<style lang="scss">
.friend-wrapper {
  border-radius: 10px;
  -webkit-box-shadow: 1px 7px 21px 9px rgba(255,199,240,0.36);
  box-shadow: 1px 7px 21px 9px rgba(255,199,240,0.36);
}
.left-friend {
  img {
    width: 80px;
    height: 80px;
    border-radius: 10px;
    cursor: pointer;
  }
  h6 {
    font-weight: 600;
  }
}
</style>
