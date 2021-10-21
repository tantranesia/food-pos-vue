<template>
  <v-form @submit="handleSubmit">
    <v-col>
      <v-row class="mx-2">
        <v-text-field
          v-model="date"
          label="Order Date"
        >
        </v-text-field>
        <v-text-field
          v-model="time"
          label="Order Time"
        >
          <v-text-field>
          </v-text-field>
        </v-text-field>
      </v-row>
      <v-row class="mx-2">
        <v-text-field
          v-model="guest"
          label="Guest"
        >
        </v-text-field>
        <v-text-field
          v-model="table"
          label="Table Number"
        >
        </v-text-field>
      </v-row>
      <v-text-field
        v-model="notes"
        label="Notes"
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
  name: 'Reservation',
  data() {
    return {
      guest: 0,
      table: 0,
      notes: '',
      date: 0,
      time: 0,
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
        order_type: 'Reservation',
        qty_order: this.cartItems.qty,
        notes: this.notes,
        guest: this.guest,
        table: this.table,
        date: this.date,
        time: this.time,
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
