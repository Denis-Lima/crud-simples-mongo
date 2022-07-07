import Vue from "vue"
import VueRouter from "vue-router"
import UsersList from "../views/UsersList.vue"
import UserCreation from "../views/UserCreation.vue"
import UserView from "../views/UserView.vue"

Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        name: "UsersList",
        component: UsersList,
    },
    {
        path: "/create-user",
        name: "UserCreation",
        component: UserCreation,
    },
    {
        path: "/user/:id",
        name: "UserView",
        component: UserView,
    },
]

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
})

export default router
