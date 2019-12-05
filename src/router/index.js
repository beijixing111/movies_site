import Vue from 'vue'
import Router from 'vue-router' 
import Layer from '@/views/Layer'
import store from '@/store/index';  

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/', 
      component: Layer,
      redirect: '/index',
      children: [{
          path: 'index',
          component: () => import('@/views/Home')
        }, {
          path: 'movies', 
          component: () => import('@/views/Movies'),
          children: [
            { 
              path: ':id',
              component: () => import('@/views/Detail'),
              props: true
            }
          ]
        }, {
          path: 'pics', 
          component: () => import('@/views/Pics')
        }, {
          path: 'manager', 
          component: () => import('@/views/Manager'),
          redirect: '/manager/message',
          children: [{
              path: 'message',
              component: () => import('@/views/manager/Msgmanager')
            }, {
              path: 'movielist',
              component: () => import('@/views/manager/MovieList')
            }, {
              path: 'movieupload',
              component: () => import('@/views/manager/MovieUpload')
            }, {
              path: 'piclist',
              component: () => import('@/views/manager/PicList')
            }, {
              path: 'picupload',
              component: () => import('@/views/manager/PicUpload')
            }, {
              path: 'usermanager',
              component: () => import('@/views/manager/Usermanager')
            }, {
              path: '',
              component: () => import('@/views/manager/Advert')
            }
          ]
        }, {
          path: 'about', 
          component: () => import('@/views/About')
        }
      ]
    }, 
    {
      path: '/404',
      name: 'notfound',
      component: () => import('@/views/Notfound')
    }, {
      path: '*',    //放最底部
      redirect: '/404'
    }
  ]
})

router.beforeEach((to, from, next) => {
  console.log(to, from);
  console.log(store.state.userInfo);
  if(to.path.indexOf('/manager') > -1 && !store.state.userInfo.loginStatus) { 
    next({path: '/404'})
  }
  next();
})

export default router;