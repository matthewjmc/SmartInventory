import { wrapFunctional } from './utils'

export { default as AppHeader } from '../..\\components\\AppHeader.vue'
export { default as InventoryQuery } from '../..\\components\\InventoryQuery.vue'
export { default as LoginHeader } from '../..\\components\\LoginHeader.vue'
export { default as LoginHistory } from '../..\\components\\loginHistory.vue'
export { default as LoginHistoryUser } from '../..\\components\\loginHistory_user.vue'
export { default as MostWithdrawnItem } from '../..\\components\\mostWithdrawnItem.vue'
export { default as SearchByItem } from '../..\\components\\SearchByItem.vue'
export { default as SearchByUser } from '../..\\components\\SearchByUser.vue'
export { default as SearchOverdueByItem } from '../..\\components\\SearchOverdueByItem.vue'
export { default as SearchOverdueByUser } from '../..\\components\\SearchOverdueByUser.vue'
export { default as UserHistory } from '../..\\components\\userHistory.vue'
export { default as UserOverdueHistory } from '../..\\components\\userOverdueHistory.vue'
export { default as WithdrawOverdueQuery } from '../..\\components\\withdrawOverdueQuery.vue'
export { default as WithdrawQuery } from '../..\\components\\WithdrawQuery.vue'

export const LazyAppHeader = import('../..\\components\\AppHeader.vue' /* webpackChunkName: "components/app-header" */).then(c => wrapFunctional(c.default || c))
export const LazyInventoryQuery = import('../..\\components\\InventoryQuery.vue' /* webpackChunkName: "components/inventory-query" */).then(c => wrapFunctional(c.default || c))
export const LazyLoginHeader = import('../..\\components\\LoginHeader.vue' /* webpackChunkName: "components/login-header" */).then(c => wrapFunctional(c.default || c))
export const LazyLoginHistory = import('../..\\components\\loginHistory.vue' /* webpackChunkName: "components/login-history" */).then(c => wrapFunctional(c.default || c))
export const LazyLoginHistoryUser = import('../..\\components\\loginHistory_user.vue' /* webpackChunkName: "components/login-history-user" */).then(c => wrapFunctional(c.default || c))
export const LazyMostWithdrawnItem = import('../..\\components\\mostWithdrawnItem.vue' /* webpackChunkName: "components/most-withdrawn-item" */).then(c => wrapFunctional(c.default || c))
export const LazySearchByItem = import('../..\\components\\SearchByItem.vue' /* webpackChunkName: "components/search-by-item" */).then(c => wrapFunctional(c.default || c))
export const LazySearchByUser = import('../..\\components\\SearchByUser.vue' /* webpackChunkName: "components/search-by-user" */).then(c => wrapFunctional(c.default || c))
export const LazySearchOverdueByItem = import('../..\\components\\SearchOverdueByItem.vue' /* webpackChunkName: "components/search-overdue-by-item" */).then(c => wrapFunctional(c.default || c))
export const LazySearchOverdueByUser = import('../..\\components\\SearchOverdueByUser.vue' /* webpackChunkName: "components/search-overdue-by-user" */).then(c => wrapFunctional(c.default || c))
export const LazyUserHistory = import('../..\\components\\userHistory.vue' /* webpackChunkName: "components/user-history" */).then(c => wrapFunctional(c.default || c))
export const LazyUserOverdueHistory = import('../..\\components\\userOverdueHistory.vue' /* webpackChunkName: "components/user-overdue-history" */).then(c => wrapFunctional(c.default || c))
export const LazyWithdrawOverdueQuery = import('../..\\components\\withdrawOverdueQuery.vue' /* webpackChunkName: "components/withdraw-overdue-query" */).then(c => wrapFunctional(c.default || c))
export const LazyWithdrawQuery = import('../..\\components\\WithdrawQuery.vue' /* webpackChunkName: "components/withdraw-query" */).then(c => wrapFunctional(c.default || c))
