import Vue from "vue"
import VueRouter from "vue-router"
import UsersList from "../views/UsersList.vue"
import CreateUser from "../views/CreateUser.vue"

Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        name: "UsersList",
        component: UsersList,
    },
    {
        path: "/create-user",
        name: "CreateUser",
        component: CreateUser,
    },
]

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
})

export default router
