<template>
  <v-col>
    <v-text-field
      v-model="details.address"
      label="Address"
      class="mx-2"
    >
    </v-text-field>
    <v-text-field
      v-model="details.notes"
      label="Notes"
      class="mx-2"
    >
    </v-text-field>
    <v-row class="justify-space-between mx-2">
      <p>Discount</p>
      <p>0</p>
    </v-row>
    <v-row class="justify-space-between mx-2">
      <p>Sub Total</p>
      <p>Rp350000</p>
    </v-row>
    <v-btn
      color="primary"
      class="my-10 button-order"
      block
    >
      Confirm Order
    </v-btn>
  </v-col>
</template>
<script>
export default {
  name: 'Delivery',
  data() {
    return {
      details: {
        address: '',
        notes: '',
      },

    }
  },
}
</script>
<style scoped>
</style>
