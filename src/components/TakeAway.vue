<template>
  <v-form @submit="handleSubmit">
    <v-col>
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
    </v-col>
  </v-form>
</template>
<script>
import axios from 'axios'
import { mapMultiRowFields } from 'vuex-map-fields'

export default {
  name: 'TakeAway',
  data() {
    return {
      notes: '',
      insideCart: [],
    }
  },
  computed: {
    ...mapMultiRowFields('cart', ['cartItems']),
  },
  methods: {
    handleSubmit(e) {
      console.log(this.cartItems, 'cek cart newS')

      //   const tryitems = [...this.cartItems]
      e.preventDefault()
      const timestamp = Date.now()
      const baseURL = 'https://wa-link.deploy.cbs.co.id/SN4TCROYT-OE4QB/order'
      const body = {
        order_item: this.cartItems.map(col => ({ name: col.name, qty_order: col.qty })),
        order_type: 'Take Away',
        notes: this.notes,
        timestamp,

      }

      //   const data = JSON.stringify(body)

      console.log(body, 'cek order item')
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
