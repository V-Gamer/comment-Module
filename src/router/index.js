import Vue from 'vue';
import Router from 'vue-router';

import comment1 from '../view/commentModule'

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/comment',
            name: '评论',
            component: comment1,
        },
    ]
})