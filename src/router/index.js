import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user.js'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import EditarView from '@/views/EditarView.vue'

const requireAuth = async(to, from, next) => {
  const userStore = useUserStore();
  userStore.loader = true;
  const user = await userStore.currentUser()
  if(user){
    next()
  } else {
    next('/login')
  }
  userStore.loader = false;
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      beforeEnter: requireAuth
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/editar/:id',
      name: 'editar',
      component: EditarView,
    }
  ],
})

export default router
