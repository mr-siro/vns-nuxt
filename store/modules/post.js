const state = () => ({
  pagination: {
    currentPage: 0,
    pageSize: 3,
    pageCount: 0
  },
  allPost: [],
  myPost: []
})

const getters = {}

const mutations = {
  FETCH_ALL_POST(state, payload) {
    state.allPost = payload.listData;
    state.pagination.currentPage = payload.currentPage;
    state.pagination.pageSize = payload.pageSize;
    state.pagination.pageCount = payload.count;
  }
}

const actions = {
  async fetchAllPost(context, payload) {
    const token = context.rootState.auth.token
    let listData = [];
    let currentPage,pageCount,pageSize,count;
    const { data } = await this.$axios
      .get(`/allpost?currentPage=${payload.currentPage}&pageSize=${payload.pageSize}`,
        { headers: { Authorization: 'Bearer ' + token } })
    listData = listData.concat(data.posts)
    currentPage = data.pagination.currentPage;
    pageCount = data.pagination.pageCount;
    pageSize = data.pagination.pageSize;
    count = data.pagination.count;
    context.commit('FETCH_ALL_POST', {listData,currentPage,pageCount,pageSize,count})
  }
}

const postModule = {
  state,
  getters,
  mutations,
  actions
}

export default postModule
