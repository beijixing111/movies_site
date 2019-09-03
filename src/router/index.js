import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Movies from '@/views/Movies'
import Pics from '@/views/Pics'
import About from '@/views/About'
import Detail from '@/views/Detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/', 
      component: Home
    },
    {
      path: '/movies', 
      component: Movies,
      children: [
        { 
          path: ':id',
          component: Detail
        }
      ]
    }, 
    {
      path: '/pics', 
      component: Pics
    },
    {
      path: '/about', 
      component: About
    },
  ]
})
