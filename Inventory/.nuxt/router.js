import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _066e31fc = () => interopDefault(import('../pages/deposit.vue' /* webpackChunkName: "pages/deposit" */))
const _00e0cc3a = () => interopDefault(import('../pages/inventory.vue' /* webpackChunkName: "pages/inventory" */))
const _031e3272 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _0d8f6eb4 = () => interopDefault(import('../pages/query.vue' /* webpackChunkName: "pages/query" */))
const _6e41f594 = () => interopDefault(import('../pages/rental.vue' /* webpackChunkName: "pages/rental" */))
const _19bf399c = () => interopDefault(import('../pages/withdraw.vue' /* webpackChunkName: "pages/withdraw" */))
const _34c943b0 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/deposit",
    component: _066e31fc,
    name: "deposit"
  }, {
    path: "/inventory",
    component: _00e0cc3a,
    name: "inventory"
  }, {
    path: "/login",
    component: _031e3272,
    name: "login"
  }, {
    path: "/query",
    component: _0d8f6eb4,
    name: "query"
  }, {
    path: "/rental",
    component: _6e41f594,
    name: "rental"
  }, {
    path: "/withdraw",
    component: _19bf399c,
    name: "withdraw"
  }, {
    path: "/",
    component: _34c943b0,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config.app && config.app.basePath) || routerOptions.base
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
