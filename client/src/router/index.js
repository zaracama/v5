import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import binView from '../views/binView.vue'
import CuisineListView from '../views/CuisineListView.vue'
import PageNotFoundView from '../views/PageNotFoundView.vue'
import AfterPaymentView from '../views/AfterPaymentView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/bin',
      name: 'bin',
      component: binView
    },
    {
      path: '/list',
      name: 'list',
      component: CuisineListView
    },
    {
      path: '/after-payment',
      name: 'after-payment',
      component: AfterPaymentView
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: PageNotFoundView
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isLogin = localStorage.access_token
  if (to.name === 'bin' && !isLogin) {
    next({name: 'home'})
  } else {
    next()
  }
})

export default router
