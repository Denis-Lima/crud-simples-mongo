import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import vuetify from "./plugins/vuetify"
import Notify from 'vue-notifyjs'

Vue.config.productionTip = false

Vue.use(Notify, {
    type: "primary",
    horizonAlign: "right",
    verticalAlign: "bottom",
    timeout: 5000
})

new Vue({
    router,
    vuetify,
    render: (h) => h(App),

    created() {
        this.$notify.sucess = (message) => this.$notify({type: "sucess", message})
        this.$notify.warning = (message) => this.$notify({type: "warning", message})
        this.$notify.error = (message) => this.$notify({type: "danger", message})
        this.$notify.info = (message) => this.$notify({type: "info", message})
    }
}).$mount("#app")
