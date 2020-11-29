const state = () => ({
  user: null,
  guestProfile:null
})

const getters = {
  getFollower(state) {
    return state.user.followers
  },
  getFollowing(state) {
    return state.user.following
  },
}

const mutations = {
  SET_USER(state, payload) {
    state.user = payload
  },
  FOLLOW(state,payload) {
     state.user.following.push(payload)
  },
  UNFOLLOW(state,payload) {
    const index = state.user.following.findIndex(item => item._id === payload._id)
    state.user.following.splice(index,1)
  },
  SET_GUEST_PROFILE(state,payload) {
    state.guestProfile = payload
  }
}

const actions = {
  async getUser(context) {
    const token = context.rootState.auth.token
    let data = await this.$axios.$get('/me', { headers: { Authorization: 'Bearer ' + token } })
    context.commit('SET_USER', data.user)
  },

  async upDateAvt(context, payload) {
    const token = context.rootState.auth.token
    let data = await this.$axios.$put('/updateavatar', payload,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        }
      })
    context.commit('SET_USER', data)
  },
  async editAboutMe(context, payload) {
    const token = context.rootState.auth.token
    let data = await this.$axios.$put('/updateaboutme', payload,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        }
      })
    context.commit('SET_USER', data)
  },

  async upDateBackground(context, payload) {
    const token = context.rootState.auth.token
    let data = await this.$axios.$put('/updatecoverphoto', payload,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        }
      })
    context.commit('SET_USER', data)
  },

  async editProfile(context, payload) {
    const token = context.rootState.auth.token
    let data = await this.$axios.$put('/updateprofile', payload,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        }
      }
    )
    context.commit('SET_USER', data)
  },
  async unFollow(context, payload) {
    const token = context.rootState.auth.token
    let data = await this.$axios.$put('/unfollow',{unfollowId:payload._id},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        }
      })
    context.commit('UNFOLLOW', payload)
  },
  async follow(context, payload) {
    const token = context.rootState.auth.token
    let data = await this.$axios.$put('/follow',{followId:payload._id},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        }
      })
    console.log(payload)
    context.commit('FOLLOW', payload)
  },
  async fetchGuestProfile(context,payload) {
    const token = context.rootState.auth.token
    let data = await this.$axios.$get(`/user/${payload}`,
      { headers: { Authorization: 'Bearer ' + token } }
      )
    context.commit('SET_GUEST_PROFILE',data.user)
    // context.commit('FETCH_GUEST_POST',data.posts)
  }
}

const userModule = {
  state,
  getters,
  mutations,
  actions
}
export default userModule
