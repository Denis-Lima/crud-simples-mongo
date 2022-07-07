<template>
  <v-container id="view">
    <v-row align-content="center">
      <v-col>
        <v-card elevation="8">
          <v-data-table
            class="custom-table-border"
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
            :loading="loading"
            loading-text="Buscando usuários..."
            locale="pt-BR"
          >
            <template #[`item.actions`]="{ item }">
              <v-tooltip
                left
                content-class="edit"
              >
                <template #activator="{ on, attrs }">
                  <v-icon
                    class="mr-2"
                    @click="sendToUserView(item)"
                    v-bind="attrs"
                    v-on="on"
                  >
                    mdi-eye
                  </v-icon>
                </template>
                <span>Visualizar</span>
              </v-tooltip>
              <v-tooltip
                right
                content-class="delete"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    @click="openDialog(item)"
                    v-bind="attrs"
                    v-on="on"
                  >
                    mdi-delete
                  </v-icon>
                </template>
                <span>Excluir</span>
              </v-tooltip>
            </template>
            <template v-slot:[`footer.page-text`]="items">
              {{ items.pageStart }} - {{ items.pageStop }} de {{ items.itemsLength }}
            </template>
          </v-data-table>
          <confirm-dialog
            :dialogTitle="dialogTitle"
            v-model="dialogIsOpen"
            :dialogItem="dialogItem"
            @click-yes="deleteUser"
          />
        </v-card>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
import api from '@/services/api'
import ConfirmDialog from '@/components/ConfirmDialog'

export default {
    name: "UsersList",
    components: {
        ConfirmDialog
    },

    data() {
        return {
            pagination: {},
            itemsPerPageOptions: [5, 10, 20, 30],
            totalAmountItems: 0,
            users: [],
            headers: [
                {text: 'Nome', value: 'name', sortable: false},
                {text: 'CPF', value: 'cpf', sortable: false},
                {text: 'email', value: 'email', sortable: false},
                {text: 'Telefone', value: 'phone', sortable: false},
                {text: 'Criado em', value: 'createdAt', sortable: false},
                {text: 'Ações', value: 'actions', sortable: false},
            ],
            loading: false,
            dialogTitle: "Deseja realmente excluir este usuário?",
            dialogIsOpen: false,
            dialogItem: {}
        }
    },

    methods: {
        async getAllUsers() {
            try {
                this.loading = true
                const {page, itemsPerPage} = this.pagination
                const response = await api.get(`/user?page=${page}&limit=${itemsPerPage}`)
                this.users = response.data.users.map(user => {
                    user.createdAt = new Date(user.createdAt).toLocaleString()
                    return user
                })
                this.totalAmountItems = response.data.totalUsers
            } catch (error) {
                this.$notify.error("Ocorreu um erro ao buscar os usuários, o servidor pode estar iniciando, aguarde um momento e tente novamente!")
            } finally {
                this.loading = false
            }
        },
        sendToUserView(user) {
            this.$router.push(`/user/${user._id}`)
        },
        openDialog(user) {
            this.dialogItem = user
            this.dialogIsOpen = true
        },
        async deleteUser(user) {
            try {
                const response = await api.delete(`/user/${user._id}`)
                this.getAllUsers()
                this.$notify.success(`Usuário ${response.data.user.email} removido com sucesso!`)
            } catch (error) {
                const {message} = error.response.data
                if (message && message.includes("not found")) {
                    this.$notify.warning("Usuário não encontrado")
                } else {
                    this.$notify.warning("Ocorreu um erro ao remover o usuário")
                }
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

<style>
.v-data-table__mobile-table-row {
  border-bottom: medium solid rgba(0, 0, 0, 0.12) !important;
}
</style>