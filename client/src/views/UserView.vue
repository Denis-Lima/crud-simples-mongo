<template>
  <v-form ref="form">
    <v-container>
      <v-card
        align="center"
        justify="center"
        max-width="50%"
        style="margin: 10px auto;"
        elevation="5"
      >
        <v-row>
          <v-col>
            <p class="text-h3 font-weight-light">Dados do usuário</p>
          </v-col>
        </v-row>
        <v-row
          align="center"
          justify="center"
        >
          <v-col cols="5">
            <v-text-field
              label="Nome"
              outlined
              v-model="user.name"
            />
          </v-col>
          <v-col cols="5">
            <v-text-field
              label="Email"
              outlined
              v-model="user.email"
            />
          </v-col>
          <v-col cols="5">
            <v-text-field
              label="CPF"
              type="number"
              outlined
              v-model="user.cpf"
            />
          </v-col>
          <v-col cols="5">
            <v-text-field
              label="Telefone"
              type="number"
              outlined
              v-model="user.phone"
            />
          </v-col>
          <v-col cols="12">
          </v-col>
          <v-col cols="8">
            <v-row justify="center">
              <v-col cols="4">
                <v-btn
                  color="green lighten-2"
                  @click="editUser"
                  :loading="loading"
                >Editar usuário</v-btn>
              </v-col>
              <v-col cols="4">
                <back-button />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </v-form>
</template>

<script>
import api from '@/services/api'
import BackButton from "@/components/BackButton"
export default {
    name: "UserView",
    components: {
        BackButton
    },

    data() {
        return {
            user: {
                name: '',
                email: '',
                cpf: null,
                phone: null
            },
            loading: false
        }
    },

    methods: {
        async getUser() {
            try {
                this.loading = true
                const response = await api.get(`/user/${this.$route.params.id}`)
                this.user = response.data.user
            } catch (error) {
                const {message} = error.response.data
                if (message && message.includes("not found")) {
                    this.$notify.error("O usuário solicitado não foi encontrado")          
                } else {
                    this.$notify.error("Ocorreu um erro ao buscar o usuário, o servidor pode estar iniciando, aguarde um momento e tente novamente!")          
                }
            } finally {
                this.loading = false
            }
        },
        async editUser() {
            try {
                this.loading = true
                const response = await api.patch(`/user/${this.$route.params.id}`, this.user)
                this.user = response.data.user
                this.$notify.success("Dados editados com sucesso!")          
            } catch (error) {
                const {message} = error.response.data
                if (message && message.includes("not found")) {
                    this.$notify.error("O usuário não foi encontrado")          
                } else {
                    this.$notify.error("Ocorreu um erro ao editar o usuário")          
                }
            } finally {
                this.loading = false
            }
        }
    },

    beforeMount() {
        this.getUser()
    }
}
</script>

<style>

</style>