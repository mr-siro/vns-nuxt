const state = () => ({
  pagination: {
    currentPage: 0,
    pageSize: 3,
    pageCount: 0,
    count: 0
  },
  allPost: [],
  myPost: [],
  guestPost: []
})

const getters = {}

const mutations = {
  FETCH_ALL_POST(state, payload) {
    state.allPost = payload
  },
  FETCH_GUEST_POST(state, payload) {
    state.guestPost = payload
  },
  DELETE_POST(state, payload) {
    const indexAllPost = state.allPost.findIndex(item => item._id === payload._id)
    state.allPost.splice(indexAllPost, 1)
    const indexMyPost = state.myPost.findIndex(item => item._id === payload._id)
    state.myPost.splice(indexMyPost, 1)
  },
  LIKE(state, payload) {
    const newAllPost = state.allPost.map((item) => {
      if (item._id === payload._id) {
        return payload
      } else {
        return item
      }
    })
    const newMyPost = state.myPost.map((item) => {
      if (item._id === payload._id) {
        return payload
      } else {
        return item
      }
    })
    const newGuestPost = state.guestPost.map((item) => {
      if (item._id === payload._id) {
        return payload
      } else {
        return item
      }
    })
    state.allPost = newAllPost
    state.myPost = newMyPost
    state.guestPost = newGuestPost
  },
  UNLIKE(state, payload) {
    const newAllPost = state.allPost.map((item) => {
      if (item._id === payload._id) {
        return payload
      } else {
        return item
      }
    })
    const newMyPost = state.myPost.map((item) => {
      if (item._id === payload._id) {
        return payload
      } else {
        return item
      }
    })
    const newGuestPost = state.guestPost.map((item) => {
      if (item._id === payload._id) {
        return payload
      } else {
        return item
      }
    })
    state.allPost = newAllPost
    state.myPost = newMyPost
    state.guestPost = newGuestPost
  },

  CREATE_POST(state, payload) {
    state.allPost.unshift(payload)
    state.myPost.unshift(payload)
  },
  FETCH_MY_POST(state, payload) {
    state.myPost = payload
  }
}

const actions = {
  async fetchAllPost(context, payload) {
    //   const token = context.rootState.auth.token
    //
    // let data =  await this.$axios.$get(`/allpost?currentPage=${payload.currentPage}&pageSize=${payload.pageSize}`,
    //     {
    //       headers: { Authorization: 'Bearer ' + token }
    //     })
    context.commit('FETCH_ALL_POST', payload)
  },
  async fetchGuestPost(context, payload) {
    context.commit('FETCH_GUEST_POST',payload)
  },
  async fetchMyPost(context, payload) {
    // const token = context.rootState.auth.token
    // let data = await this.$axios.$get('/mypost', { headers: { Authorization: 'Bearer ' + token } })
    context.commit('FETCH_MY_POST',payload)
  },

  async deletePost(context, payload) {
    const token = context.rootState.auth.token
    await this.$axios.$delete(`/deletepost/${payload._id}`,
      { headers: { Authorization: 'Bearer ' + token } })
    context.commit('DELETE_POST', payload)
  },

  async likePost(context, payload) {
    const token = context.rootState.auth.token
    let data = await this.$axios.$put('/like', { postId: payload._id },
      {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
    context.commit('LIKE', data)
  },

  async unLikePost(context, payload) {
    const token = context.rootState.auth.token
    let data = await this.$axios.$put('/unlike', { postId: payload._id },
      {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
    context.commit('UNLIKE', data)
  },
  async createPost(context, payload) {
    const token = context.rootState.auth.token
    let data = await this.$axios.$post('/createpost', payload,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        }
      })
    context.commit('CREATE_POST', data.post)
  }
}

const postModule = {
  state,
  getters,
  mutations,
  actions
}

export default postModule
