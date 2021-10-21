<template>
  <v-col>
    <v-form @submit="handleSubmit">
      <v-text-field
        v-model="address"
        label="Address"
        class="mx-2"
      >
      </v-text-field>
      <v-text-field
        v-model="notes"
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
        type="submit"
      >
        Confirm Order
      </v-btn>
    </v-form>
  </v-col>
</template>
<script>
import axios from 'axios'
import { mapMultiRowFields } from 'vuex-map-fields'

export default {
  name: 'Delivery',
  data() {
    return {
      address: '',
      notes: '',
    }
  },
  computed: {
    ...mapMultiRowFields('cart', ['cartItems']),
  },
  methods: {
    handleSubmit(e) {
      console.log(this.cartItems, 'cek cart newS')
      e.preventDefault()
      const timestamp = Date.now()
      const baseURL = 'https://wa-link.deploy.cbs.co.id/SN4TCROYT-OE4QB/order'
      const body = {
        order_item: this.cartItems,
        order_type: 'Delivery',
        qty_order: this.cartItems.qty,
        address: this.address,
        notes: this.notes,
        timestamp,

      }

      axios.post(baseURL, body).then(res => {
        console.log(res)
        window.open(`https://wa.me/${res.data.link}`, '_blank')
      }).catch(err => {
        console.log(err)
      })
    },

  },
}
</script>
<style scoped>
</style>
