import { createRouter, createWebHistory } from 'vue-router'
import store from './store/store'

const routes = [
  {
    path: '/',
    redirect: 'Dashboard',
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('./views/Auth/Auth.vue'),
  },
  {
    path: '/setup',
    name: 'Setup',
    component: () => import('./views/Setup/Setup.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('./views/Login/Login.vue'),
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    redirect: { name: 'Payouts' },
    component: () => import('./views/Dashboard/Dashboard.vue'),
    children: [
      {
        path: 'payouts',
        name: 'Payouts',
        component: () => import('./views/Dashboard/views/Payouts/Payouts.vue'),
      },
      {
        path: 'referrals',
        name: 'Referrals',
        component: () => import('./views/Dashboard/views/Referrals/Referrals.vue'),
      },
    ],
  },
  {
    path: '/affiliate-link',
    name: 'AffiliateLink',
    component: () => import('./views/AffiliateLink/AffiliateLink.vue'),
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('./views/Settings/Settings.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: { name: 'Home' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

let isFirstRoute = true
router.beforeEach((to) => {
  if (isFirstRoute) {
    isFirstRoute = false
    store.commit('setContinueToRoute', to)
    return { name: 'Auth', query: to.query }
  }
  return true
})

export default router
