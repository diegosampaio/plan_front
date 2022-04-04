import { createWebHistory, createRouter } from 'vue-router'

const Usuarios = () => import('./components/ListaUsuarios')
const AddUsuarios = () => import('./components/AddUsuario')
const ShowUsuario = () => import('./components/Usuario')

const routes = [
  {
    path: '/',
    name: 'usuarios',
    component: Usuarios
  },
  {
    path: '/usuario/:id',
    name: 'show-usuario',
    component: ShowUsuario
  },
  {
    path: '/usuarios/add',
    name: 'add',
    component: AddUsuarios
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
