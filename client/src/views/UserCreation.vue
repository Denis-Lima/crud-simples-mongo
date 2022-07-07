<template>
  <v-form ref="form">
    <v-container>
      <v-card
        align="center"
        justify="center"
        max-width="50%"
        style="margin: 10px auto;"
      >
        <v-row
          align="center"
          justify="center"
          class="flex-column"
        >
          <v-col cols="8">
            <v-text-field
              label="Nome"
              v-model="user.name"
              filled
              :rules="[rules.required]"
            />
          </v-col>
          <v-col cols="8">
            <v-text-field
              label="Email"
              v-model="user.email"
              filled
              :rules="[rules.required, rules.email]"
            />
          </v-col>
          <v-col cols="8">
            <v-text-field
              label="CPF"
              type="number"
              v-model="user.cpf"
              filled
              :rules="[rules.required, rules.cpf]"
            />
          </v-col>
          <v-col cols="8">
            <v-text-field
              label="Telefone"
              type="number"
              v-model="user.phone"
              filled
              :rules="[rules.phone]"
            />
          </v-col>
          <v-col cols="8">
            <v-row justify="center">
              <v-col cols="4">
                <v-btn
                  color="green lighten-2"
                  @click="createUser"
                  :loading="loading"
                >Criar usuário</v-btn>
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
    name: 'UserCreation',
    components: {
        BackButton
    },

    data() {
        return {
            rules: {
                required: value => !!value || 'Campo obrigatório',
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || 'E-mail inválido'
                },
                cpf: value => (value !== null && value.toString().length === 11 && /\d{11}/.test(value)) || 'CPF deve ter 11 números',
                phone: value => {
                    if (value) {
                        return (value.toString().length === 10 || value.toString().length === 11) || 'Telefone deve ter 10 ou 11 dígitos'
                    }
                    return true
                }
            },
            user: {
                name: '',
                email: '',
                cpf: null,
                phone: null,
            },
            loading: false
        }
    },

    methods: {
        async createUser() {
            if (!this.$refs.form.validate()) return
            try {
                this.loading = true
                const response = await api.post("/user", this.user)
                this.$notify.success("Usuário cadastrado com sucesso!")
                setTimeout(() => {
                    this.$router.push(`/user/${response.data.user._id}`)
                }, 2000)
            } catch (error) {
                this.$notify.error("Não foi possível criar o usuário")
            } finally {
                this.loading = false
            }
        }
    }
}
</script>

<style>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>