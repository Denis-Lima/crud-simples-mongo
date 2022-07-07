<template>
  <v-app-bar
    app
    color="primary"
    dark
  >
    <v-row justify="center">
      <v-col
        lg="2"
        md="3"
        sm="4"
        cols="6"
        class="d-flex justify-center"
      >
        <router-link
          to="/"
          style="text-decoration: none;"
        >
          <v-btn elevation="5">Listar Usuários</v-btn>
        </router-link>
      </v-col>
      <v-col
        lg="2"
        md="3"
        sm="4"
        cols="6"
        class="d-flex justify-center"
      >
        <router-link
          to="/create-user"
          style="text-decoration: none;"
        >
          <v-btn elevation="5">Criar Usuário</v-btn>
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
