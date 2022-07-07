<template>
  <v-app-bar
    app
    color="primary"
    dark
  >
    <v-row justify="center">
      <v-col
        v-for="(button, index) in buttons"
        :key="index"
        cols="2"
      >
        <router-link
          :to="button.path"
          style="text-decoration: none;"
        >
          <v-btn elevation="5">{{button.text}}</v-btn>
        </router-link>
      </v-col>

    </v-row>
  </v-app-bar>
</template>

<script>
export default {
    name: "NavbarMenu",

    data() {
        return {
            buttons: [
                {text: "Listar usuários", path: "/"},
                {text: "Criar usuário", path: "/create-user"},
            ]
        }
    }
}
</script>

<style></style>
