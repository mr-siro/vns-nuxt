export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'VNS',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/logo.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Goldman:wght@700&display=swap' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    'element-ui/lib/theme-chalk/index.css'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '@/plugins/element-ui'
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'bootstrap-vue/nuxt',
    'nuxt-fontawesome',
    '@nuxtjs/proxy'
  ],

  fontawesome: {
    imports: [
      {
        set: '@fortawesome/free-solid-svg-icons',
        icons: ['fas']
      }
    ]
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: process.env.API_ENDPOINT || 'https://vnsapi.herokuapp.com',
    proxy: true
  },
  proxy: {
    '/signin': process.env.API_ENDPOINT || 'https://vnsapi.herokuapp.com',
    '/signup': process.env.API_ENDPOINT || 'https://vnsapi.herokuapp.com',
    '/me': process.env.API_ENDPOINT || 'https://vnsapi.herokuapp.com',
    '/allpost':process.env.API_ENDPOINT || 'https://vnsapi.herokuapp.com',
    '/mypost':process.env.API_ENDPOINT || 'https://vnsapi.herokuapp.com',
  },
  //
  router: {
    middleware: ['check-auth', 'auth']
  },

  loading: {
    color: '#3BB873',
    height: '5px'
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: [/^element-ui/]
  }
}
