export { default as AppHeader } from '../../components/AppHeader.vue'
export { default as InventoryQuery } from '../../components/InventoryQuery.vue'
export { default as LoginHeader } from '../../components/LoginHeader.vue'
export { default as UserAuthForm } from '../../components/UserAuthForm.vue'
export { default as VuetifyLogo } from '../../components/VuetifyLogo.vue'
export { default as WithdrawQuery } from '../../components/WithdrawQuery.vue'

export const LazyAppHeader = import('../../components/AppHeader.vue' /* webpackChunkName: "components/app-header" */).then(c => c.default || c)
export const LazyInventoryQuery = import('../../components/InventoryQuery.vue' /* webpackChunkName: "components/inventory-query" */).then(c => c.default || c)
export const LazyLoginHeader = import('../../components/LoginHeader.vue' /* webpackChunkName: "components/login-header" */).then(c => c.default || c)
export const LazyUserAuthForm = import('../../components/UserAuthForm.vue' /* webpackChunkName: "components/user-auth-form" */).then(c => c.default || c)
export const LazyVuetifyLogo = import('../../components/VuetifyLogo.vue' /* webpackChunkName: "components/vuetify-logo" */).then(c => c.default || c)
export const LazyWithdrawQuery = import('../../components/WithdrawQuery.vue' /* webpackChunkName: "components/withdraw-query" */).then(c => c.default || c)
