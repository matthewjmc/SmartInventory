import { wrapFunctional } from './utils'

export { default as AppHeader } from '../..\\components\\AppHeader.vue'
export { default as InventoryQuery } from '../..\\components\\InventoryQuery.vue'
export { default as LoginHeader } from '../..\\components\\LoginHeader.vue'
export { default as SearchByItem } from '../..\\components\\SearchByItem.vue'
export { default as SearchByUser } from '../..\\components\\SearchByUser.vue'
export { default as StatisticsQuery } from '../..\\components\\StatisticsQuery.vue'
export { default as UserHistory } from '../..\\components\\userHistory.vue'
export { default as VuetifyLogo } from '../..\\components\\VuetifyLogo.vue'
export { default as WithdrawQuery } from '../..\\components\\WithdrawQuery.vue'

export const LazyAppHeader = import('../..\\components\\AppHeader.vue' /* webpackChunkName: "components/app-header" */).then(c => wrapFunctional(c.default || c))
export const LazyInventoryQuery = import('../..\\components\\InventoryQuery.vue' /* webpackChunkName: "components/inventory-query" */).then(c => wrapFunctional(c.default || c))
export const LazyLoginHeader = import('../..\\components\\LoginHeader.vue' /* webpackChunkName: "components/login-header" */).then(c => wrapFunctional(c.default || c))
export const LazySearchByItem = import('../..\\components\\SearchByItem.vue' /* webpackChunkName: "components/search-by-item" */).then(c => wrapFunctional(c.default || c))
export const LazySearchByUser = import('../..\\components\\SearchByUser.vue' /* webpackChunkName: "components/search-by-user" */).then(c => wrapFunctional(c.default || c))
export const LazyStatisticsQuery = import('../..\\components\\StatisticsQuery.vue' /* webpackChunkName: "components/statistics-query" */).then(c => wrapFunctional(c.default || c))
export const LazyUserHistory = import('../..\\components\\userHistory.vue' /* webpackChunkName: "components/user-history" */).then(c => wrapFunctional(c.default || c))
export const LazyVuetifyLogo = import('../..\\components\\VuetifyLogo.vue' /* webpackChunkName: "components/vuetify-logo" */).then(c => wrapFunctional(c.default || c))
export const LazyWithdrawQuery = import('../..\\components\\WithdrawQuery.vue' /* webpackChunkName: "components/withdraw-query" */).then(c => wrapFunctional(c.default || c))
