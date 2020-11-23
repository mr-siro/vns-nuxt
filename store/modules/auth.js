import { TOKEN } from 'assets/constants'
import Cookies from 'js-cookie'

const state = () => ({
  token: null,
  message: null,
  user:null
})

const getters = {
  isAuth(state) {
    return state.token != null
  }
}

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
  },
  SIGN_UP(state, payload) {
    state.message = payload
  },
  SET_USER(state,payload) {
    state.user = payload
  },
  CLEAR_TOKEN(state) {
    state.token = null
  }
}

const actions = {
  async login({ commit }, payload) {
    const { data } = await this.$axios
      .post('/signin', payload, { headers: { 'Content-Type': 'application/json' } })
    localStorage.setItem(TOKEN, data.token)
    Cookies.set(TOKEN, data.token)
    commit('SET_TOKEN', data.token)
  },
  async signUp({ commit }, payload) {
    const { data } = await this.$axios
      .post('/signup', payload, { headers: { 'Content-Type': 'application/json' } })
    commit('SIGN_UP', data)
  },

  initAuth({ commit }, req) {
    let token;
    if (req) {
      if (!req.headers.cookie) return false
      const tokenKey = req.headers.cookie.split(';').find(c => c.trim().startsWith('TOKEN='))
      if (!tokenKey) return false
      token = tokenKey.split('=')[1]
    } else {
      token = localStorage.getItem(TOKEN)
    }
    commit('SET_TOKEN', token)
  },
 async getUser(context) {
    const token = context.rootState.auth.token
    const {data} = await this.$axios.get('/me',{ headers: { Authorization: "Bearer " + token } })
   context.commit('SET_USER',data.user)
  },
  logout(context){
  Cookies.remove(TOKEN);
  localStorage.removeItem(TOKEN)
    context.commit('CLEAR_TOKEN')
  }
}

const authModule = {
  state,
  getters,
  mutations,
  actions
}

export default authModule
