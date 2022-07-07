import HomePage from './components/HomePage.vue'
import Dashboard from './views/Dashboard.vue'
import ProductS from './views/ProductS'
import Task from './views/Task'
import Reporting from './views/Reporting'
import User from './views/User'
import Support from './views/Support'
import Setting from './views/Setting'
import Login from './components/Login'
import VueRouter from 'vue-router'
import Vue from 'vue'
import { routerS } from './utils/constants'
import store from './store';
Vue.use(VueRouter)

const routes = [
    {
        //Redirection, used to point to which route to jump to as soon as the web page is opened
        path: '/',
        redirect: '/login'
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('./components/register'),
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/unauthorize',
        name: 'Unauthorize',
        component: () => import('./views/UnAuthorize'),
    },
    {
        path: '/homepage',
        component: HomePage,
        meta: { requiresAuth: true },
        children: [// start nesting routes. All the routes below are sub routes of the main route

            {
                path: routerS.views[2].path,
                name: 'Home',
                component: () => import('./views/HomeS'),

            },
            {
                path: 'dashboard',
                name: 'Dashboard',
                component: Dashboard,
            },
            {
                path: 'products',
                name: 'ProductS',
                component: ProductS,
                children: [{
                    path: 'car/:id',
                    name: 'car',
                    component: () => import('./views/Car'),

                },
                {
                    path: 'motor/:id',
                    name: 'motor',
                    component: () => import('./views/Motor'),

                },
                ],
            },

            {
                path: 'task',
                name: 'Task',
                component: Task,
            },
            {
                path: 'reporting',
                name: 'Reporting',
                component: Reporting,
            },
            {
                path: 'user',
                name: 'User',
                component: User,
            },
            {
                path: 'support',
                name: 'Support',
                component: Support,
            },
            {
                path: 'setting',
                name: 'Setting',
                component: Setting,
            },
        ]
    },
    {
        path: '/vehicle/:id',
        name: 'vehicle',
        component: () => import('./views/VehicleS.vue'),
        props: true,
    },

]
const router = new VueRouter({
    mode: 'history',
    routes,

})



router.beforeEach((to, from, next) => {

    if (to.matched.some((record) => record.meta.requiresAuth)) {

        console.log('route')
        if (store.getters.isAuthenticated) {
            next();
            return;
        }
        next("/login");
    } else {
        next();
    }
});

export default router