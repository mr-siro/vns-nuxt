import Vuex from 'vuex'
import authModule from '~/store/modules/auth'
import postModule from '@/store/modules/post'
import userModule from '@/store/modules/user'
const createStore = () => {
  return new Vuex.Store({
    modules: {
      auth: authModule,
      post: postModule,
      profile:userModule
    }
  })
}

export default createStore
