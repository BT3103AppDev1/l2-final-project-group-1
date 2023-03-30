import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("../views/LP.vue"),
      name: "Landing Page",
    },
    {
      path: "/login", 
      component: () => import("../views/RegisterPage/Login.vue"),
      name: "Login",
    },
    {
      path: "/register",
      component: () => import("../views/RegisterPage/Register.vue"),
    },
    {
      path: "/login/calendar",
      component: () => import("../views/Calendar.vue"),
    },
    {
      path: "/login/chats",
      component: () => import("../views/ChatsPage/Chats.vue"),
    },
    {
      path: "/login/home",
      component: Home,
    },
    {
      path: "/login/projects",
      component: () => import("../views/Projects.vue"),
    },
    {
      path: "/login/projects/tabnavigation",
      component: () => import("../components/TabNavigation.vue"),
    },
    {
      path: "/login/alerts",
      component: () => import("../views/Alerts.vue"),
    },
    {
      path: "/login/settings",
      component: () => import("../views/Settings.vue"),
    },
  ],
});

export default router;
