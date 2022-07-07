<template>
  <v-container id="view">
    <v-row align-content="center">
      <v-col>
        <v-card elevation="8">
          <v-data-table
            :headers="headers"
            :items="users"
            :items-per-page="itemsPerPageOptions[0]"
            no-data-text="Não há usuários cadastrados"
            :footer-props="{
        itemsPerPageText: 'Usuários por página',
        itemsPerPageOptions: itemsPerPageOptions
      }"
            :server-items-length="totalAmountItems"
            :options.sync="pagination"
          />
        </v-card>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
import api from '../services/api'
export default {
    name: "UsersList",
    components: {
    },

    data() {
        return {
            pagination: {},
            itemsPerPageOptions: [5, 10, 25],
            totalAmountItems: 0,
            users: [],
            headers: [
                {text: 'Nome', value: 'name', sortable: false},
                {text: 'CPF', value: 'cpf', sortable: false},
                {text: 'email', value: 'email', sortable: false},
                {text: 'Telefone', value: 'phone', sortable: false},
                {text: 'Criado em', value: 'createdAt', sortable: false},
            ]
        }
    },

    methods: {
        async getAllUsers() {
            try {
                const {page, itemsPerPage} = this.pagination
                const response = await api.get(`/user?page=${page}&limit=${itemsPerPage}`)
                this.users = response.data.users.map(user => {
                    user.createdAt = new Date(user.createdAt).toLocaleString()
                    return user
                })
                this.totalAmountItems = response.data.totalUsers

            } catch (error) {
                console.log(error)
                this.$notify.error("Ocorreu um erro ao buscar os usuários, o servidor pode estar iniciando, aguarde um momento e tente novamente!")
            }
        }
    },

    watch: {
        pagination: {
            handler() {
                this.getAllUsers()
            },
            deep: true
        }
    },

    mounted() {
        this.getAllUsers()
    }
}
</script>
