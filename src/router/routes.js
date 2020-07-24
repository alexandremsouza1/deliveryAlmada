const routes = [
  {
    path: '/',
    component: () => import('src/components/Goods.vue'),
    children: [
      { path: 'goods', component: () => import('src/components/Goods.vue') },
      { path: '/ratings', component: () => import('components/Ratings.vue') },
      { path: '/seller', component: () => import('components/Seller.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
