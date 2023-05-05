import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
    },
    {
        path: "/author/create",
        name: "author.add",
        component: () => import("@/views/AuthorAdd.vue"),
        props: true,
    },
    {
        path: "/admin-home",
        name: "admin-home",
        component: () => import("@/views/AdminHome.vue"),
        props: true,
    },
    {
        path: "/login",
        name: "login",
        component: () => import("@/views/Login.vue"),
        props: true,
    },
    {
        path: "/sign-up",
        name: "sign-up",
        component: () => import("@/views/SignUp.vue"),
        props: true,
    },
    {
        path: "/author/:id",
        name: "author.edit",
        component: () => import("@/views/AuthorEdit.vue"),
        props: true,
    },
    {
        path: "/book/create",
        name: "book.add",
        component: () => import("@/views/BookAdd.vue"),
        props: true,
    },
    {
        path: "/books/:id",
        name: "book.edit",
        component: () => import("@/views/BookEdit.vue"),
        props: true,
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
export default router;
