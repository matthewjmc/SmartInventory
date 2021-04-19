import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _361d3618 = () => interopDefault(import('..\\pages\\inventory.vue' /* webpackChunkName: "pages/inventory" */))
const _40ce971c = () => interopDefault(import('..\\pages\\item_withdraw.vue' /* webpackChunkName: "pages/item_withdraw" */))
const _1ab8efa5 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _15805184 = () => interopDefault(import('..\\pages\\query.vue' /* webpackChunkName: "pages/query" */))
const _2f522eba = () => interopDefault(import('..\\pages\\user_withdraw.vue' /* webpackChunkName: "pages/user_withdraw" */))
const _3c7f1bfe = () => interopDefault(import('..\\pages\\withdraw.vue' /* webpackChunkName: "pages/withdraw" */))
const _51114c8e = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/inventory",
    component: _361d3618,
    name: "inventory"
  }, {
    path: "/item_withdraw",
    component: _40ce971c,
    name: "item_withdraw"
  }, {
    path: "/login",
    component: _1ab8efa5,
    name: "login"
  }, {
    path: "/query",
    component: _15805184,
    name: "query"
  }, {
    path: "/user_withdraw",
    component: _2f522eba,
    name: "user_withdraw"
  }, {
    path: "/withdraw",
    component: _3c7f1bfe,
    name: "withdraw"
  }, {
    path: "/",
    component: _51114c8e,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
