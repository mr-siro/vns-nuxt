import Vuex from 'vuex'
import authModule from '~/store/modules/auth'
import postModule from '@/store/modules/post'
const createStore = () => {
  return new Vuex.Store({
    modules: {
      auth: authModule,
      post: postModule
    }
  })
}

export default createStore
