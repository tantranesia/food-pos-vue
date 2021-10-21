<template>
  <v-col>
    <v-text-field
      label="Take Away"
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
  name: 'TakeAway',

}
</script>
<style scoped>

</style>
