import { createRouter, createWebHistory } from 'vue-router'

import Game from '../components/Game.vue';
import NewWords from '../components/NewWords.vue';

const routes = [
    {
        path: '/',
        name: 'Game',
        component: Game
    },
    {
        path: '/words',
        name: 'Words',
        component: NewWords
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    linkExactActiveClass: 'active'
  })

export default router