import Vue from 'vue'

const components = {
  AppHeader: () => import('../../components/AppHeader.vue' /* webpackChunkName: "components/app-header" */).then(c => c.default || c),
  InventoryQuery: () => import('../../components/InventoryQuery.vue' /* webpackChunkName: "components/inventory-query" */).then(c => c.default || c),
  LoginHeader: () => import('../../components/LoginHeader.vue' /* webpackChunkName: "components/login-header" */).then(c => c.default || c),
  UserAuthForm: () => import('../../components/UserAuthForm.vue' /* webpackChunkName: "components/user-auth-form" */).then(c => c.default || c),
  VuetifyLogo: () => import('../../components/VuetifyLogo.vue' /* webpackChunkName: "components/vuetify-logo" */).then(c => c.default || c),
  WithdrawQuery: () => import('../../components/WithdrawQuery.vue' /* webpackChunkName: "components/withdraw-query" */).then(c => c.default || c)
}

for (const name in components) {
  Vue.component(name, components[name])
  Vue.component('Lazy' + name, components[name])
}
