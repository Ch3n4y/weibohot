const detail = () => import('@/components/Detail')
const index = () => import('@/components/Index')
const NotFound = () => import('@/components/404.vue')

const routers = [
  {
    path: '/',
    name: 'index',
    component: index,
    meta: {
      keepAlive: true,
    }
  },
  {
    path: '/detail/:uuid',
    name: 'detail',
    component: detail,
    meta: {
      keepAlive: false, //此组件不需要被缓存
    }
  },
  {
    path: '*',
    component: NotFound,
    meta: {
      keepAlive: true,
    }
  }
]
export default routers