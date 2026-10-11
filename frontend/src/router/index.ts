import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import JoinGameView from "../views/JoinGameView.vue";
import HostLobbyView from "../views/HostLobbyView.vue";
import RoleRevealView from "../views/RoleRevealView.vue";
import GameView from "../views/GameView.vue";

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: HomeView,
        },
        {
            path: '/join',
            component: JoinGameView,
        },
        {
            path: '/host/:id',
            component: HostLobbyView,
        },
        {
            path: '/game/:id/role',
            component: RoleRevealView,
        },
        {
            path: '/game/:id',
            component: GameView,
        },
    ]
})