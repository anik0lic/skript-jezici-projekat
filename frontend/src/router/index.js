import Vue from 'vue'
import VueRouter from 'vue-router'
import Pocetna from '../views/Pocetna.vue'
import Proizvodi from '../views/Proizvodi.vue'
import Proizvod from '../views/Proizvod.vue'
import Korpa from '../views/Korpa.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Korisnik from '../views/Korisnik.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Pocetna',
    component: Pocetna
  },
  {
    path: '/proizvodi',
    name: 'Proizvodi',
    component: Proizvodi
  },
  {
    path: '/proizvod/:id',
    name: 'Proizvod',
    component: Proizvod
  },
  {
    path: '/korpa',
    name: 'Korpa',
    component: Korpa
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/korisnik',
    name: 'Korisnik',
    component: Korisnik
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
