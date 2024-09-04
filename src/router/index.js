import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import List from '@/views/PokemonListView.vue';



const routes = [
    {
        path: '/',
        name: 'HomeView',
        component: HomeView,
    },

    {
        path: '/list',
        name: 'List',
        component: List,
    },

];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
