import Vue from 'vue'
import Router from 'vue-router'

import HomePage from '../components/home.vue';
import ProductDetail from '../components/product-detail.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'HomePage',
            component: HomePage
        },
        {
            path: '/product/:id',
            component: ProductDetail
        }

    ],
    // 让路由跳转到顶部
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
})
