<template>
  <v-dialog
    :value="dialogIsOpen"
    @input="emitInput"
    persistent
    max-width="500"
  >
    <v-card>
      <v-card-title class="text-h6">
        {{dialogTitle}}
      </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="red darken-1"
          text
          @click="emitInput(false)"
        >
          Não
        </v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="emitYesClick"
        >
          Sim
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
    name: 'ConfirmDialog',
    props: {
        dialogTitle: {
            type: String,
            default: () => ""
        },
        dialogItem: {
            type: Object,
            default: () => {}
        },
        value: Boolean
    },

    data() {
        return {
            dialogIsOpen: this.value
        }
    },

    methods: {
        emitYesClick() {
            this.dialogIsOpen = false
            this.$emit('click-yes', this.dialogItem)
        },
        emitInput(isOpen) {
            this.dialogIsOpen = isOpen
            this.$emit('input', this.dialogIsOpen)
        }
    },

    watch: {
        value() {
            this.dialogIsOpen = this.value
        }
    }
}
</script>

<style>

</style>