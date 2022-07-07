<template>
  <v-app>
    <navbar-menu />

    <v-main>
      <router-view />
    </v-main>
    <notifications />
  </v-app>
</template>

<script>
import NavbarMenu from './components/NavbarMenu'
export default {
    name: "App",
    components: {
        NavbarMenu
    },

    data: () => ({
    //
    }),
}
</script>
<style src="vue-notifyjs/themes/material.css"></style>