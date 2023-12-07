import VueRouter from "vue-router";


const routes = [
    {
        path: '/',
        name: 'index',
        redirect: '/bookshelf',
        component: () => import('../components/Index'),
        children: [
            {
                path: '/search',
                name: 'search',
                component: () => import('../components/Search')
            },
            {
                path: '/reading',
                name: 'reading',
                component: () => import('../components/Reading')
            },
            {
                path: '/setting',
                name: 'setting',
                component: () => import('../components/Setting')
            },
            {
                path: '/bookshelf',
                name: 'bookshelf',
                component: () => import('../components/BookShelf')
            }
        ]
    },
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router;