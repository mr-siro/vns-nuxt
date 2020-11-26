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
    state.allPost = payload.listData
    state.pagination.currentPage = payload.currentPage
    state.pagination.pageSize = payload.pageSize
    state.pagination.pageCount = payload.pageCount
    state.pagination.count = payload.count
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

  CREATE_POST(state,payload){
    state.allPost.unshift(payload)
    state.myPost.unshift(payload)
  },
  FETCH_MY_POST(state,payload) {
    state.myPost = payload
  }
}

const actions = {
  async fetchAllPost(context, payload) {
    const token = context.rootState.auth.token
    let listData = []
    let currentPage, pageCount, pageSize, count
    let data = await this.$axios
      .$get(`/allpost?currentPage=${payload.currentPage}&pageSize=${payload.pageSize}`,
        { headers: { Authorization: 'Bearer ' + token } })
    listData = listData.concat(data.posts)
    currentPage = data.pagination.currentPage
    pageCount = data.pagination.pageCount
    pageSize = data.pagination.pageSize
    count = data.pagination.count
    context.commit('FETCH_ALL_POST', { listData, currentPage, pageCount, pageSize, count })
  },

  async fetchMyPost(context, payload) {
    const token = context.rootState.auth.token
    let data = await this.$axios.$get('/mypost',{ headers: { Authorization: 'Bearer ' + token } })
    context.commit('FETCH_MY_POST',data.posts)
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
    let data = await this.$axios.$post('/createpost',payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: 'Bearer ' + token
        }
      })
    context.commit('CREATE_POST',data.post)
  }
}

const postModule = {
  state,
  getters,
  mutations,
  actions
}

export default postModule
