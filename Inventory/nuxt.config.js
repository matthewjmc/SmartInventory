import colors from 'vuetify/es5/util/colors'

export default {
  server: {
    host: '0.0.0.0' 
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - CIE Inventory',
    title: 'Inventory',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],


  
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
  ],
  axios: {
    baseURL: 'https://api.iotdev.mcmullin.org/'
  },
  auth: {
    redirect:{
      login: '/login',
      logout: '/',
      home: '/inventory',
    },
    strategies:{
        local: {
          token:{
            property: 'accessToken',
            type: 'Bearer'
          },
          endpoints:{
            user: {
              property: false, // here should be `false`, as you defined in user endpoint `propertyName`
              autoFetch: true
            },
            login: { 
              headers: { 'Content-Type': 'application/json' },
              url: '/auth/login', 
              method: 'post',  
              propertyName: 'accessToken'
            },
            logout: {
              headers: { 'Content-Type': 'application/json' },
              url: '/auth/logout',
              method: 'delete'
            },
            user:{
              headers: { 'Content-Type': 'application/json'},
              url: '/auth/user/info', 
              method: 'post', 
              propertyName: 'userInfo'
            },
          },
        }
      }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
