import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _361d3618 = () => interopDefault(import('..\\pages\\inventory.vue' /* webpackChunkName: "pages/inventory" */))
const _1ab8efa5 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _5a195ec4 = () => interopDefault(import('..\\pages\\withdraw\\index.vue' /* webpackChunkName: "pages/withdraw/index" */))
const _0fbbf6e3 = () => interopDefault(import('..\\pages\\withdraw\\itemQuery\\_id.vue' /* webpackChunkName: "pages/withdraw/itemQuery/_id" */))
const _919c74ca = () => interopDefault(import('..\\pages\\withdraw\\userQuery\\_id.vue' /* webpackChunkName: "pages/withdraw/userQuery/_id" */))
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
    path: "/login",
    component: _1ab8efa5,
    name: "login"
  }, {
    path: "/withdraw",
    component: _5a195ec4,
    name: "withdraw"
  }, {
    path: "/withdraw/itemQuery/:id?",
    component: _0fbbf6e3,
    name: "withdraw-itemQuery-id"
  }, {
    path: "/withdraw/userQuery/:id?",
    component: _919c74ca,
    name: "withdraw-userQuery-id"
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
