import Vue from 'vue'
import { wrapFunctional } from './utils'

const components = {
  AppHeader: () => import('../..\\components\\AppHeader.vue' /* webpackChunkName: "components/app-header" */).then(c => wrapFunctional(c.default || c)),
  InventoryQuery: () => import('../..\\components\\InventoryQuery.vue' /* webpackChunkName: "components/inventory-query" */).then(c => wrapFunctional(c.default || c)),
  LoginHeader: () => import('../..\\components\\LoginHeader.vue' /* webpackChunkName: "components/login-header" */).then(c => wrapFunctional(c.default || c)),
  SearchByItem: () => import('../..\\components\\SearchByItem.vue' /* webpackChunkName: "components/search-by-item" */).then(c => wrapFunctional(c.default || c)),
  SearchByUser: () => import('../..\\components\\SearchByUser.vue' /* webpackChunkName: "components/search-by-user" */).then(c => wrapFunctional(c.default || c)),
  UserHistory: () => import('../..\\components\\userHistory.vue' /* webpackChunkName: "components/user-history" */).then(c => wrapFunctional(c.default || c)),
  VuetifyLogo: () => import('../..\\components\\VuetifyLogo.vue' /* webpackChunkName: "components/vuetify-logo" */).then(c => wrapFunctional(c.default || c)),
  WithdrawQuery: () => import('../..\\components\\WithdrawQuery.vue' /* webpackChunkName: "components/withdraw-query" */).then(c => wrapFunctional(c.default || c))
}

for (const name in components) {
  Vue.component(name, components[name])
  Vue.component('Lazy' + name, components[name])
}
