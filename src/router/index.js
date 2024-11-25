// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/stores/user.store'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/Auth/LoginPage.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Auth/RegisterPage.vue'),
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/cadastraEspecie',
    name: 'CadastraEspecie',
    component: () => import('@/views/CadastraEspecie.vue'),
  },
  {
    path: '/editarEspecie/:id',
    params: true,
    props: true,
    name: 'EditarEspecie',
    component: () => import('@/views/EditarEspecie.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  if (!token && to.name !== 'Login' && to.name !== 'Register') {
    next({ name: 'Login' })
  } else if (to.name === 'Login' && token) {
    const session = localStorage.getItem('session')
    const userStore = useUserStore()
    if (session) {
      userStore.setUser(JSON.parse(session))
    }
    next({ name: 'Home' });
  } else {
    next()
  }
})

export default router;
