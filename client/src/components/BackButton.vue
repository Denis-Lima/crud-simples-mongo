<template>
  <v-btn
    @click="goBack"
    color="primary"
  >
    Voltar
  </v-btn>
</template>

<script>
export default {
    name: "BackButton",
    methods: {
        goBack() {
            this.$router.back()
        }
    }
}
</script>

<style>

</style>