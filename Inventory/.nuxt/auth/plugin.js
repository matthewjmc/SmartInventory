import Auth from './auth'

import './middleware'

// Active schemes
import scheme_3e2123be from './schemes/local.js'

export default function (ctx, inject) {
  // Options
  const options = {"resetOnError":false,"scopeKey":"scope","rewriteRedirects":true,"fullPathRedirect":false,"watchLoggedIn":true,"redirect":{"login":"/login","logout":"/","home":"/inventory","callback":"/login"},"vuex":{"namespace":"auth"},"cookie":{"prefix":"auth.","options":{"path":"/"}},"localStorage":{"prefix":"auth."},"token":{"prefix":"_token."},"refresh_token":{"prefix":"_refresh_token."},"defaultStrategy":"local","vuetify":{"customVariables":["~/assets/variables.scss"],"theme":{"dark":true,"themes":{"dark":{"primary":"#1976d2","accent":"#424242","secondary":"#ff8f00","info":"#26a69a","warning":"#ffc107","error":"#dd2c00","success":"#00e676"}}}},"build":{}}

  // Create a new Auth instance
  const $auth = new Auth(ctx, options)

  // Register strategies
  // local
  $auth.registerStrategy('local', new scheme_3e2123be($auth, {"endpoints":{"login":{"url":"/auth/login","method":"post","propertyName":"accessToken","headers":{"Content-Type":"application/json"}},"logout":{"url":"/auth/logout","method":"delete","headers":{"Content-Type":"application/json"}},"user":{"url":"/auth/user/info","method":"post","propertyName":"userInfo","headers":{"Content-Type":"application/json"}}},"token":{"property":"accessToken","type":"Bearer"},"cookie":{"options":{"secure":false}},"_name":"local"}))

  // Inject it to nuxt context as $auth
  inject('auth', $auth)
  ctx.$auth = $auth

  // Initialize auth
  return $auth.init().catch(error => {
    if (process.client) {
      console.error('[ERROR] [AUTH]', error)
    }
  })
}
