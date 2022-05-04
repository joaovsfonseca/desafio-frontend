import { LocalStorage, Notify } from 'quasar'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    beforeEnter (to, from, next) {
      const user = LocalStorage.getItem('user')
      if (user) next()
      else {
        Notify.create({
          message: 'É necessário realizar o login para acessar esta página',
          type: 'warning',
          timeout: 3000
        })
        next('/')
      }
    },
    children: [
      { path: 'videos', component: () => import('pages/Videos.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
