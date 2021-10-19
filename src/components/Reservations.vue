<template>
  <v-col>
    <v-row>
      <v-text-field label="Order Date">
      </v-text-field>
      <v-text-field label="Order Time">
        <v-text-field>
        </v-text-field>
      </v-text-field>
    </v-row>
    <v-row>
      <v-text-field label="Guest">
      </v-text-field>
      <v-text-field label="Table Number">
      </v-text-field>
    </v-row>
    <v-text-field label="Notes">
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
</template>
<script>
export default {
  name: 'Reservation',
}
</script>
