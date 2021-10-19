<template>
  <form>
    <v-col>
      <v-row class="mx-2">
        <v-text-field
          label="Table ID"
          class="place-holder"
        >
        </v-text-field>
        <v-text-field label="Number of Guest">
        </v-text-field>
      </v-row>
      <v-text-field label="Notes" class="mx-2">
      </v-text-field>
      <v-row class="justify-space-between mx-2">
        <p>Discount</p>
        <p>0</p>
      </v-row>
      <v-row class="justify-space-between mx-2">
        <p>Sub Total</p>
        <p>{{ subTotal }}</p>
      </v-row>
      <v-btn
        color="primary"
        class="my-10 button-order"
        block
      >
        Confirm Order
      </v-btn>
    </v-col>
  </form>
</template>
<script>
export default {
  name: 'DineIn',
}
</script>
<style scoped>
.place-holder input::placeholder {
  color: white !important;
}

.place-holder input {
  color: white !important;
}
</style>
