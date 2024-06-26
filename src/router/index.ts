import { createRouter, createWebHistory } from 'vue-router'

import Login from '@/views/Login/Index.vue'
import Home from '@/views/Home/Index.vue'
import Customers from '@/views/Customers/Index.vue'
import CustomerRegister from '@/views/Customers/CustomerRegister.vue'
import CustomerGeneralInfo from '@/views/Customers/CustomerGeneralInfo.vue'
import CustomerAppsRegister from '@/views/Customers/CustomerAppsRegister.vue'
import CustomerApps from '@/views/Customers/CustomerApps.vue'
import Users from '@/views/Users/Index.vue'
import Features from '@/views/Features/Index.vue'
import Plans from '@/views/Plans/Index.vue'
import PasswordReset from '@/views/PasswordReset/Index.vue'
import UserRegister from '@/views/Users/UserRegister.vue'
import PlanRegister from '@/views/Plans/PlanRegister.vue'
import Logs from '@/views/Logs/Index.vue'
import { UserService } from '@/services/UsersService'

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
    meta: {
      title: 'Login',
      requiresAuth: false,
    },
  },
  {
    path: '/passwordreset',
    name: 'passwordreset',
    component: PasswordReset,
    meta: {
      title: 'Redefinir Senha',
      requiresAuth: false,
    },
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: {
      title: 'Home',
      requiresAuth: true,
    },
  },
  {
    path: '/customers',
    name: 'customer',
    component: Customers,
    meta: {
      title: 'Clientes',
      requiresAuth: true,
    },
  },
  {
    path: '/customers/register',
    name: 'customerRegister',
    component: CustomerRegister,
    meta: {
      title: 'Cadastro de Clientes',
      requiresAuth: true,
    },
    children: [
      {
        path: 'generalInfo/:id?', component: CustomerGeneralInfo
      },
      {
        path: 'apps/:id?', component: CustomerApps,
      }
    ]
  },
  {
    path: '/customers/register/apps/register/:id?',
    name: 'appsRegister',
    component: CustomerAppsRegister,
    meta: {
      title: 'Registro de apps',
      requiresAuth: true,
    },
  },
  {
    path: '/users',
    name: 'users',
    component: Users,
    meta: {
      title: 'Usuários',
      requiresAuth: true,
    },
  },
  {
    path: '/users/register/:id?',
    name: 'usersregister',
    component: UserRegister,
    meta: {
      title: 'Cadastro de Usuários',
      requiresAuth: true,
    },
  },
  {
    path: '/features',
    name: 'features',
    component: Features,
    meta: {
      title: 'Funcionalidades',
      requiresAuth: true,
    },
  },
  {
    path: '/plans',
    name: 'plans',
    component: Plans,
    meta: {
      title: 'Planos',
      requiresAuth: true,
    },
  },
  {
    path: '/plans/register/:id?',
    name: 'plansregister',
    component: PlanRegister,
    meta: {
      title: 'Planos',
      requiresAuth: true,
    },
  },
  {
    path: '/logs',
    name: 'logs',
    component: Logs,
    meta: {
      title: 'Logs de Alteração',
      requiresAuth: true,
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  document.title = `Template | ${to.meta.title} | SmartOne`

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!UserService.isAuthenticated()) {
      next({ name: 'login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router