import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _679c3b59 = () => interopDefault(import('..\\pages\\administrator\\index.vue' /* webpackChunkName: "pages/administrator/index" */))
const _55cc5e50 = () => interopDefault(import('..\\pages\\history.vue' /* webpackChunkName: "pages/history" */))
const _361d3618 = () => interopDefault(import('..\\pages\\inventory.vue' /* webpackChunkName: "pages/inventory" */))
const _1ab8efa5 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _142f33ea = () => interopDefault(import('..\\pages\\statistics\\index.vue' /* webpackChunkName: "pages/statistics/index" */))
const _5c34aca9 = () => interopDefault(import('..\\pages\\statistics\\item_stat\\index.vue' /* webpackChunkName: "pages/statistics/item_stat/index" */))
const _0c8b08ab = () => interopDefault(import('..\\pages\\statistics\\login_history\\index.vue' /* webpackChunkName: "pages/statistics/login_history/index" */))
const _606f71ee = () => interopDefault(import('..\\pages\\administrator\\itemQuery\\_id.vue' /* webpackChunkName: "pages/administrator/itemQuery/_id" */))
const _07e540a6 = () => interopDefault(import('..\\pages\\administrator\\userQuery\\_id.vue' /* webpackChunkName: "pages/administrator/userQuery/_id" */))
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
    path: "/administrator",
    component: _679c3b59,
    name: "administrator"
  }, {
    path: "/history",
    component: _55cc5e50,
    name: "history"
  }, {
    path: "/inventory",
    component: _361d3618,
    name: "inventory"
  }, {
    path: "/login",
    component: _1ab8efa5,
    name: "login"
  }, {
    path: "/statistics",
    component: _142f33ea,
    name: "statistics"
  }, {
    path: "/statistics/item_stat",
    component: _5c34aca9,
    name: "statistics-item_stat"
  }, {
    path: "/statistics/login_history",
    component: _0c8b08ab,
    name: "statistics-login_history"
  }, {
    path: "/administrator/itemQuery/:id?",
    component: _606f71ee,
    name: "administrator-itemQuery-id"
  }, {
    path: "/administrator/userQuery/:id?",
    component: _07e540a6,
    name: "administrator-userQuery-id"
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
