import vueRouter from './router.js';
import Vue from 'vue';

Vue.use(vueRouter);

const rootComp = {
    template: '<div>这里是彦祖的空间</div>'
}

const picComp = {
    template: '<div>这里是彦祖的照片</div>'
}

const infoCom = {
    template: '<div>这里是彦祖的个人信息</div>'
}

const routes = [
    {
        path: '/',
        component:rootComp
    },
    {
        path: '/pic',
        component:picComp
    },
    {
        path: '/info',
        component:infoCom
    },
]

export default new vueRouter({
    routes
})

