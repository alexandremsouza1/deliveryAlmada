const routes = [
  {
    path: '/',
    component: () => import('src/components/Goods.vue'),
    children: [
      { name:'goods', path: 'goods', component: () => import('components/Goods.vue') },
      { name:'ratings', path: 'ratings', component: () => import('components/Ratings.vue') },
      { name:'seller', path: 'seller', component: () => import('components/Seller.vue') }
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
