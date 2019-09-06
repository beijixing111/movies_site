import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home' 

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/', 
      component: Home
    },
    {
      path: '/movies', 
      component: () => import('@/views/Movies'),
      children: [
        { 
          path: ':id',
          component: () => import('@/views/Detail'),
          props: true
        }
      ]
    }, 
    {
      path: '/pics', 
      component: () => import('@/views/Pics')
    },
    {
      path: '/manager', 
      component: () => import('@/views/Manager'),
      redirect: '/manager/message',
      children: [  
        {
          path: 'message',
          component: () => import('@/views/manager/Msgmanager')
        },
        {
          path: 'movielist',
          component: () => import('@/views/manager/MovieList')
        },
        {
          path: 'movieupload',
          component: () => import('@/views/manager/MovieUpload')
        },
        {
          path: 'piclist',
          component: () => import('@/views/manager/PicList')
        },
        {
          path: 'picupload',
          component: () => import('@/views/manager/PicUpload')
        },
        {
          path: 'usermanager',
          component: () => import('@/views/manager/Usermanager')
        }
      ]
    },
    {
      path: '/about', 
      component: () => import('@/views/About')
    },
  ]
})
