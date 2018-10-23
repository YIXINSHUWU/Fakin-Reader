import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: resolve => require(['components/home/home'], resolve),
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/categories',
      component: resolve => require(['components/categories/categories'], resolve),
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/rank',
      component: resolve => require(['components/rank/rank'], resolve),
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/bookLists',
      component: resolve => require(['components/bookLists/bookLists'], resolve),
      children: [
        {
          path: '/bookLists/:id',
          component: resolve => require(['common/booklist-detail'], resolve),
        }
      ],
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/categories/detail',
      component: resolve => require(['components/categories/category-detail'], resolve),
    },
    {
      path: '/rank/:id',
      component: resolve => require(['components/rank/rank-detail'], resolve),
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/search',
      component: resolve => require(['components/search/search-detail'], resolve),
    },
    {
      path: '/mybooks',
      component: resolve => require(['components/bookSelf/book-self'], resolve),
      meta: {
        keepAlive: false // 不需要被缓存
      }
    },
    {
      path: '/readBook/:id/',
      component: resolve => require(['common/readBook'], resolve),
      meta: {
        keepAlive: false // 不需要被缓存
      }
    },
    {
      path: '/book/:id',
      component: resolve => require(['common/book-detail'], resolve),
      meta: {
        keepAlive: true // 需要被缓存
      }
    }
  ]
})
